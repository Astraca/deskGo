import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSettingStore = defineStore('setting', () => {
    // 彩云天气Token
    const CaiYun_token = ref('12a3')
    const get_CaiYun_token = computed(() => CaiYun_token.value)
    const set_CaiYun_token = (token) => {
        if(token){
            CaiYun_token.value = token
            return
        }
        alert('Token为空')
    }

    return {
        get_CaiYun_token,
        set_CaiYun_token
    }
})