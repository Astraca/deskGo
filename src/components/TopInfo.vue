<script setup>
import { ref, defineOptions, onMounted } from 'vue'
defineOptions({
     name: 'TopInfo'
})
const date = ref('YYYY-MM-DD')
const getDateInfo = () => {
    const now = new Date()
    // Date
    const yy = now.getFullYear()
    const mm = (now.getMonth() + 1).toString().padStart(2, '0')
    const dd = now.getDate().toString().padStart(2, '0')
    console.log(yy, mm, dd);
    date.value = `${yy}-${mm}-${dd}`
}
const time = ref("HH:MM:SS")
const Timer = ref(null)
const getTimeInfo = () => {
    const now = new Date()
        // Time
    const hour = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    time.value = `${hour}:${minutes}:${seconds}`
    
}
onMounted(()=> {
    // 获取日期和时间信息
    getDateInfo()
    Timer.value = setInterval(() => {
        getTimeInfo()
    }, 100)
})
</script>

<template>
    <div class="top-info">
        <div class="date">
            {{ date }}
        </div>
        <div class="time">
            {{ time }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.top-info {
    height: 100%;
    width: 100%;
    color: #000639;
    font-weight: 550;
    // border-bottom: 1px dotted ;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    // background-color: red;

    .date, .time {
        width: 100%;
        text-align: center;
    }

    .date {
        font-size: x-large;
    }

    .time {
        font-size: large;
    }
}
</style>