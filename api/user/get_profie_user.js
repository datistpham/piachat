import axios from "axios";
import { SERVER_URL } from "../../config";

const get_profile_user = async (meId, accessToken) => {
  const res = await axios({
    url: `${SERVER_URL}/api/users/${meId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "get",
    params: {
      id: meId,
    },
  });
  const result = await res.data;

  return result;
};

export default get_profile_user;
