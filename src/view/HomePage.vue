<script setup lang="ts">
// import { ElMessage } from 'element-plus';
import { ref, defineOptions } from 'vue'

defineOptions({
    name: 'HomePage',
})
const hello = ref('来写')

const open1 = () => {
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
    plain: true,
  })
}
const value = ref(new Date())
</script>

<template>
    <div class="container">
        <!-- {{ hello }} -->
        <!-- <el-button type="success" @click="open1">测试</el-button> -->
        <!-- <el-calendar v-model="value" /> -->
    </div>
</template>

<style lang="scss" scoped>
.container {
    // background-color: #F6F6F7;
    // padding: 20px;
    color: black;
    text-align: center;
}
</style>