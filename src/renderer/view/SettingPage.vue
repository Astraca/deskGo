<script setup>
import { ref, defineOptions, onMounted, computed, watch, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia'
import { onBeforeRouteLeave } from 'vue-router';

// 组件导入
import InfoBox from '../components/InfoBox.vue';

import { ElMessage } from 'element-plus';
// Pinia
import { useSettingStore } from '@/stores/setting.js';
const settingStore = useSettingStore();
const settingForm = computed(() => settingStore.getSettingForm);
const settingFormOrigin = ref({ ...settingForm.value });

import { time2minutes, minutes2time } from '@/utils/courseRelate'
defineOptions({
    name: 'SettingPage'
});




// 天气设置
// 从Pinia中获取token
// const token = settingData.value.CaiYun_token;
// console.log('r',settingData.value.CaiYun_token);

const weatherMes = ref('<p>天气服务需要使用到<b>彩云天气API</b></p><p>请前往<a href="https://platform.caiyunapp.com/login" target="_blank">彩云科技开放平台</a>获取服务Token</p>');

// 课表设置
// const totalWeekNum = ref(null);
// const currentWeek = ref(null);
// const courseDuration = ref(null);
// const courseNum = ref(null);
// const startDate = ref(null);
const courseMes = ref('<p>请在此设置您本学期的<b>课表信息</b></p>');

// 提醒设置
const remindTarget = ref(null);
const remindMethod = ref('clock');
const remindMes = ref('<p>请在此设置课程开始<b>提醒时间</b>和<b>提醒方式</b>。</p>');

// 清除提醒的值(切换方式)
const clearRemindTarget = () => {
    remindTarget.value = null;
};

//自动补充邮箱后缀
const querySearchEmail = (queryString, callback) => {
    const emailList = [
        { value: '@qq.com' },
        { value: '@163.com' },
        { value: '@126.com' },
        { value: '@google.com' },
        { value: '@outlook.com' },
        { value: '@stu.nsu.edu.cn' },
        { value: '@mail.swust.edu.cn' }
    ]
    let results = [];
    let queryList = [];
    emailList.map((item) => {
        queryList.push({ value: queryString.split('@')[0] + item.value })
    });
    results = queryString ? queryList.filter(createFilter(queryString)) : queryList;
    callback(results);
};
// 邮箱填写过滤
const createFilter = (queryString) => {
    return (item) => {
        return item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    };
};

// 保存设置
const saveSettings = async () => {
    try {
        for (const key in settingForm.value) {
            if ((key === 'timeList' && settingForm.value[key].length <= 0) || !!!settingForm.value[key]) {
                ElMessage.error('存在未设置的项,请检查!');
                return;
            }
        }
        settingStore.setSettingForm(settingForm.value); // 更新 store 中的数据
        isChange.value = false;
        ElMessage.success("设置保存成功!");
    } catch (error) {
        ElMessage.error("保存设置失败!");
    }
};
// 保存设置
// const saveSetting = () => {
//     ElMessage({
//         'message': '保存设置ing...',
//         'type': 'success'
//     });
//     const obj = {
//         'CaiYun_token': token.value,
//         'totalWeekNum': totalWeekNum.value,
//         'currentWeek': currentWeek.value,
//         'courseDuration': courseDuration.value,
//         'courseNum': courseNum.value,
//         'startDate': startDate.value,
//         'remindMethod': remindMethod.value,
//         'remindTarget': remindTarget.value
//     }
//     console.log('obj', obj, JSON.stringify(obj));
//     window.electron.saveJsonToFile(obj, 'setting.json')
// };

// 课时设置Dialog
const showTimeDialog = ref(false);

// 课时设置表单默认值
const timeSettingForm = ref({
    duration: 45,
    minTime: '06:00',
    maxTime: '22:00',
    courseNum: '',
});

// 展示课时设置Dialog
const dialogShow = () => {
    if (!settingForm.value.courseNum) {
        ElMessage.error('请设置课程数!');
        return;
    } else {
        showTimeDialog.value = true;
        console.log('timeList', timeList.value);
    }
}

// 每节课时间列表
const timeList = ref([]);
onMounted(() => {
    if (settingForm.value.timeList.length > 0) {
        timeList.value = settingForm.value.timeList;
    }
})
// 监听课程节数变化，生成列表
watch(() => settingForm.value.courseNum, (newValue, oldValue) => {
    if (newValue > 20) {
        ElMessage.error('每天课程不能超过20节!');
        settingForm.value.courseNum = '';
        return;
    }
    setTimeout(() => {
        timeList.value = [];
        for (let i = 0; i < newValue; i++) {
            const obj = {
                courseId: i + 1,
                startTime: '',
                endTime: '',
            }
            timeList.value.push(obj);
        }
    }, 500)
});

// 课时开始时间变化后修改对应的结束时间
const startTimeConfirm = (item) => {
    item.endTime = minutes2time(time2minutes(item.startTime) + Number(settingForm.value.courseDuration));
};

// 保存timelist
const dialogConfirm = () => {
    for (const item of timeList.value) {
        if (item.startTime === '' || item.endTime === '') {
            ElMessage.error('请设置每节课的开始时间和结束时间!');
            return;
        }
    }
    settingForm.value.timeList = timeList.value;
    showTimeDialog.value = false;
};
const dialogCancel = () => {
    // timeList.value = [];
    showTimeDialog.value = false;
};
// 监听settingForm变化
const isChange = ref(false);
onMounted(() => {
    watch(settingForm.value, (newValue, oldValue) => {
        // console.log('检测到改变', newValue, oldValue);
        isChange.value = true;
    }, { deep: true });
});
onBeforeRouteLeave((to, from, next) => {
    if (isChange.value) {
        ElMessageBox.confirm('存在未保存的设置,确认离开吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                Object.assign(settingForm.value, settingFormOrigin.value);
                next();
            })
            .catch(() => {
                next(false);
            })
    } else {
        next();
    }
});

</script>

<template>
    <div class="container">
        <div class="form-box">
            <el-scrollbar>
                {{ settingForm.token }}
                <el-form>
                    <div class="part">
                        <h3>—————— 天气设置 ——————</h3>
                        <div class="info-box">
                            <InfoBox :infoMessage="weatherMes" color="#626AEF"></InfoBox>
                        </div>
                        <el-form-item label="彩云Token:" label-width="120px">
                            <el-input placeholder="请填入彩云天气Token" v-model="settingForm.token" clearable></el-input>
                        </el-form-item>
                    </div>

                    <div class="part">
                        <h3>—————— 课表设置 ——————</h3>
                        <InfoBox :infoMessage="courseMes" color="#626AEF"></InfoBox>
                        <el-form-item label="学期周数:" label-width="120px">
                            <el-input v-model.trim.number="settingForm.totalWeekNum" placeholder="请输入学期总周数">
                                <template #append>周</template>
                            </el-input>
                        </el-form-item>

                        <!-- <el-form-item label="当前周数:" label-width="120px">
                            <el-input v-model.trim.number="settingForm.currentWeek" placeholder="请输入当前周数">
                                <template #append>周</template>
                            </el-input>
                        </el-form-item> -->

                        <el-form-item label="课程节数:" label-width="120px">
                            <el-input v-model.trim.number="settingForm.courseNum" placeholder="请输入每天课程节数">
                                <template #append>节</template>
                            </el-input>
                        </el-form-item>

                        <!-- <el-form-item label="上课时长:" label-width="120px">
                            <el-input v-model.trim.number="settingForm.courseDuration" placeholder="请输课程时长">
                                <template #append>分钟</template>
                            </el-input>
                        </el-form-item> -->

                        <!-- <el-form-item label="开始时间:" label-width="120px">
                            <el-time-select v-model="settingForm.startTime" style="width: 100%" start="07:00"
                                step="00:5" end="18:00" placeholder="每天最早课程开始时间" />
                        </el-form-item> -->

                        <el-form-item label="开始日期:" label-width="120px">
                            <div style="width: 100%">
                                <el-date-picker v-model="settingForm.startDate" type="date" placeholder="学期第一周的第一天"
                                    style="width:100%" />
                            </div>
                        </el-form-item>
                        <!-- <el-form-item label="课时设置:" label-width="120px"> -->
                        <div style="width: 100%">
                            <div style="text-align: right; padding: 0 20px;">
                                <el-text type="primary" size="small"><el-icon :size="20">
                                        <Watermelon />
                                    </el-icon> 猜猜里面是什么?</el-text>
                            </div>
                            <div style="text-align: right; padding: 5px 20px;">
                                <el-button round plain type="primary" @click="dialogShow">课时设置</el-button>
                            </div>
                        </div>
                        <!-- </el-form-item> -->

                    </div>

                    <!-- El-dialog -->
                    <el-dialog v-model="showTimeDialog" :show-close="false" title="课时设置" width="600px" center
                        :close-on-click-modal="false">
                        <el-form :model="timeSettingForm">
                            <el-row :gutter="20">
                                <!-- <el-col :span=12>
                                    <el-form-item label="课程节数:">
                                        <el-input v-model.trim.number="timeSettingForm.courseNum"
                                            placeholder="请输入每天课程节数">
                                            <template #append>节</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col> -->
                                <el-col :span="24">
                                    <el-form-item label="上课时长:" label-width="100px">
                                        <el-input v-model.trim.number="timeSettingForm.duration"
                                            placeholder="请输入每天课程时长">
                                            <template #append>分钟</template>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span=24>
                                    <el-form-item label="最早(晚)时间:" label-width="100px">
                                        <el-time-select v-model="timeSettingForm.minTime" placeholder="最早课程开始时间"
                                            style="width: 45%;" start="00:00" step="00:05" end="23:59" />
                                        <span
                                            style="display: inline-block; width: 10%; text-align: center;">&nbsp;&nbsp;至&nbsp;&nbsp;</span>
                                        <el-time-select v-model="timeSettingForm.maxTime" placeholder="最晚课程结束时间"
                                            style="width: 45%;" start="00:00" step="00:05" end="23:59" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-divider>😎 😎 😎 😎 😎</el-divider>
                            <el-scrollbar height="200px">
                                <el-form-item :label="`第${item.courseId}节:`" label-width="100px" label-position=""
                                    v-for="item in timeList">
                                    <el-time-select v-model="item.startTime" :placeholder="`第${item.courseId}节开始时间`"
                                        style="width: 45%;" :start="timeSettingForm.minTime" step="00:05"
                                        :end="timeSettingForm.maxTime" @change="startTimeConfirm(item)" />
                                    <span
                                        style="display: inline-block; width: 10%; text-align: center">&nbsp;&nbsp;至&nbsp;&nbsp;</span>
                                    <el-time-select v-model="item.endTime" :placeholder="`第${item.courseId}节结束时间`"
                                        style="width: 45%;" :start="timeSettingForm.minTime" step="00:05"
                                        :end="timeSettingForm.maxTime" :min-time="item.startTime" />
                                </el-form-item>
                            </el-scrollbar>

                        </el-form>
                        <div style="text-align: right; padding: 0 20px;">
                            <el-text type="danger" size="small"><el-icon :size="18">
                                    <Bell />
                                </el-icon> 别忘记保存哦~~</el-text>
                        </div>
                        <template #footer>
                            <el-button round type="primary" color="#626AEF" @click="dialogConfirm">确认</el-button>
                            <el-button round plain type="primary" color="#626AEF" @click="dialogCancel">取消</el-button>
                        </template>
                    </el-dialog>
                    <div class="part">
                        <h3>—————— 提醒设置 ——————</h3>
                        <InfoBox :infoMessage="remindMes" color="#626AEF"></InfoBox>
                        <el-form-item label="提醒方式:" label-width="120px">
                            <el-radio-group v-model="settingForm.remindMethod" size="large" fill="#626AEF"
                                text-color="#ffffff">
                                <el-radio-button label="闹钟" @click="clearRemindTarget" value="clock" />
                                <el-radio-button label="邮件" @click="clearRemindTarget" value="mail" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="remindMethod == 'clock'" label="提醒时间:" label-width="120px">
                            <el-radio-group v-model="settingForm.remindTarget" size="large" fill="#626AEF"
                                text-color="#ffffff">
                                <el-radio-button class="radio-button" :label="item * 5 + '分钟'" :value="item * 5"
                                    v-for="item in 6" :key="item" />
                                <!-- <el-radio-button label="10分钟" value="mail" /> -->
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="remindMethod == 'mail'" label="邮箱地址:" label-width="120px">
                            <!-- <el-input v-model="courseNum" placeholder="请输入您的电子邮箱地址" /> -->
                            <el-autocomplete v-model="settingForm.remindTarget" clearable :debounce="400"
                                :fetch-suggestions="querySearchEmail" :trigger-on-focus="true" placeholder="请输入您的电子邮箱地址"
                                style="width: 100%">
                            </el-autocomplete>
                        </el-form-item>
                    </div>
                    <!-- <div class="part">

                        <h3>—————— 测试 ——————</h3>
                        <el-button color="#626AEF" @click="saveSetting">
                            测试按钮
                        </el-button>
                    </div> -->
                </el-form>
                <div class="confirm-button">
                    <el-button round size="large" color="#626AEF" @click="saveSettings">保存设置</el-button>
                </div>
            </el-scrollbar>

        </div>
    </div>
</template>

<style lang="scss" scoped>
@media screen {}

.container {
    height: 100%;
    width: 100%;
    // background-color: #f6f6f723;
    border-radius: 20px;
    // padding: 20px;
    color: white;
    text-align: center;

    .form-box {
        box-sizing: border-box;
        width: 80%;
        height: 100%;
        margin: 0px auto;

        // padding: 20px 0;
        // background-color: #E6F6F7;
        h3 {
            margin: 0;
            margin-bottom: 20px;
            text-align: left;
            color: #4d4f52;
            text-align: center;
        }

        .part {
            // background-color: #ffffff80;
            background-color: #f3f0f0e0;
            // filter: blur(3px);
            // padding: 50px 0;
            margin: 30px 0;
            padding: 30px;
            border-radius: 15px;
            cursor: pointer;
        }
    }
}
</style>