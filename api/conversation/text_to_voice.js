import axios from "axios"
import { SERVER_URL } from "../../config"

const text_to_voice= async (text, accessToken)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/conversations/send/text-to-voice",
        method: "post",
        data: {
            text
        },
        headers: {
            "authorization": "Bearer "+ accessToken
        }
    })
    const result= await res.data
    return result?.voice
}

export default text_to_voice