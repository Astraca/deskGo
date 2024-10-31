<script setup>
import { ref, defineOptions } from 'vue'
defineOptions({
     name: 'WeatherPage'
})
const hello = ref('来写')
</script>

<template>
    <div class="container">
        {{ hello }}
    </div>
</template>

<style lang="scss" scoped>
.container {
    background-color: #F6F6F7;
    padding: 20px;
    color: white;
    text-align: center;
}
</style>