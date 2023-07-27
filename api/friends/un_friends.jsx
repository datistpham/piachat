import axios from "axios"
import { SERVER_URL } from "../../config"

const unfriend= async (friendId, setData, idUser, accessToken)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/users/unfriend/"+ friendId,
        method: "post",
        data: {
            userId: idUser
        },
        headers: {
            "authorization": "Bearer "+ accessToken
        }
    })
    const result= await res.data
    return setData(result)
}

export default unfriend