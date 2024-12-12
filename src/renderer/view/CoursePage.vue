<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// Pinia
import { useSettingStore } from '@/stores/setting.js'
import { useCourseStore } from '@/stores/course.js'

// utils
import { time2minutes, minutes2time } from '@/utils/courseRelate';

const settingStore = useSettingStore();
const courseStore = useCourseStore();

const { totalWeekNum, startTime, startDate, courseDuration, courseNum } = settingStore.getSettingForm;
const endTime = '23:00'; // 结束时间
const { getSchedule, setSchedule } = courseStore;
const scheduleObject = ref(null);
// const
onMounted(() => {
    console.log('挂载了');
    getScheduleData()
    
});
const getScheduleData = () => {
    console.log('getScheduleData');
    scheduleObject.value = getSchedule;
    console.log('数据', scheduleObject.value);
};

defineOptions({
    name: 'CoursePage'
});

const tableHead = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日']);


// 添加课程
const tempCourseOption = ref(null);
const addCourseDialog = ref(false);
const addCourse = () => {
    addCourseDialog.value = true;
    const timeStamp = new Date().getTime();
    tempCourseOption.value = {
        id: timeStamp,  // 时间戳作为id
        name: '',
        teacher: '',
        room: '',
        startTime: '',
        endTime: '',
        week: []
    };
    // ElMessage.success("模拟添加成功");
};

// 选择周数
const activateWeeks = ref([]);
onMounted(() => {
    for (let i = 1; i <= totalWeekNum; i++) {
        activateWeeks.value.push(i);
    }
});
const weekHaveCourse = (e, i) => {
    if (!isActiveCourse(i)) activateWeeks.value.push(i);
    else activateWeeks.value.splice(activateWeeks.value.indexOf(i), 1); // 从目标开始，删除一个元素
};
const isActiveCourse = (item) => {
    return activateWeeks.value.includes(item);
};

// 关闭dialoag
const closeDialog = () => {
    tempCourseOption.value = null;
    addCourseDialog.value = false;
};
// 清除数据
const clearData = () => {
    tempCourseOption.value = null;
    activateWeeks.value = [];
    courseStartTime.value = '';
    courseEndTime.value = '';
    weekDay.value = null;
};
// 确认添加课程
const saveCourse = () => {
    console.log(tempCourseOption.value);
    tempCourseOption.value.startTime = courseStartTime.value;
    tempCourseOption.value.endTime = courseEndTime.value;
    tempCourseOption.value.week = activateWeeks.value;
    console.log(tempCourseOption.value);
    
    setSchedule(tempCourseOption.value);
    getScheduleData();
    closeDialog();
    clearData();

};

// 最小时间
const courseStartTime = ref('');
const courseEndTime = ref('');
const closeWatchMinTime = watch(courseStartTime, (newValue, oldValue) => {
    if (newValue !== undefined && oldValue !== undefined) {
        const minutes = time2minutes(newValue);
        courseEndTime.value = minutes2time(minutes + courseDuration);        
    }
});

// 选择WeekDay
const weekDay = ref(null);
const weekDayList = ref([
    {
        id: 1,
        name: '周一'
    },
    {
        id: 2,
        name: '周二'
    },
    {
        id: 3,
        name: '周三'
    },
    {
        id: 4,
        name: '周四'
    },
    {
        id: 5,
        name: '周五'
    },
    {
        id: 6,
        name: '周六'
    },
    {
        id: 7,
        name: '周日'
    }
]);
const handleWeekDayChange = () => {
    console.log(weekDay.value);
};
</script>

<template>
    <div class="course-page">
        <div class="course-add">
            <el-row justify="end">
                <el-col :span="4" class="course-add-btn">
                    <el-button :icon="Plus" type="primary" @click="addCourse">
                        导入课表
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <el-dialog v-model="addCourseDialog" title="导入课表" width="600" align-center center :close-on-click-modal="false"
            @close="closeDialog">
            <el-form class="form-style">
                <el-form-item label="课程名称:">
                    <el-input v-model="tempCourseOption.name" clearable placeholder="请输入课程名称"></el-input>
                </el-form-item>
                <el-form-item label="任课教师:">
                    <el-input v-model="tempCourseOption.teacher" clearable placeholder="请输入任课教师"></el-input>
                </el-form-item>
                <el-form-item label="上课教室:">
                    <el-input v-model="tempCourseOption.room" clearable placeholder="请输入上课教室"></el-input>
                </el-form-item>
                <el-form-item label="周几上课:">
                    <el-radio-group fill="#626AEF" v-model="weekDay" @change="handleWeekDayChange">
                        <el-radio-button v-for="item in weekDayList" :key="item.id" :value="item.id">
                            {{ item.name }}
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上课时间:">
                    <div class="flex space-between" style="width: 100%;">
                        <el-time-select v-model="courseStartTime" style="width: 45% " placeholder="开始时间"
                            :start="startTime" step="00:05" :end="endTime" />
                        <span>-</span>
                        <el-time-select v-model="courseEndTime" style="width: 45%" :min-time="courseStartTime"
                            placeholder="结束时间" :start="startTime" step="00:05" :end="endTime" />
                    </div>
                </el-form-item>

                <el-form-item label="上课周数:">
                    <!-- <el-button>设定</el-button> -->
                    <div style="flex-wrap: wrap;" class="flex start weeks">
                        <span v-for="(item, index) in totalWeekNum" :key="index"
                            :class="isActiveCourse(item) ? 'week-have-course' : 'week-no-course'"
                            class="week-have-course" @click="weekHaveCourse($event, item)"> {{ item
                            }}</span>
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button round plain type="primary" @click="addCourseDialog = false">取消</el-button>
                    <el-button round color="#626AEF" @click="saveCourse">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <div class="time-table">
            <table>
                <thead>
                    <tr>
                        <td>时间</td>
                        <td v-for="item in tableHead" :key="item"> {{ item }}</td>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>2</td>
                        <td>1</td>
                    </tr>
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
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    // 添加课程
    .course-add {
        width: 80%;
        line-height: 60px;
        height: 60px;
        // background-color: red;

        &-btn {
            // background-color: blue;
        }
    }

    // 课程表样式
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

            thead {
                td {
                    height: 40px;
                    border: 2px solid black;
                    color: black;
                }
            }
        }
    }

    // 布局样式
    .flex {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .space-between {
        justify-content: space-between;
    }

    .space-around {
        justify-content: space-around;
    }

    .start {
        justify-content: flex-start;
    }

    .form-style {
        .weeks {
            span {
                display: inline-block;
                width: 45px;
                height: 45px;
                line-height: 45px;
                text-align: center;
                margin: 5px;
                border-radius: 50%;
                box-sizing: border-box;
                border: 1px solid #aaa;
                cursor: pointer;
            }
        }

        .week-have-course {

            background-color: #626AEF;
            color: white;


            &:hover {
                background-color: #9197F4;
            }
        }

        .week-no-course {

            background-color: #fff;
            color: black;

            &:hover {
                background-color: #9197F4;
                color: white;
            }
        }



    }
}
</style>