import axios from "axios"
import { SERVER_URL } from "../../config"

const remove_message = async(keyId, message, accessToken) => {
    const res= await axios({
        url: SERVER_URL+ "/api/messages/remove/message/"+ keyId,
        method: "post", 
        headers: {
            "authorization": "Bearer "+ accessToken
        },
        data: {
            message
        }
    })
    const result= await res.data
    return result
}

export default remove_message
