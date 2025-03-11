const { app, BrowserWindow, screen, ipcMain, dialog } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

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
autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

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
}

// Auto-updater events
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
  mainWindow.webContents.send('update-available');
});

autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
  mainWindow.webContents.send('download-progress', progressObj);
});

autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
  // Prompt user to install update
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: 'A new version has been downloaded. Restart the application to apply the updates.'
  };

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall();
  });
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
    autoUpdater.checkForUpdatesAndNotify();
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

// IPC handlers for updates
ipcMain.on('check-for-updates', () => {
  autoUpdater.checkForUpdatesAndNotify();
}); 