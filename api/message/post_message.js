import axios from "axios"
import { SERVER_URL } from "../../config"

const post_message= async (sender, conversation, key, message, roomId, type_message, name_file, accessToken)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/messages",
        method: "post",
        data: {
            sender, conversation, key, message, roomId, type_message, name_file
        },
        headers: {
            "authorization": "Bearer "+ accessToken
        }
    })
    const result= await res.data
    return (result)

}

export default post_message