const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    saveJsonToFile: (filePath, jsonData) => ipcRenderer.invoke('save-json', filePath, jsonData),
    loadJsonFromFile: (fileName) => ipcRenderer.invoke('load-json', fileName)
});