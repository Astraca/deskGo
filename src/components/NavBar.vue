<script setup>
import { ref, defineOptions } from 'vue'
defineOptions({
     name: 'NavBar'
})
const hello = ref('来写')

const barList = ref([
    {id: 1, label: '我的课表', icon: 'icon-kechengbiao'},
    {id: 2, label: '天气中心', icon: 'icon-tianqi'},
    {id: 3, label: '课表设置', icon: 'icon-shezhi'},
])
</script>

<template>
    <div class="nav-bar">
        <ul>
            <li v-for="item in barList" :key="item.id">
                <i class="iconfont" :class="item.icon"></i>
                <span>{{ item.label }}</span>
                <!-- <span>{{ item.label }}</span> -->
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.nav-bar {
    height: 100%;

    ul {
        padding: 30px 0;
        margin: 0;
        li {
            transform: translateX(-10%);
            height: 60px;
            line-height: 60px;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all linear 0.2s;
        }
        li:hover {
            transform: translateX(0%);
            background-color: #D2C1EC;
            color: white
        }
        span {
            margin-left: 10px;
            letter-spacing: 2px;
        }
    }
}
</style>