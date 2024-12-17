// 引入moment.js
import moment from "moment";

// Pinia
import { useSettingStore } from "@/stores/setting";
const setting = useSettingStore();

/* Convert Time to Minutes */
function time2minutes(time) {
  const hour =  time.split(":")[0];
  const minute =  time.split(":")[1];
  return Number(hour) * 60 + Number(minute);
}

/* Convert Minutes to Time */
function minutes2time(minute) {
    const hour = Math.floor(minute / 60);
    const minutes = minute % 60;
    return `${paddingZero(hour)}:${paddingZero(minutes)}`;
}

/* Padding Zero */
function paddingZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

/* Save JSON Data to File */
async function saveAsJson(jsonData, fileName) {
    return await window.electron.saveJsonToFile(JSON.stringify(jsonData), fileName);
}

/* Get Current Date */
function getCurrentDate() {
    const time = new Date();
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const date = time.getDate();
    return `${year}-${paddingZero(month)}-${paddingZero(date)}`;
}

/* Get Current WeekNum */
function getCurrentWeek() {
    const date = getCurrentDate();
    const weeksInfo = calculateWeekAndDate();
    for (const week of weeksInfo) {
        if(week.dates.includes(date)){
            return week.weekNum;
        }
    };
    return -1;
}

/* Corresponding WeekNum and Date*/
function calculateWeekAndDate(startDate = '', weekNum = '') {
    // get startDate and weekNum from settingStore
    startDate = JSON.parse(setting.getSettingForm).startDate;
    weekNum = JSON.parse(setting.getSettingForm).totalWeekNum;

    if(!startDate || !weekNum){
        ElMessage.error('没有开始日期和总周数信息');
        return;
    }

    const relation = []; // use array to store every week
    const start = moment(startDate).subtract(1, 'days');

    for (let i = 0; i < weekNum; i++){
        const week = {
            weekNum: i + 1,
            dates: []
        };

        for (let j = 0; j < 7; j++){
            const date = start.add(1, 'days').format('YYYY-MM-DD');
            week.dates.push(date);
        }

        relation.push(week);
    }
    
    return relation;
}

export {
    time2minutes,
    minutes2time,
    saveAsJson,
    getCurrentDate,
    getCurrentWeek,
    calculateWeekAndDate
}