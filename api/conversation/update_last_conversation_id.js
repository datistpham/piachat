import axios from "axios"
import { SERVER_URL } from "../../config"

const update_last_conversation_id = async (idConversation, accessToken, idUser) => {
    const res= await axios({
        url: SERVER_URL+ "/api/users/update/last/conversation/"+ idUser,
        data: {
            idConversation
        },
        method: "post",
        headers: {
            "authorization": "Bearer "+ accessToken
        }
    })
    const result= await res.data
    return result
}

export default update_last_conversation_id