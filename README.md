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
  + 加入定位
+ 2024年11月6日
  + 完善设置中心页面
    + 将设置区分为三个大板块"天气设置"、"课表设置"、"提醒设置"
  + ![image-20241106152812753](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241106152812753.png)
  + ![image-20241106152833883](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241106152833883.png)
+ 2024年11月13日
  + 完成设置中心页面
    + 封装Tips组件用于提示效果
      + ![image-20241113175717797](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241113175717797.png)
      + 用户可以设置提示内容，文字颜色等
    + 确定两种提醒方式页面逻辑
      + ![动画](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/%E5%8A%A8%E7%94%BB.gif)
+ 2024年11月20日
  + 完善整体页面效果
    + 将用户点击通过Pinia进行状态管理，展示不同页面激活状态
      + ![image-20241113180021420](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241113180021420.png)
    + 完成不同页面标题参数传递
      + ![image-20241128134108223](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241128134108223.png)
+ 2024年11月26日
  + 课程表页面制作
    + ![image-20241128133920355](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241128133920355.png)
    + ![image-20241128133936225](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241128133936225.png)

​	