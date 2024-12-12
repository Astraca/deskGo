const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    saveJsonToFile: (jsonData, fileName) => ipcRenderer.invoke('save-json', jsonData, fileName),
    loadJsonFromFile: (fileName) => ipcRenderer.invoke('load-json', fileName)
});