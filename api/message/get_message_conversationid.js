import axios from "axios"
import { SERVER_URL } from "../../config"

const get_message_conversationid = async (conversationId, setData, accessToken, query) => {
    try {
        
        const res= await axios({
            url: SERVER_URL+ "/api/messages/"+ conversationId,
            method: "get",
            headers: {
                "authorization": "Bearer "+ accessToken
            },
            params: {
                ...query
            }
        })
    
        const result= await res.data
        return setData(result.data)
    } catch (error) {
        return setData(error)
    }
}

export default get_message_conversationid
