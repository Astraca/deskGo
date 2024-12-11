import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSettingStore = defineStore("setting", () => {
  const settingData = ref(null);

  // 获取本地保存的数据
  const loadData = async () => {
    try {
      const data = await window.electron.loadJsonFromFile("setting.json");
      
      if (data === -1) {
        settingForm.value = {};
        return 0;
      } else {
        settingForm.value = data;
        return 1;
      }
    } catch (err) {
      console.error("Error loading setting data", err);
      return -1;
    }
  };
  const saveData = async (data) => {
    try {
      const res = await window.electron.saveJsonToFile(data, "setting.json");      
      if (!res) {
        console.error("Error saving setting data");
      } else {
        settingData.value = res;
      }
    } catch (err) {
      console.error("Error saving setting data", err);
    }
  };

  //   // 彩云天气Token
  //   const CaiYun_token = ref("12a3");
  //   const get_CaiYun_token = computed(() => CaiYun_token.value);
  //   const set_CaiYun_token = (token) => {
  //     if (token) {
  //       CaiYun_token.value = token;
  //       return;
  //     }
  //     alert("Token为空");
  //   };
  const settingForm = ref({
    token: '',
    totalWeekNum: null,
    currentWeekNum: null,
    courseDuration: null,
    courseNum: null,
    startTime: null,
    startDate: null,
    remindMethod: "clock",
    remindTarget: 30,
  });
  const getSettingForm = computed(() => {
    return settingForm.value;
  });
  const setSettingForm = async (newValue) => {
    console.log("newValue is: ", newValue);
    settingForm.value = newValue;
    console.log("settingForm.value: ", settingForm.value);
    const res =await saveData(JSON.stringify(settingForm.value));
    console.log('文件保存', res);
    
  };
  return {
    settingData,
    loadData,
    saveData,
    getSettingForm,
    setSettingForm,
  };
});
