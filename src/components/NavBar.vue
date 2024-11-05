<script setup>
import { ref, defineOptions } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

defineOptions({
     name: 'NavBar'
})
const hello = ref('来写')

const barList = ref([
    {id: 1, label: '我的课表', icon: 'icon-kechengbiao', route: '/course'},
    {id: 2, label: '看看天气', icon: 'icon-tianqi', route: '/weather'},
    {id: 3, label: '设置中心', icon: 'icon-shezhi', route: '/setting'},
])
const routerFunc = (e) => {
    router.push(e)
}
</script>

<template>
    <div class="nav-bar">
        <ul>
            <li v-for="item in barList" :key="item.id" @click="routerFunc(item.route)">
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