import axios from "axios"
import { SERVER_URL } from "../config"

const signup= async (username, phoneNumber, password, email)=> {
    const res= await axios({
        url: `${SERVER_URL}/user/register`,
        method: "post",
        data: {
            username, phoneNumber, password, email
        }

    })
    const result= await res.data
    return result
}

export default signup