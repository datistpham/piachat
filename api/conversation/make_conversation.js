import axios from "axios"
import { SERVER_URL } from "../../config"

const make_conversation= async (label, member, createdBy, imageGroup,setData, navigation, accessToken, type)=> {
    const res= await axios({
        url: `${SERVER_URL}/api/conversations`,
        method: "post",
        headers: {
            "authorization": "Bearer "+ accessToken
        },
         data: {
            label, member, createdBy, imageGroup, type
        }
    })
    const result= await res.data
    navigation("DetailConversation", {idConversation: result?._id})
    return setData(result)

}

export default make_conversation