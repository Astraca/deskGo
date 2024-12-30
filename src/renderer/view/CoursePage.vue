<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// 组件
import CourseTime from '@/components/CourseTime.vue';

// Pinia
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting.js'
import { useCourseStore } from '@/stores/course.js'

// utils
import { time2minutes, minutes2time, saveAsJson, getCurrentWeek, calculateWeekAndDate } from '@/utils/courseRelate';

const settingStore = useSettingStore();
const courseStore = useCourseStore();

const { totalWeekNum, startTime, courseDuration } = settingStore.getSettingForm || JSON.parse(settingStore.getSettingForm);
const endTime = '23:00'; // 结束时间
const { getSchedule, setSchedule } = courseStore;

const scheduleObject = computed(() => getSchedule);
// const
// onMounted(() => {
//     console.log('挂载了');
//     console.log('当前 schedule:', scheduleObject.value);
// });

defineOptions({
    name: 'CoursePage'
});

const tableHead = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日']);


// 添加课程
const tempCourseOption = ref({});
const addCourseDialog = ref(false);
const addCourse = () => {
    addCourseDialog.value = true;
    activeDefaultWeeks(); // 默认选中全部周数
    const timeStamp = new Date().getTime();  // 时间戳作为id
    tempCourseOption.value = {
        id: timeStamp,  // 时间戳作为id
        name: '',
        teacher: '',
        room: '',
        startTime: '',
        endTime: '',
        weekDay: '',
        week: []
    };
    // ElMessage.success("模拟添加成功");
};

// 选择周数
const activateWeeks = ref([]);
const activeDefaultWeeks = () => {
    for (let i = 1; i <= totalWeekNum; i++) {
        activateWeeks.value.push(i);
    }
}

// 选择有当前课程的周数
const weekHaveCourse = (e, i) => {
    if (!isActiveCourse(i)) activateWeeks.value.push(i);
    else activateWeeks.value.splice(activateWeeks.value.indexOf(i), 1); // 从目标开始，删除一个元素
};

// 判断之前是否已经添加过当前周数，用于取消选中和添加选中
const isActiveCourse = (item) => {
    return activateWeeks.value.includes(item);
};

// 关闭 dialoag
const closeDialog = () => {
    addCourseDialog.value = false;
};

// 清除数据
const clearData = () => {
    tempCourseOption.value = {};
    activateWeeks.value = [];
    courseStartTime.value = '';
    courseEndTime.value = '';
    weekDay.value = null;
    timeList = settingStore.getSettingForm.timeList;
};

// 确认添加课程
const saveCourse = async () => {
    tempCourseOption.value.startTime = courseStartTime.value;
    tempCourseOption.value.endTime = courseEndTime.value;
    tempCourseOption.value.week = activateWeeks.value;
    tempCourseOption.value.weekDay = weekDay.value;

    // 校验数据
    for (const key in tempCourseOption.value) {
        if ((key === 'week' && tempCourseOption.value[key].length === 0) || !!!tempCourseOption.value[key]) {
            ElMessage.error("请完整填写课程信息!");
            return;
        }
    }

    // 保存到 store 和 存储到本地
    setSchedule(tempCourseOption.value);
    const res = await saveAsJson(scheduleObject.value, 'course.json');

    if (res) {
        ElMessage.success("添加成功!")
        closeDialog();
        clearData();
    } else {
        ElMessage.error("添加失败!")
    }
};

// 最小时间
let timeList = settingStore.getSettingForm.timeList;
const courseStartTime = ref('');
const courseEndTime = ref('');
const getAllTime = () => {
    timeList = settingStore.getSettingForm.timeList;
};
watch(courseStartTime, (newValue, oldValue) => {    
    if (newValue !== undefined && oldValue !== undefined && newValue !== '') {
        timeList = timeList.filter(item => item.courseId > newValue)
        courseEndTime.value = newValue + 1;
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

// 课程数据
const totalCourseData = getSchedule;

const currentWeekCourse = ref([]);

const getCurrentWeekCourses = () => {
    if (totalCourseData.length === 0) {
        ElMessage.error("暂无课程数据");
        return;
    }
    const currentWeek = getCurrentWeek();  // 当前周
    totalCourseData.forEach(item => {
        if (item.week.includes(currentWeek)) {  // 当前课程在本周有课程安排
            currentWeekCourse.value.push(item);
        }
    })
}

// 课程表渲染
const timeListRender = settingStore.getSettingForm.timeList;

// 测试按钮
const testBtn = () => {
    console.log('测试部分');
    // calculateWeekAndDate('2024-09-02', 18)
    console.log(getCurrentWeekCourses());
    console.log(currentWeekCourse.value);

    console.log('测试部分----end');
}
</script>

<template>
    <div class="course-page">
        <div>
            {{ useSettingStore().getSettingForm.timeList }}
            <h3>测试查看</h3>
            {{ totalCourseData }}
        </div>
        <div class="course-add">
            <el-row justify="end">
                <el-col :span="4" class="course-add-btn">
                    <el-button round plain type="primary" @click="testBtn">
                        测试按钮
                    </el-button>
                </el-col>
                <el-col :span="4" class="course-add-btn">
                    <el-button size="large" round color="#626AEF" :icon="Plus" type="primary" @click="addCourse">
                        添加课程
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <el-dialog v-if="addCourseDialog" v-model="addCourseDialog" title="添加课程" width="600" align-center center
            :close-on-click-modal="false" @close="closeDialog">
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
                        <!-- <el-time-select v-model="courseStartTime" style="width: 45% " placeholder="开始时间"
                            :start="startTime" step="00:05" :end="endTime" /> -->
                            <el-select
                              v-model="courseStartTime"
                              placeholder="开始时间"
                              @focus="getAllTime"
                            >
                                <el-option v-for="item in timeList" :key="item.courseId" :label="`第${item.courseId}节`" :value="item.courseId" />
                            </el-select>
                            <!-- <el-option v-for="item in timeList" :key="item.courseId" :label="`第${item.courseId}节`" :value="item.courseId" /> -->
                        <span>&nbsp;—&nbsp;</span>
                        <!-- <el-time-select v-model="courseEndTime" style="width: 45%" :min-time="courseStartTime"
                            placeholder="结束时间" :start="startTime" step="00:05" :end="endTime" /> -->
                            <el-select
                              v-model="courseEndTime"
                              placeholder="结束时间"

                            >
                                <el-option v-for="item in timeList" :key="item.courseId" :label="`第${item.courseId}节`" :value="item.courseId" />
                            </el-select>
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
                        <td style="width: 100px;">时间</td>
                        <td v-for="item in tableHead" :key="item"> {{ item }}</td>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="item in timeListRender" :key="item.courseId">
                        <td>
                            <CourseTime :startTime="item.startTime" :endTime="item.endTime"/>
                        </td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
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
    }

    // 课程表样式
    .time-table {
        width: 100%;
        height: 100%;
        // background-color: blue;
        // display: flex;
        // align-items: center;
        // justify-content: center;

        table {
            width: 80%;
            height: 80%;
            margin: 0 auto;
            // max-height: 90%;
            // background-color: red;
            border: 1px solid black;
            border-collapse: collapse;

            td {
                border: 1px solid black;
                color: black;
            }

            thead {
                td {
                    height: 40px;
                    // border: 2px solid black;
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
                background-color: #fff;
                border-color: #626AEF;
                color: #626AEF;

            }
        }

    }
}
</style>