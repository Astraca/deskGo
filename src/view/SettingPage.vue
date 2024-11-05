<script setup>
import { ref, defineOptions, onMounted } from 'vue'
import { useSettingStore } from '../stores/setting.js'
const settingStore = useSettingStore()
const {get_CaiYun_token, set_CaiYun_token} = settingStore
defineOptions({
    name: 'WeatherPage'
})

// const 

const hello = ref('课表设置')
const token = ref(null)

onMounted(() => {
    const res = settingStore.get_CaiYun_token
})

</script>

<template>
    <div class="container">
        <div class="form-box">
            <el-form>
                <h3>—————— 天气设置 ——————</h3>
                <el-form-item label="彩云Token:" label-width="120px">
                    <el-input placeholder="请填入彩云天气Token" v-model="token"></el-input>
                </el-form-item>
                <!-- <el-form-item label="地区选择:" label-width="120px">
                    <el-select></el-select>
                </el-form-item> -->

                <h3>—————— 课表设置 ——————</h3>
                <el-form-item label="学期开始日期:" label-width="120px"></el-form-item>
                <el-form-item label="单堂课程时间:" label-width="120px"></el-form-item>
                <el-form-item label="Label:" label-width="120px"></el-form-item>
                <el-form-item label="Label:" label-width="120px"></el-form-item>

                <h3>—————— 提醒设置 ——————</h3>
                <el-form-item label="提醒时间:" label-width="120px"></el-form-item>
                <el-form-item label="提醒方式:" label-width="120px"></el-form-item>
                <el-form-item label="Label:" label-width="120px"></el-form-item>
                <!-- <el-form-item label="Label:" label-width="120px"></el-form-item> -->
                
                <h3>—————— 测试 ——————</h3>
                <el-button 
                    @click="getGeoLocation">
                    测试按钮
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@media screen  {
    
}
.container {
    height: 100%;
    width: 100%;
    background-color: #f6f6f752;
    border-radius: 20px;
    // padding: 20px;
    color: white;
    text-align: center;

    .form-box {
        width: 60%;
        margin: 0 auto;

        h3 {
            text-align: left;
            color: #4d4f52;
        }
    }
}
</style>