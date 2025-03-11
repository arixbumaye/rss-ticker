const { app, BrowserWindow, screen, ipcMain, shell } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

let mainWindow;

// Disable all security features that might cause issues
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-web-security');
app.commandLine.appendSwitch('allow-file-access-from-files');
app.commandLine.appendSwitch('disable-site-isolation-trials');
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');

// Configure auto updater
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;
autoUpdater.disableWebInstaller = true;
autoUpdater.allowDowngrade = true;
autoUpdater.allowPrerelease = false;

// For macOS, disable code signature checking
if (process.platform === 'darwin') {
  autoUpdater.forceDevUpdateConfig = true;
}

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  
  mainWindow = new BrowserWindow({
    width: width,
    height: 100,
    x: 0,
    y: 0, // Position at the top of the screen
    frame: false,
    transparent: false,
    alwaysOnTop: true,
    skipTaskbar: false,
    movable: true, // Ensure the window can be moved
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.setVisibleOnAllWorkspaces(true);
  
  // Handle window movement to different screens
  mainWindow.on('moved', () => {
    const currentDisplay = screen.getDisplayNearestPoint(mainWindow.getBounds());
    const { width } = currentDisplay.workAreaSize;
    const { x, y } = mainWindow.getBounds();
    
    // Keep the window at the top of the screen but adjust width to the new screen
    mainWindow.setBounds({
      x: x,
      y: 0, // Always at the top
      width: width,
      height: 100
    });
  });
  
  // Open DevTools for debugging
  // mainWindow.webContents.openDevTools({ mode: 'detach' });

  // Set up IPC handlers
  ipcMain.handle('check-for-updates', () => {
    log.info('Manual check for updates requested');
    autoUpdater.checkForUpdates().catch(err => {
      log.error('Error checking for updates:', err);
    });
  });

  // Open external links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Auto-updater events
autoUpdater.on('checking-for-update', () => {
  log.info('Checking for update...');
  mainWindow.webContents.send('update-message', 'Checking for update...');
});

autoUpdater.on('update-available', (info) => {
  log.info('Update available:', info);
  // Only notify about the update, don't download it
  mainWindow.webContents.send('update-available', info);
});

autoUpdater.on('update-not-available', (info) => {
  log.info('Update not available:', info);
  mainWindow.webContents.send('update-message', 'No updates available.');
});

autoUpdater.on('error', (err) => {
  log.error('Error in auto-updater:', err);
  mainWindow.webContents.send('update-message', `Error: ${err.message}`);
});

function sendStatusToWindow(text) {
  console.log(text);
  if (mainWindow) {
    mainWindow.webContents.send('update-message', text);
  }
}

app.whenReady().then(() => {
  createWindow();
  
  // Check for updates after a short delay to ensure the app is fully loaded
  setTimeout(() => {
    autoUpdater.checkForUpdates().catch(err => {
      log.error('Error checking for updates:', err);
    });
  }, 3000);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handlers for window control
ipcMain.on('close-app', () => {
  app.quit();
});

// Check for updates every 30 minutes
setInterval(() => {
  log.info('Checking for updates (interval)');
  autoUpdater.checkForUpdates().catch(err => {
    log.error('Error checking for updates:', err);
  });
}, 30 * 60 * 1000); 