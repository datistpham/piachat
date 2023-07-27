import axios from "axios"
import { SERVER_URL } from "../../config"

const get_list_conversation=async (idUser, accessToken)=> {
    const res= await axios({
        url: SERVER_URL +`/api/conversations/`+ idUser,
        method: "get",
        headers: {
            "authorization": "Bearer "+ accessToken
        }
    })
    const result= await res.data
    return result
}

export default get_list_conversation