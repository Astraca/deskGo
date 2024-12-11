const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "DeskGo",
    icon: path.join(__dirname, "assets/icon.png"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // 加载 preload.js
    },
  });

  if (process.env.NODE_ENV !== "production") {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile("dist/index.html");
  }

  // 保存JSON文件
  ipcMain.handle("save-json", (event, jsonData, fileName) => {
    console.log("执行ipcMain-save-json", event, fileName, jsonData);
    const appDataPath = process.env.APPDATA;
    const savePath = path.join(appDataPath, "DeskGo Dev", fileName);
    try {
      // 确保目录存在
      const dir = path.dirname(savePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      // 写入文件
      fs.writeFileSync(savePath, JSON.stringify(jsonData, null, 2));
      return true;
    } catch (err) {
      console.error("Error saving Json", err);
      return false;
    }
  });

  // 读取JSON文件
  ipcMain.handle("load-json", (event, fileName) => {
    console.log("执行ipcMain-load-jso", event, fileName);
    const appDataPath = process.env.APPDATA;
    const filePath = path.join(appDataPath, "DeskGo Dev", fileName);
    
    try {
      // 检查文件是否存在
      if (!fs.existsSync(filePath)) {
        return -1;
      }
      // 读取文件
      const jsonData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(jsonData);
    } catch (err) {
      console.error("Error loading Json", err);
      return -1;
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
