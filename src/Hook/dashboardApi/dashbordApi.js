import axios from "axios"

export const totalCar = async ()=>{

    try {
        const res= await axios.get("http://localhost:5000/admin/total/car")
        const data = res?.data;
        return data
    } catch (error) {
        console.error(error)
    }
}
export const totalUser = async ()=>{

    try {
        const res= await axios.get("http://localhost:5000/admin/total/user")
        const data = res?.data;
        return data
    } catch (error) {
        console.error(error)
    }
}

