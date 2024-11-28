<script setup>
import { ref, defineOptions, onMounted } from 'vue';

// 组件导入
import InfoBox from '../components/InfoBox.vue';

// Pinia
import { useSettingStore } from '../stores/setting.js';
const settingStore = useSettingStore();
const { get_CaiYun_token, set_CaiYun_token } = settingStore;

defineOptions({
    name: 'SettingPage'
});


const hello = ref('课表设置');

// 天气设置
const token = ref(null);
onMounted(() => {
    // 从Pinia中获取token
    const res = settingStore.get_CaiYun_token;
});
const weatherMes = ref('<p>天气服务需要使用到<b>彩云天气API</b></p><p>请前往<a href="https://platform.caiyunapp.com/login" target="_blank">彩云科技开放平台</a>获取服务Token</p>');


// 课表设置
const totalWeekNum = ref(null);
const currentWeek = ref(null);
const courseDuration = ref(null);
const courseNum = ref(null);
const startDate = ref(null);
const courseMes = ref('<p>请在此设置您本学期的课程信息</p>');

// 提醒设置
const remindTarget = ref(null);
const remindMethod = ref('clock');
const remindMes = ref('<p>请在此设置课程开始<b>提醒时间</b>和<b>提醒方式</b>。</p>');
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
// 清除提醒的值(切换方式)
const clearRemindTarget = () => {
    remindTarget.value = null;
};

// 保存设置
const saveSetting = () => {
    ElMessage({
        'message': '保存设置ing...',
        'type': 'success'
    });
};
</script>

<template>
    <div class="container">
        <div class="form-box">
            <el-scrollbar>

                <el-form>
                    <div class="part">
                        <h3>—————— 天气设置 ——————</h3>
                        <div class="info-box">
                            <InfoBox :infoMessage="weatherMes" color="#626AEF"></InfoBox>
                        </div>
                        <el-form-item label="彩云Token:" label-width="120px">
                            <el-input placeholder="请填入彩云天气Token" v-model="token" clearable></el-input>
                        </el-form-item>
                    </div>
                    <div class="part">
                        <h3>—————— 课表设置 ——————</h3>
                        <InfoBox :infoMessage="courseMes" color="#626AEF"></InfoBox>
                        <el-form-item label="学期周数:" label-width="120px">
                            <el-input v-model="totalWeekNum" placeholder="请输入学期总周数" >
                                <template #append>周</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="当前周数:" label-width="120px">
                            <el-input v-model="currentWeek" placeholder="请输入当前周数" >
                                <template #append>周</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="课程节数:" label-width="120px">
                            <el-input v-model="courseNum" placeholder="请输入每天课程节数" >
                                <template #append>节</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="上课时长:" label-width="120px">
                            <el-input v-model="courseDuration" placeholder="请输课程时长" >
                                <template #append>分钟</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="开始日期:" label-width="120px">
                            <div style="width: 100%">
                                <el-date-picker v-model="startDate" type="date" placeholder="学期第一周的第一天"
                                    style="width:100%" />
                            </div>
                        </el-form-item>

                    </div>
                    <div class="part">
                        <h3>—————— 提醒设置 ——————</h3>
                        <InfoBox :infoMessage="remindMes" color="#626AEF"></InfoBox>
                        <el-form-item label="提醒方式:" label-width="120px">
                            <el-radio-group v-model="remindMethod" size="large" fill="#626AEF" text-color="#ffffff">
                                <el-radio-button label="闹钟" @click="clearRemindTarget" value="clock" />
                                <el-radio-button label="邮件" @click="clearRemindTarget" value="mail" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="remindMethod == 'clock'" label="提醒时间:" label-width="120px">
                            <el-radio-group v-model="remindTarget" size="large" fill="#626AEF" text-color="#ffffff">
                                <el-radio-button class="radio-button" :label="item * 5 + '分钟'" :value="item * 5"
                                    v-for="item in 6" :key="item" />
                                <!-- <el-radio-button label="10分钟" value="mail" /> -->
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="remindMethod == 'mail'" label="邮箱地址:" label-width="120px">
                            <!-- <el-input v-model="courseNum" placeholder="请输入您的电子邮箱地址" /> -->
                            <el-autocomplete v-model="remindTarget" clearable :debounce="400"
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
                    <el-button round size="large" color="#626AEF" @click="saveSetting">保存设置</el-button>
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
        width: 60%;
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