import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGlobalStore = defineStore('global', () => {
    // 默认激活状态id
    const currentPage = ref('1')
    const getActive = computed(() => currentPage.value)
    const setActive = (newValue) => {
        currentPage.value = newValue
    }
    // 默认标题(与id对应)
    const currentNav = ref('我的课表')
    const getNavInfo = computed(() => currentNav.value)
    const setNavInfo = (newNav) => {
        currentNav.value = newNav
    }
    return {
        getActive,
        setActive,
        getNavInfo,
        setNavInfo
    }
})