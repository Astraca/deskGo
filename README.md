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
---
+ 2024年11月28日
  + 问题：
    Electron: 是否能够实现托盘。如何实现消息提醒。
  + 确定:
    配置信息和课程数据存储方式。
  
+ 2024年12月8日
  + 使用TS时，跑electron报错
  
+ 2024年12月9日
  + 重构为JS，但无法运行
  
+ 2024年12月11日
  
  + 成功运行并实现配置项本地文件保存
  
+ 2024年12月12日
  
  + 添加课程界面及相关功能实现(已实现课程添加并保存到本地文件)
  
+ 2024年12月17日
  
  + <p style="text-decoration: line-through;">存在问题： 添加课程时，增加空值检查，防止输入无效数据。（已增加）</p>
  
  + 实现了当前周课程筛查
  
  + ![image-20241217204229269](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241217204229269.png)
  
  + 问题：之前的课程时间设置方式(添加课程的时候进行设置)不方便进行数据的渲染。因此，重新修改了这部分。通过在设置中心设置不同节课程的时间进行实现。最后在添加课程的时候，通过**选择第几节**的方式来进行。
  
  + ![image-20241217203149329](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241217203149329.png)
  
  + ![image-20241217203656488](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241217203656488.png)
  
    在这部分设置中，用户选定开始时间后会根据前面设置的上课时长去自动计算结束时间。
  
  + 优化：如果用户在设置中心进行修改，但是没有保存设置就切换到其他页面进行一个提醒。通过路由守卫进行。
  + ![image-20241217204038111](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241217204038111.png)
  + ![image-20241217204112389](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241217204112389.png)
  + 问题：需要修改课程添加部分
+ 问题：
  + 是否可以建立不同学校的配置文件
  + 是否可以增加OCR识别(课程表文件导入？PDF/EXCEL?)
+ 2024年12月30日
  + 修改新增课程时不再选择具体时间，而是通过选择课程是当天第几节的方式进行；在选择完开始时间后，默认结束时间为一节课的时间差。
  + ![image-20241230220654445](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241230220654445.png)
  + 实现每一节课程的时间在组件中的传递
  + ![image-20241230220710827](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241230220710827.png)
  + 初步实现了在课程表中展示当前周的课程的效果
  + ![image-20241230220732484](https://astraca.oss-cn-chengdu.aliyuncs.com/img_bed/image-20241230220732484.png)
  + 问题：
    + 添加课程后不能立刻渲染
    + 无法对添加的课程进行修改

