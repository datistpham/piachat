import axios from "axios"
import { SERVER_URL } from "../../config"

const get_files_conversation= async (conversationId, accessToken)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/conversations/get-files/" + conversationId,
        method: "get",
        headers: {
            "authorization": "Bearer "+ accessToken
        }
    })
    const result= await res.data
    return result
}

export default get_files_conversation