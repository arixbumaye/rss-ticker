const { contextBridge, ipcRenderer } = require('electron');

// Expose minimal API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  closeWindow: () => {
    ipcRenderer.send('close-app');
  },
  // Add update-related functions
  checkForUpdates: () => {
    ipcRenderer.send('check-for-updates');
  },
  onUpdateAvailable: (callback) => {
    ipcRenderer.on('update-available', callback);
  },
  onUpdateMessage: (callback) => {
    ipcRenderer.on('update-message', (event, text) => callback(text));
  },
  onDownloadProgress: (callback) => {
    ipcRenderer.on('download-progress', (event, progressObj) => callback(progressObj));
  }
}); 