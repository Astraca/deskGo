<script setup>
import { ref, defineOptions } from 'vue'
defineOptions({
    name: 'TopNav',
})

const props = defineProps({
    title: {
        type: String,
        required: true,
        default: 'DeskGo'
    }
})
</script>

<template>
    <div class="container">
        <span>{{ title }}</span>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: rgba(255, 255, 255, 0.1); /* 半透明背景色 */
    box-shadow: 5px 5px 5px #a2a3e09c;
    span {
        color: white;
        letter-spacing: 1px;
        font-size: xx-large;
        font-weight: 550;
    }
}
</style>