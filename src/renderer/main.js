import "./style.css";
import "./assets/iconfont.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import pinia from "./stores/index.js";
import ElementPlus from "element-plus";
// import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
// app.use(ElementPlus, {
//   locale: zhCn,
// });

app.use(router);
app.use(pinia);

app.mount("#app");
