# DeskGo
使用Electron和Vue开发的桌面端课程表小工具。
## 运行方式
+ 安装依赖包
~~~shell
npm install 
~~~
+ 运行网页

```shell
npm run dev
```

+ 运行Electron

```shell
npm run elctron:dev
```

+ 【注意】：安装Electron依赖的时候如果一致卡住，请在`C:\Users\你的用户名\`下找到`.npmrc`文件，并使用记事本打开，添加`electron_mirror=https://npmmirror.com/mirrors/electron/`，保存后新打开一个命令窗口进行安装(使用的淘宝源)。

---

## 开发记录
+ 2024年11月5日
  + 实现设置中心大致界面
  + 使用pinia进行状态管理
    + 待实现功能