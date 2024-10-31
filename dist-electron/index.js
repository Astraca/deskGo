"use strict";
const { app, BrowserWindow, Menu } = require("electron");
const { join } = require("path");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
Menu.setApplicationMenu(null);
const createWindow = () => {
  const win = new BrowserWindow({
    // width: 1100,
    // height: 900,
    // 设置最小尺寸
    minWidth: 1e3,
    minHeight: 800,
    //如果不添加，则使用的是默认的图标
    icon: join(__dirname, "../public/logo.png"),
    title: "DeskGO",
    // webPreferences: {
    //   contextIsolation: false, // 是否开启隔离上下文
    //   nodeIntegration: true, // 渲染进程使用Node API
    //   preload: path.join(__dirname, "../electron-preload/index.js"), // 需要引用js文件
    // }
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
  }
};
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
