import axios from "axios"
import { SERVER_URL } from "../../config"

const send_request_make_friend_by_me = async (id, accessToken, idUser) => {
  const res= await axios({
    url: `${SERVER_URL}/api/users/request-add-friend/${id}`,
    method: "post",
    headers: {
        "authorization": "Bearer "+ accessToken
    },
    data: {
      userId: idUser
    }
  })
  const result= await res.data
  return (result)
}

export default send_request_make_friend_by_me