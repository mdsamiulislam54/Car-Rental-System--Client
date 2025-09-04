import axios from "axios"


export const totalCar = async ()=>{

    try {
        const res= await axios.get(" http://localhost:5000/admin/total/car")
        const data = res?.data;
       
        return data
    } catch (error) {
        console.error(error)
    }
}
export const totalUser = async ()=>{

    try {
        const res= await axios.get(" http://localhost:5000/admin/total/user")
        const data = res?.data;
        return data
    } catch (error) {
        console.error(error)
    }
}
export const totalBookinCar = async ()=>{

    try {
        const res= await axios.get(" http://localhost:5000/dashboard/total/booking/car")
        const data = res?.data;
        return data
    } catch (error) {
        console.error(error)
    }
}
export const getUserBookingCar = async (userId)=>{

    try {
        console.log('booking')
        const res= await axios.get(` http://localhost:5000/dashboard/user/booking/car?userId=${userId}`)
        const data = res?.data;
        console.log('user booking',data)
        return data
    } catch (error) {
        console.error(error)
    }
}
export const totalBookinCarPending = async ()=>{

    try {
        const res= await axios.get(" http://localhost:5000/dashboard/total/booking/car/pending")
        const data = res?.data;
        return data
    } catch (error) {
        console.error(error)
    }
}

