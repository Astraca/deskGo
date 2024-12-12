<script setup>
import { computed, onMounted } from 'vue'
// 组件
import HandlePanel from './components/HandlePanel.vue'
import TopNav from './components/TopNav.vue'
// Pinia
import { useGlobalStore } from './stores/global.js'
import { useSettingStore } from './stores/setting.js'
import { useCourseStore } from './stores/course.js'

const globalStore = useGlobalStore()
const settingStore = useSettingStore()
const courseStore = useCourseStore()

// 顶部文字
const topNavText = computed(() => globalStore.getNavInfo)

// 加载课程表函数
const loadSchedule = async () => {
  const res = await window.electron.loadJsonFromFile('schedule.json');
  console.log(res);
  if (res === -1) {
    ElMessage.error("加载课程表失败!");
  } else if (res === -2) {
    ElMessage.warning("本地没有课程表，请先创建!");
  } else {
    ElMessage.success("加载课程表成功!");
  }
}

// 挂载后，加载用户设置文件
onMounted(async () => {
  const res = await settingStore.loadData();
  if (res === -1) {
    ElMessage.error("加载用户设置失败!");
  } else if (res === 0) {
    ElMessage.warning("本地没有用户设置，请先设置!");
  } else {
    // ElMessage.success("加载用户设置成功!");
    loadSchedule();
  }
});
</script>

<template>
  <div class="main-container">
    <div class="left-handle">
      <HandlePanel></HandlePanel>
    </div>
    <div class="right-routerview">
      <div class="head-info">
        <TopNav :title="topNavText"></TopNav>
      </div>
      <div class="router-output">
        <RouterView />
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  // background-color: #F6F6F7;
  // width: 100vw;
  // height: 100vh;
  // min-height: 1000px;
  // min-width: 900px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;

  .left-handle {
    width: 20%;
    height: 100%;
    // background-color: #5C6AC4;
    // border-radius: 0 20px 20px 0;

    // padding: 20px;
    box-sizing: border-box;
  }

  .right-routerview {
    width: 80%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;

    .head-info {
      // background-color: red; 
      height: 10%;
      width: 100%;
    }

    .router-output {
      height: 90%;
      padding: 20px;
      box-sizing: border-box;
      // background-color: blue;
      // min-height: 90%;
      width: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
