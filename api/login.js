import axios from "axios"
// import { err } from "react-native-svg/lib/typescript/xml"
import { SERVER_URL } from "../config"

const login= async (phoneNumber, password, setData, setAuth)=> {
    try {
        const res= await axios({
            url: SERVER_URL+ "/user/login",
            method: "post",
            data: {
                phoneNumber, password
            }
        })
        const result= await res.data
        if(parseInt(res.status) === 200 && result?.login === true) {
            setAuth(()=> true)
            setData(result)
            return result
        }
        else {
            setData(result)
            return result
        }
        
    } catch (error) {
        setData(error)
        return error
    }
}

export default login