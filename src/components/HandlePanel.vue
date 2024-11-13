<script setup>
import { ref, defineOptions } from 'vue'
import TopInfo from './TopInfo.vue'
import NavBar from './NavBar.vue';


defineOptions({
     name: 'HandlePanel'
})
const hello = ref('来写')
</script>

<template>
    <div class="container">
        <div class="top">
            <TopInfo></TopInfo>
        </div>
        <div class="bottom">
            <NavBar></NavBar>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1); /* 半透明背景色 */
    // overflow: hidden;
    // backdrop-filter: grayscale(10px);
    // filter: blur(100%);
    // background-color: blue;
    .top {
        width: 100%;
        height: 10%;
    }
    .bottom {
        width: 100%;
        height: 90%;
        box-shadow: 5px 5px 5px #a2a3e09c;

    }
}
</style>