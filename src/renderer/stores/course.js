import { ref, computed, getCurrentInstance } from 'vue';
import { defineStore } from 'pinia';
export const useCourseStore = defineStore('course', () => {

    const schedule = ref(null);
    
    const setSchedule = (newValue) => {
        schedule.value = newValue;
    }
    const getSchedule = computed(() => schedule.value)

    return {
        setSchedule,
        getSchedule
    }
})