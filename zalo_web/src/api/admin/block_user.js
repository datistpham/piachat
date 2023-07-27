import axios from "axios"
import { SERVER_URL } from "../../config/config"

const block_user= async (data)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/admin/user/b",
        method: "post",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default block_user