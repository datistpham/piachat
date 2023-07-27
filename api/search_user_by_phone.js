import axios from "axios"
import { SERVER_URL } from "../config"

const search_user_by_phone= async (phoneNumber, accessToken)=> {
    let phoneNumberF= phoneNumber || ""
    const res= await axios({
        url: `${SERVER_URL}/api/users/phone/${phoneNumberF}`,
        headers: {
            "authorization": "Bearer "+ accessToken
        },
        method: "get"
    })
    const result= await res.data
    return result
}

export default search_user_by_phone