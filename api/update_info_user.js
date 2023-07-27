import axios from "axios";
import { SERVER_URL } from "../config";
import upload_image from "./upload_image";
// import validUrl from "valid-url";

const update_info_user = async (
  id,
  newUsername,
  newProfilePicture,
  newGender,
  changeAvatar,
  newCoverPhoto,
  changeCoverPhoto,
  newAddress,
  accessToken
) => {

  let finalAvatar= newProfilePicture
  let finalCover= newCoverPhoto;
  if(changeAvatar=== true) {
    const urlAvatar = await upload_image(newProfilePicture);
    finalAvatar= urlAvatar
  }
  if(changeCoverPhoto=== true ){
    const urlCover = await upload_image(newCoverPhoto);
    finalCover= urlCover

  }
  const res = await axios({
    url: `${SERVER_URL}/api/users/edit-infor/${id}`,
    method: "post",
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
    data: {
      newUsername: newUsername,
      newProfilePicture: finalAvatar,
      newGender,
      newCoverPhoto: finalCover,
      newAddress
    },
  });
  const result = await res.data;
  // console.log(result)
  return result
};

export default update_info_user;
