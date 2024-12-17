<script setup>
import { defineOptions } from 'vue';

defineOptions({
     name: 'CourseTime'
});

const props = defineProps({
    startTime: {
        type: String,
        required: true,
        default: '08:00'
    },
    endTime: {
        type: String,
        required: true,
        default: '08:45'
    }
});
</script>

<template>
    <div class="course-time">
        <div class="start">{{ startTime }}</div>
        <div class="end">{{ endTime }}</div>
    </div>
</template>

<style lang="scss" scoped>
.course-time {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    color: black;
    text-align: center;
    font-size: 12px;

    .start, .end {
        width: 100%;
        margin: 5px 0;
    }
}
</style>