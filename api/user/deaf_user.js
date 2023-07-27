import axios from "axios"
import { SERVER_URL } from "../../config"

const deaf_user= async (deaf, idUser, accessToken)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/users/deaf",
        method: "post",
        headers: {
            "authorization": "Bearer "+ accessToken
        },
        data: {
            deaf,
            id_user: idUser
        }
    })
    const result= await res.data
    return result
}

export default deaf_user