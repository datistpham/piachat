import axios from "axios"
import { SERVER_URL } from "../config"

const upload_image= async(formData)=> {
    const res= await axios({
        url: SERVER_URL+ "/api/upload",
        method: "post",
        data: formData,
        headers: {
            "content-type": "multipart/form-data"
        }
    })
    const result= await res.data
    return result
}

export default upload_image