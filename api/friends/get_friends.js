import axios from "axios"
import { SERVER_URL } from "../../config"

const get_list_friends= async (idUser, accessToken, setData)=> {
    try {
        const res= await axios({
            url: `${SERVER_URL}/api/users/friends/${idUser}`,
            method: "get",
            headers: {
                "authorization": "Bearer "+ accessToken
            }
        })
        const result= await res.data
        return setData(result)
        
    } catch (error) {
        setData(error)
    }
}

export default get_list_friends