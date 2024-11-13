<script setup>
import { ref, defineOptions, computed } from 'vue'

defineOptions({
    name: 'InfoBox'
})
const props = defineProps({
    infoMessage: {
        type: String,
        required: true,
        default: '提示组件'
    },
    color: {
        type: String,
        required: true,
        default: '#000'
    }
})
const fontColor = computed(() => ({
    color: props.color,
    '--border-color': props.color
}))
</script>

<template>
    <div class="InfoBox" :style="fontColor">
        <div class="icon-box">
            <div>
                <i class="iconfont icon-tishi" style="display:block;width: 100%;"></i>
                <span style="display: block;width: 100%;">Tips</span>
            </div>
        </div>
        <div class="text-box">
            <p v-html="infoMessage">
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.InfoBox {
    width: 100%;
    height: 100%;
    margin: 10px auto;
    box-sizing: border-box;
    display: flex;
    border-radius: 10px;
    background: #dddddd7c;
    box-shadow: 2px 2px 10px #d4d1d0 -10px -10px 30px #ffffff;

    .icon-box {
        width: 20%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        // color: #626AEF;
        padding: 10px 0;
        div {
            width: 100%;
        }

        i {
            font-size: 40px !important;
            vertical-align: baseline;
            font-weight: 650;
        }
    }

    .text-box {
        width: 80%;
        text-align: left;
        text-indent: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 10px 0;

        p {
            width: 100%;
            margin: 0;
            word-wrap: break-word;
            // color: #626AEF;
            padding: 0px 10px;
            box-sizing: border-box;
        }
    }

    .text-box::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        height: 100%;
        /* 完整高度 */
        border-left: 2px solid var(--border-color);
        /* 边框样式 */
        transform: translateY(-75%);
        /* 垂直居中 */
        clip-path: inset(50% 0 0 0);
        /* 只显示下半部分 */
    }
    a {
        color: red!important;
    }
}
</style>