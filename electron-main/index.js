// src-electron/main.js
const { app, BrowserWindow, Menu } = require("electron");
const { join } = require("path");

// 屏蔽安全警告
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

// 禁止显示默认菜单
Menu.setApplicationMenu(null);

// 创建浏览器窗口时，调用这个函数。
const createWindow = () => {
  const win = new BrowserWindow({
    // width: 1100,
    // height: 900,
    // 设置最小尺寸
    minWidth: 1000,
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

  // 开发环境下，打开开发者工具。
  // if (!isPackaged) {
  //   win.webContents.openDevTools();
  // }

  // win.loadURL('http://localhost:3000')
  // development模式
  // console.log(process.env.VITE_DEV_SERVER_URL);
  
  if (process.env.VITE_DEV_SERVER_URL) {
    // win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.loadURL("http://localhost:3000")
    // 开启调试台
    win.webContents.openDevTools();
  } else {
    // win.loadFile(join(__dirname, "../dist/index.html"));
  }

  // if (app.isPackaged) {
  //   win.loadFile(path.join(__dirname, "../dist/index.html"));
  // } else {
  //   win.webContents.openDevTools();
  //   let url = "http://localhost:3000"; // 本地启动的vue项目路径
  //   win.loadURL(url);
  // }
};

// Electron 会在初始化后并准备
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
