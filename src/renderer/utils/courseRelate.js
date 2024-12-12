function time2minutes(time) {
  const hour =  time.split(":")[0];
  const minute =  time.split(":")[1];
  return Number(hour) * 60 + Number(minute);
}

function minutes2time(minute) {
    const hour = Math.floor(minute / 60);
    const minutes = minute % 60;
    return `${paddingZero(hour)}:${paddingZero(minutes)}`;
}

function paddingZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

async function saveAsJson(jsonData, fileName) {
    return await window.electron.saveJsonToFile(JSON.stringify(jsonData), fileName);
}

export {
    time2minutes,
    minutes2time,
    saveAsJson
}