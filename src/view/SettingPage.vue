<script setup>
import { ref, defineOptions, onMounted } from 'vue'
import { useSettingStore } from '../stores/setting.js'
const settingStore = useSettingStore()
const { get_CaiYun_token, set_CaiYun_token } = settingStore
defineOptions({
    name: 'WeatherPage'
})

// const 

const hello = ref('课表设置')

// 天气设置
const token = ref(null)
onMounted(() => {
    const res = settingStore.get_CaiYun_token
})

// 提醒设置
const remindTime = ref(null)
const remindMethod = ref(null)

// 课表设置
const totalWeekNum = ref(null)
const currentWeek = ref(null)
const courseDuration = ref(null)
const courseNum = ref(null)
const startDate = ref(null)
</script>

<template>
    <div class="container">
        <div class="form-box">
            <el-scrollbar>

                <el-form>
                    <div class="part">
                        <h3>—————— 天气设置 ——————</h3>
                        <el-form-item label="彩云Token:" label-width="120px">
                            <el-input placeholder="请填入彩云天气Token"  v-model="token" clearable show-password></el-input>
                        </el-form-item>
                    </div>
                    <div class="part">
                        <h3>—————— 课表设置 ——————</h3>
                        <el-form-item label="学期周数:" label-width="120px">
                            <el-input v-model="totalWeekNum"  placeholder="请输入学期总周数" />
                        </el-form-item>

                        <el-form-item label="当前周数:" label-width="120px">
                            <el-input v-model="currentWeek"  placeholder="请输入当前周数" />
                        </el-form-item>

                        <el-form-item label="上课时长:" label-width="120px">
                            <el-input v-model="courseDuration"  placeholder="请输课程时长" />
                        </el-form-item>

                        <el-form-item label="课程节数:" label-width="120px">
                            <el-input v-model="courseNum"  placeholder="请输入每天课程节数" />
                        </el-form-item>

                        <el-form-item label="开始日期:" label-width="120px">
                            <div style="width: 100%">
                                <el-date-picker v-model="startDate" type="date" placeholder="学期第一周的第一天" :size="large" style="width:100%" />
                            </div>
                        </el-form-item>

                    </div>
                    <div class="part">
                        <h3>—————— 提醒设置 ——————</h3>
                        <el-form-item label="提醒时间:" label-width="120px">
                            <el-radio-group v-model="remindTime" size="large" fill="#626AEF" text-color="#ffffff">
                                <el-radio-button class="radio-button" :label="item * 5 + '分钟'" :value="item"
                                    v-for="item in 6" :key="item" />
                                <!-- <el-radio-button label="10分钟" value="mail" /> -->
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="提醒方式:" label-width="120px">
                            <el-radio-group v-model="remindMethod" size="large" fill="#626AEF" text-color="#ffffff">
                                <el-radio-button label="闹钟" value="clock" />
                                <el-radio-button label="邮件" value="mail" />
                            </el-radio-group>
                        </el-form-item>
                        <!-- <el-form-item label="Label:" label-width="120px"></el-form-item> -->
                        <!-- <el-form-item label="Label:" label-width="120px"></el-form-item> -->
                    </div>
                    <div class="part">

                        <h3>—————— 测试 ——————</h3>
                        <el-button color="#626AEF" @click="getGeoLocation">
                            测试按钮
                        </el-button>
                    </div>
                </el-form>
            </el-scrollbar>

        </div>
    </div>
</template>

<style lang="scss" scoped>
@media screen {}

.container {
    height: 100%;
    width: 100%;
    background-color: #f6f6f723;
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
            background-color: #ffffff80;
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