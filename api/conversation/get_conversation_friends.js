import axios from "axios"
import { SERVER_URL } from "../../config"

const get_conversation_friends = async (friendId, setData, accessToken, idUser) => {
    const res= await axios({
        url: SERVER_URL+ "/api/conversations/friend/"+ friendId,
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

export default get_conversation_friends
