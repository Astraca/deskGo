<script setup>
import { ref, defineOptions } from 'vue'
defineOptions({
     name: 'CoursePage'
})
const hello = ref('我的课表')
const tableHead = ref(['周一', '周二', '周三' ,'周四' ,'周五' ,'周六', '周日'])
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