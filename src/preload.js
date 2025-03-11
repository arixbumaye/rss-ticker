const { contextBridge, ipcRenderer } = require('electron');
const { version } = require('../package.json');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electronAPI', {
    // App version
    appVersion: version,
    
    // Window control
    closeWindow: () => ipcRenderer.send('close-app'),
    
    // Auto-update functions
    checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
    
    // Auto-update events
    onUpdateAvailable: (callback) => {
      ipcRenderer.on('update-available', (_, info) => callback(info));
    },
    onUpdateMessage: (callback) => {
      ipcRenderer.on('update-message', (_, message) => callback(message));
    }
  }
); 