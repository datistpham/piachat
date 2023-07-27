import axios from "axios"
import { SERVER_URL } from "../../config/config"

const unblock_user= async (data)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/admin/user/u/b",
        method: "post",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default unblock_user