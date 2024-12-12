import { ref, computed, getCurrentInstance } from 'vue';
import { defineStore } from 'pinia';
export const useCourseStore = defineStore('course', () => {

    const schedule = ref([]);
    
    const setSchedule = (newValue) => {
        const courseId = newValue.id;
        if(schedule.value === null) schedule.value = {};
        schedule.value.push(newValue);
    }
    const getSchedule = computed(() => {        
        return schedule.value
    })

    return {
        setSchedule,
        getSchedule
    }
})