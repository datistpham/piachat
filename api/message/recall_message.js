import axios from "axios"
import { SERVER_URL } from "../../config"

const recall_message = async(keyId, message, accessToken) => {
    const res= await axios({
        url: SERVER_URL+ "/api/messages/recall/message/"+ keyId,
        method: "post", 
        headers: {
            "authorization": "Bearer "+ accessToken
        },
        data: {
            message
        }
    })
    const result= await res.data
    return console.log(result)
}

export default recall_message
