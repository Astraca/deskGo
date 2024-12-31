<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// 组件
import CourseTime from '@/components/CourseTime.vue';
import CourseInfo from '@/components/CourseInfo.vue';

// Pinia
import { storeToRefs } from 'pinia';
import { useSettingStore } from '@/stores/setting.js'
import { useCourseStore } from '@/stores/course.js'

// utils
import { getTodaysWeekDay, saveAsJson, getCurrentWeek, calculateWeekAndDate } from '@/utils/courseRelate';

defineOptions({
    name: 'CoursePage'
});

const settingStore = useSettingStore();
const courseStore = useCourseStore();

const { totalWeekNum } = settingStore.getSettingForm || JSON.parse(settingStore.getSettingForm);

const { getSchedule, setSchedule } = courseStore;

const scheduleObject = computed(() => getSchedule);
const dayWeekRelation = ref(null);
onMounted(() => {
    const { startDate, totalWeekNum } = settingStore.getSettingForm;
    dayWeekRelation.value = calculateWeekAndDate(startDate.split('T')[0], totalWeekNum);
})


const tableHead = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日']);
const courseFlag = ref([]);
const dialogTitle = ref('');
const confirmButtonText = ref('保存');
const timeListObject = ref({});
// onMounted(() => {
//     // console.log(settingStore.getSettingForm.timeList);

// });
const temp = settingStore.getSettingForm.timeList;
temp.forEach(() => {
    const tempFlag = [];
    for (let i = 0; i < tableHead.value.length; i++) {
        tempFlag.push(false);
    }
    courseFlag.value.push(tempFlag);
})
// 加载课程表函数
const loadSchedule = async () => {
    const res = await window.electron.loadJsonFromFile('course.json');
    if (res === -1) {
        ElMessage.error("加载课程表失败!");
    } else if (res === -2) {
        ElMessage.warning("本地没有课程表，请先创建!");
    } else {
        // ElMessage.success("加载课程表成功!");
        courseStore.setAllSchedule(res);  // 加载课程表数据到 store
        // getNewData();
    }
}

// 添加课程
const tempCourseOption = ref({});
const addCourseDialog = ref(false);
const addCourse = () => {
    addCourseDialog.value = true;
    dialogTitle.value = '添加课程';
    confirmButtonText.value = '保存';
    courseEndTime.value = '';
    globalFlag.value = true;
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
// 已选择周数回显
const choicedWeeks = (weekList) => {
    activateWeeks.value = weekList
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
    clearData();
};

// 清除数据
const clearFlag = ref(false);
const clearData = () => {
    tempCourseOption.value = {};
    activateWeeks.value = [];
    courseStartTime.value = '';
    courseEndTime.value = '';
    weekDay.value = getTodaysWeekDay();
    globalFlag.value = false;
    clearFlag.value = true;
    timeList = settingStore.getSettingForm.timeList;
};
const cancleButton = () => {
    clearData();
    addCourseDialog.value = false;
    clearFlag.value = false;
}
// 确认添加课程
const saveCourse = async () => {
    tempCourseOption.value.startTime = courseStartTime.value;
    tempCourseOption.value.endTime = courseEndTime.value;
    tempCourseOption.value.week = activateWeeks.value;
    tempCourseOption.value.weekDay = weekDay.value;
    if(confirmButtonText.value == '保存'){
        totalCourseData.value.push(tempCourseOption.value);
    } else if (confirmButtonText.value == '更新') {
        console.log(tempCourseOption.value, totalCourseData.value);
        
    }
    // 校验数据
    for (const key in tempCourseOption.value) {
        if ((key === 'week' && tempCourseOption.value[key].length === 0) || !!!tempCourseOption.value[key]) {
            ElMessage.error("请完整填写课程信息!");
            return;
        }
    }

    // 保存到 store 和 存储到本地
    // TODO: 更新的时候需要修改此处的逻辑
    setSchedule(tempCourseOption.value);
    const res = await saveAsJson(totalCourseData.value, 'course.json');

    if (res) {
        closeDialog();
        clearData();
        loadSchedule();
        renderData();
        ElMessage.success(`${confirmButtonText.value}成功!`);
        // getNewData();
        // getCurrentWeekCourses();
    } else {
        ElMessage.error(`${confirmButtonText.value}失败!`)
    }
};

// 最小时间
let timeList = settingStore.getSettingForm.timeList;
const courseStartTime = ref('');
const courseEndTime = ref('');
const globalFlag = ref(false);
const getAllTime = () => {
    timeList = settingStore.getSettingForm.timeList;
};
watch(courseStartTime, (newValue, oldValue) => {
    if (globalFlag.value === false) {
        if (newValue !== undefined && newValue >= courseEndTime.value) {
            timeList = timeList.filter(item => item.courseId > newValue);
            if (dialogTitle.value === '修改课程信息') {

                courseEndTime.value = newValue + 1;
            }
        }
    } else {

        if (newValue !== undefined && oldValue !== undefined && newValue !== '') {
            timeList = timeList.filter(item => item.courseId > newValue);
            courseEndTime.value = newValue + 1;
        }
    }
});

// 选择WeekDay
const weekDay = ref(null);
// onMounted(() => {
//     // 获取当前
//     weekDay.value = getTodaysWeekDay();
// })
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
const totalCourseData = computed(() => getSchedule);
onMounted(() => {
    weekDay.value = getTodaysWeekDay();
    // getNewData();
    // getCurrentWeekCourses();
    renderData();
});

// 获取新数据
// const getNewData = () => {
//     totalCourseData.value = getSchedule;
// }

// 当前周课程
const currentWeekCourse = ref([]);
const isRightCourse = (data) => {
    const currentWeek = getCurrentWeek(dayWeekRelation.value);  // 当前周
    const { week } = data;    
    if(week.includes(currentWeek)){
        return true;
    }
    return false;
}
const getCurrentWeekCourses = () => {
    if (totalCourseData.length === 0) {
        ElMessage.error("暂无课程数据");
        return;
    }
    const currentWeek = getCurrentWeek(dayWeekRelation.value);  // 当前周
    console.log(totalCourseData.value);
    
    totalCourseData.value.forEach(item => {
        if (item.week.includes(currentWeek)) {  // 当前课程在本周有课程安排
            currentWeekCourse.value.push(item);
        }
    })
}

// 课程表渲染
const timeListRender = settingStore.getSettingForm.timeList;
// onMounted(() => {
//     renderData();
// })

const renderData = () => {    
    timeListRender.map(item => {
        const temp = [];
        totalCourseData.value.forEach(course => {
            if ((item.courseId == course.startTime) && isRightCourse(course)) {
                temp.push(course);
            }
        });
        const data = {};
        temp.forEach(item => {
            data[item.weekDay] = item;
        });

        item['courses'] = temp;
        timeListObject.value[item.courseId] = {
            data: data,
            startTime: item.startTime,
            endTime: item.endTime
        };
    });
}


// 合并行数
const getRowSpanNum = (key, value) => {
    if (courseFlag.value) {
        const xAxis = value.weekDay - 1;
        for (let i = value.startTime; i <= value.endTime; ++i) {
            courseFlag.value[i - 1][xAxis] = true;
        }
        return value.endTime - value.startTime + 1;
    }
};
const mergeSpan = (day, data) => {
    const { startTime, endTime } = data;
    for (let i = startTime; i < endTime; i++) {
        courseFlag.value[i][day - 1] = true;
    }
    return endTime - startTime + 1;
}
const hasMergeColAndRow = (day, row) => {
    let result;
    if (courseFlag.value[row][day - 1] === false) {
        result = true;
    } else {
        result = false;
    }
    return result;
}

// 修改课程内容
const findCourseInfo = (coursesList, id) => {
    let result = -1;
    coursesList.forEach(item => {
        if (item.id === id) result = item;
    });
    return result;
}
const enableChange = (id) => {
    console.log('当前尝试修改内容', id);
    console.log(currentWeekCourse.value);
    
    const result = findCourseInfo(totalCourseData.value, id);

    if (result !== -1) {
        // Find Successfully
        console.log('查找成功结果为:', result);
        changeCourse(result);

    } else {
        console.log('查找失败');

    }
    addCourseDialog.value = true;
}
const changeCourse = (data) => {
    dialogTitle.value = '修改课程信息';
    confirmButtonText.value = '更新';
    getTodaysWeekDay()
    // 回显已选择周数信息
    choicedWeeks(data.week);
    const { endTime, name, room, startTime, teacher, weekDay: WK } = data;
    tempCourseOption.value.name = name;
    tempCourseOption.value.teacher = teacher;
    tempCourseOption.value.room = room;
    weekDay.value = WK;
    courseStartTime.value = startTime;
    courseEndTime.value = endTime;

}
// 测试按钮
const testBtn = () => {
    console.log('测试部分');
    // console.log(getCurrentWeekCourses());
    // console.log(currentWeekCourse.value);
    // console.log(timeListRender);
    // getNewData()
    console.log(currentWeekCourse.value);
    console.log(timeListRender.value);
    console.log(timeListObject.value);

    console.log('测试部分----end');
}
</script>

<template>
    <div class="course-page">
        <!-- <div>
            {{ useSettingStore().getSettingForm.timeList }}
            <h3>测试查看</h3>
            {{ totalCourseData }}
        </div> -->
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
        <el-dialog v-if="addCourseDialog" v-model="addCourseDialog" :title="dialogTitle" width="600" align-center center
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
                        <el-select v-model="courseStartTime" placeholder="开始时间" @visible-change="getAllTime">
                            <el-option v-for="item in timeList" :key="item.courseId" :label="`第${item.courseId}节`"
                                :value="item.courseId" />
                        </el-select>
                        <!-- <el-option v-for="item in timeList" :key="item.courseId" :label="`第${item.courseId}节`" :value="item.courseId" /> -->
                        <span>&nbsp;—&nbsp;</span>
                        <!-- <el-time-select v-model="courseEndTime" style="width: 45%" :min-time="courseStartTime"
                            placeholder="结束时间" :start="startTime" step="00:05" :end="endTime" /> -->
                        <el-select v-model="courseEndTime" placeholder="结束时间">
                            <el-option v-for="item in timeList" :key="item.courseId" :label="`第${item.courseId}节`"
                                :value="item.courseId" />
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
                    <el-button round type="danger" v-if="!globalFlag">删除</el-button>
                    <el-button round color="#626AEF" @click="saveCourse">
                        {{ confirmButtonText }}
                    </el-button>
                    <el-button round plain type="primary" @click="cancleButton">取消</el-button>

                </div>
            </template>
        </el-dialog>
        <!-- {{ timeListRender }} -->

        <div class="time-table">
            <table>
                <thead>
                    <tr>
                        <td>时间</td>
                        <td v-for="item in tableHead" :key="item"> {{ item }}</td>
                    </tr>
                </thead>

                <tbody>

                    <template v-if="timeListObject">
                        <tr v-for="(value, key, index) in timeListObject" :key="index">
                            <td>
                                <CourseTime :startTime="value.startTime" :endTime="value.endTime" />
                            </td>
                            <template v-for="day in tableHead.length">
                                <template v-if="value.data[day]">
                                    <!-- <td :rowspan="value.data[item].endTime - value.data[item].startTime + 1"> -->
                                    <td v-if="hasMergeColAndRow(day, index)" :rowspan="mergeSpan(day, value.data[day])">
                                        <!-- :rowspan="value.data[day].endTime - value.data[day].startTime + 1"> -->
                                        <!-- <span>{{ value.data[day].id }}</span> -->
                                        <CourseInfo :courseName="value.data[day].name"
                                            :courseTeacher="value.data[day].teacher" :courseRoom="value.data[day].room"
                                            :id="value.data[day].id" @lClick="enableChange" />
                                    </td>
                                    <!-- <td></td> -->
                                </template>
                                <template v-else>
                                    <td v-if="hasMergeColAndRow(day, index)"></td>
                                    <!-- {{ value.data }} -->


                                </template>
                            </template>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.course-page {
    height: 100%;
    width: 100%;
    // background-color: pink;
    border-radius: 20px;
    // padding: 20px;
    // color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;

    // 添加课程
    .course-add {
        width: 80%;
        line-height: 60px;
        height: 60px;
    }

    // 课程表样式
    .time-table {
        width: 80%;
        // height: 100%;
        // margin: 20px 0;
        // background-color: blue;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // overflow: auto;

        table {
            width: 100%;
            height: 100%;
            margin: 0 auto;
            // max-height: 90%;
            // background-color: red;
            // border: 1px solid black;
            border-collapse: collapse;
            margin-bottom: 20px 0;

            // background-color: red;
            td {
                border: 1px solid black;
                color: black;
                width: 80px;
                min-width: 80px;
                max-width: 80px;
            }

            thead {
                td {
                    height: 40px;
                    width: 80px;
                    min-width: 80px;
                    max-width: 80px;
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