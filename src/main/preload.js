const { contextBridge, ipcRenderer } = require('electron');

// 暴露方法
contextBridge.exposeInMainWorld('electron', {
    saveJsonToFile: (jsonData, fileName) => ipcRenderer.invoke('save-json', jsonData, fileName),
    loadJsonFromFile: (fileName) => ipcRenderer.invoke('load-json', fileName)
});