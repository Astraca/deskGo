<script setup>
import { ref, defineOptions } from 'vue'
defineOptions({
     name: 'WeatherPage'
})
const hello = ref('天气中心')

import useGeoLocation  from '../utils/useGeoLocation.js'
const { location, error, getLocation } = useGeoLocation()
const getGeoLocation = () => {
    // 获取地理信息
    getLocation()
    console.log(location.value)
    // TODO: 将地理信息进行存储
}
onMounted(() => {
    getGeoLocation()
})


</script>

<template>
    <div class="container">
        {{ hello }}
    </div>
</template>

<style lang="scss" scoped>
.container {
    height: 100%;
    width: 100%;
    background-color: #f6f6f752;
    border-radius: 20px;
    // padding: 20px;
    color: white;
    text-align: center;
}
</style>