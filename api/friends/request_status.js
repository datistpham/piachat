import axios from "axios"
import { SERVER_URL } from "../../config"

const get_friend_status= async (idUser, idMe, accessToken)=> {
    const res= await axios({
        url: `${SERVER_URL}/api/users/request/status/`+ idUser,
        method: "get",
        params: {
            userId: idMe
        },
        headers: {
            "authorization": "Bearer "+ accessToken
        }
    })
    const result= await res.data
    return result
}

export default get_friend_status