import axios from "axios"
import { SERVER_URL } from "../config"

const user_profile= async (idUser, accessToken, setData)=> {
    try {
        const res= await axios({
            url: SERVER_URL+ "/api/users/profile/"+ idUser,
            method: "get",
            headers: {  
                "authorization": "Bearer "+ accessToken
            }
        })
        const result= await res.data
        return setData(result)
        
    } catch (error) {
        return setData(error)
    }
}

export default user_profile