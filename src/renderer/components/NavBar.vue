<script setup>
import { ref, defineOptions, computed } from 'vue'

// 路由
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

// Pinia
import { useGlobalStore } from '../stores/global.js'
const globalStore = useGlobalStore()


defineOptions({
    name: 'NavBar'
})
const hello = ref('来写')

const barList = ref([
    { id: 1, label: '我的课表', icon: 'icon-kechengbiao', route: '/course' },
    { id: 2, label: '看看天气', icon: 'icon-tianqi', route: '/weather' },
    { id: 3, label: '设置中心', icon: 'icon-shezhi', route: '/setting' },
])
const routerFunc = (e1, e2, e3) => {
    globalStore.setActive(e2)
    globalStore.setNavInfo(e3)
    router.push(e1)
}

const activateLi = computed(() => globalStore.getActive)
</script>

<template>
    <div class="nav-bar">
        <ul>
            <li v-for="item in barList" :key="item.id" @click="routerFunc(item.route, item.id, item.label)"
                :class="item.id == activateLi ? 'active-li' : ''">
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
            color: #626AEF;
        }

        span {
            margin-left: 10px;
            letter-spacing: 2px;
        }

        .active-li {
            transform: translateX(0%);
            color: #fff;
            background-color: #6269efb9;
        }
    }
}
</style>