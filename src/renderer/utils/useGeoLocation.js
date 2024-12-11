import { ref } from "vue";

export default function useGeoLocation() {
    const location = ref(null)
    const error = ref(null)

    const getLocation = () => {
        console.log('调用了');
        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    location.value = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                },
                (err) => {
                    error.value = err.message
                    console.error("Error getting location:", err)
                }
            )
        }else{
            error.value = "您的浏览器不支持地理定位。"
        }
    }

    return {
        location, error, getLocation
    }
}
