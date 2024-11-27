<script setup>
import { ref } from 'vue';

defineOptions({
    name: 'CoursePage'
});

const hello = ref('我的课表');
const tableHead = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日']);
const timeSeries = computed(() => 
    const startTime = "08:00";
    const courseStep = 45;
    const relea = 0;
});

const 

const timeTableData = ref([
    {courseName: "开源软件开发方法与实践1", teacherName: "杨雷1", classRoomLocation:"1东四-204", classStart: 0, classEnd:2},
    {courseName: "开源软件开发方法与实践2", teacherName: "杨雷2", classRoomLocation:"2东四-204", classStart: 1, classEnd:3},
    {courseName: "开源软件开发方法与实践3", teacherName: "杨雷3", classRoomLocation:"3东四-204", classStart: 2, classEnd:4},
    {courseName: "开源软件开发方法与实践4", teacherName: "杨雷4", classRoomLocation:"4东四-204", classStart: 3, classEnd:5},
    {courseName: "开源软件开发方法与实践5", teacherName: "杨雷5", classRoomLocation:"5东四-204", classStart: 4, classEnd:6},
])
</script>

<template>
    <div class="course-page">
        <div class="time-table">
            <table>
                <thead>
                    <th>时间</th>
                    <th v-for="item in tableHead" :key="item"> {{ item }}</th>
                </thead>

                <tbody>
                    
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.course-page {
    height: 100%;
    width: 100%;
    // background-color: #f6f6f723;
    border-radius: 20px;
    // padding: 20px;
    color: white;
    text-align: center;
    .time-table {
        width: 100%;
        height: 100%;
        // background-color: blue;
        display: flex;
        align-items: center;
        justify-content: center;
        table {
            width: 80%;
            height: 80%;
            // max-height: 90%;
            // background-color: red;
            border-collapse: collapse;
            th {
                height: 40px;
                border: 2px solid black;
            }
        }
    }
}
</style>