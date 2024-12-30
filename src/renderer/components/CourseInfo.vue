<script setup>
import { ref, defineOptions, computed } from 'vue';
defineOptions({
    name: 'CourseInfo'
});
const props = defineProps({
    courseName: {
        type: String,
        required: true,
        default: '课程名称',
    },
    courseTeacher: {
        type: String,
        required: true,
        default: '任课教师'
    },
    courseRoom: {
        type: String,
        required: true,
        default: '上课教室'
    },
    color: {
        type: String,
        required: false,
        default: '#626AEF'
    },
    fontColor: {
        type: String, required: false, default: '#E8E9FD'
    }
});

const bgcColor = computed(() => ({
    backgroundColor: props.color,
    color: props.fontColor,
    '--border-color': props.color,
    '--shadow-color': props.color,
    '--font-color': props.fontColor,
}));
</script>

<template>
    <div class="course-info" :style="bgcColor">
        <div class="courseName">
            {{ courseName }}
        </div>
        <div class="bottom">
            <div class="courseTeacher flex center">
                <el-icon :size="14">
                    <User />
                </el-icon>
                <span>{{ courseTeacher }}</span>
            </div>
            <div class="courseRoom flex center">
                <el-icon :size="14">
                    <Location />
                </el-icon>
                <span>{{ courseRoom }}</span>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.course-info {
    // background-color: var();
    height: 100%;
    // width: 80px;
    // min-width: 80px;
    // max-width: 80px;
    padding: 20px 0;
    width: 100%;
    color: black;
    text-align: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    // border: 1px solid #FFF;
    // margin: 1px;
    border-radius: 5px;
    cursor: pointer;
    transition: all .3s;
    // margin: 0 auto;

    &:hover {
        color: var(--shadow-color) !important;
        background-color: var(--font-color) !important;
        // filter: invert(30%);
        // border: 1px solid var(--shadow-color) !important;
        box-shadow: 0px 0px 10px var(--shadow-color);
        transform: scale(0.94);
    }

    .courseName {
        width: 100%;
        font-weight: 550;
        font-size: 14px;
        margin-bottom: 12px;
    }

    .bottom {
        width: 100%;

        .courseTeacher,
        .courseRoom {
            width: 100%;
            text-align: left;
            margin: 0 auto;
            // overflow: hidden;
            padding: 0 5px;
            box-sizing: border-box;
            font-size: 10px;
            // text-overflow: ellipsis;
            // background-color: red;
            span {
                text-align: center;
                margin: 5px;
            }
        }
    }

    .flex {
        display: flex;
    }

    .center {
        align-items: center;
        justify-content: center;
    }

    .space-around-col {
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

    }
}
</style>