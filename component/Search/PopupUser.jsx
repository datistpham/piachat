import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import React, { useEffect, useState } from 'react'
import { View, Text, Button, Image, TextInput} from 'react-native'
import get_friend_status from '../../api/friends/request_status';
import send_request_make_friend_by_me from '../../api/friends/send_request_friend';

const PopupUser = (props) => {
  const [statusUser, setStatusUser]= useState()
  const [toggleMakeFriend, setToggleMakeFriend] = useState(false);
  const [messageAddFriend, setMessageAddFriend]= useState("")
  useEffect(()=> {
    (async ()=> {
        if(props?.dataUser) {
            const result= await get_friend_status(props?.dataUser?._id, props?.data?.user?._id, props?.data?.accessToken)
            console.log(result)
            return setStatusUser(result)
        }
    })()
  }, [props?.dataUser, props?.data])
  return (
    <PopupDialog
        width={0.8}
        visible={props?.isExistUser}
        onTouchOutside={() => props?.setIsExistUser(false)}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
      >
        <View style={{padding: 5}}>
          <View style={{width: "100%"}}>
            <Image style={{width: "100%", aspectRatio: 5 / 2}} source={{uri: props?.dataUser?.coverPicture || "https://cover-talk.zadn.vn/default"}} />
          </View>
          <View style={{width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: 'center'}}>
            <View style={{position: "relative", top: -60}}>
              <Image style={{width: 120, height: 120, borderRadius: 60, marginBottom: 12}} source={{uri: props?.dataUser?.profilePicture || "https://cover-talk.zadn.vn/default"}} />
              <Text style={{fontSize: 18, textAlign: 'center'}}>{props?.dataUser?.username}</Text>
            </View>
          </View>
          <Text style={{marginBottom: 12, fontSize: 18, fontWeight: "600"}}>
              Thông tin cá nhân
            </Text>
            <Text style={{marginBottom: 12, fontSize: 18}}>Điện thoại: {props?.dataUser?.phoneNumber}</Text>
            <Text style={{marginBottom: 24, fontSize: 18}}>Giới tính: {props?.dataUser?.gender=== true ? "Nam" : "Nữ"}</Text>
          <View style={{display: "flex", flexDirection: "row-reverse", alignItems: "center", marginTop: 12}}>
            {
              props?.dataUser?._id !== props?.data?.user?._id && 
              <>
                {
                    toggleMakeFriend === false && statusUser?.duplicate=== false && statusUser?.request=== false &&
                    <>
                        <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 12, marginRight: 12}}>
                            <Button color={"#555"} title={"Đóng"} onPress={()=> {
                                props?.setIsExistUser(false)
                            }} />
                        </View>
                        <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 12, marginRight: 12}}>
                            <Button title={"Thêm bạn bè"} onPress={()=> {
                                setToggleMakeFriend(()=> true)
                            }} />
                        </View>
                       
                    </>
                    
                }
                {
                    toggleMakeFriend=== true && <View style={{width: "100%"}}>
                        <View style={{marginBottom: 12}}>
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                value={messageAddFriend}
                                onChangeText={setMessageAddFriend}
                                style={{width: "100%", height: 100, backgroundColor: "#e7e7e7"}}
                             />
                        </View>
                        <View style={{display: "flex", alignItems: "center", flexDirection: "row-reverse"}}>
                            <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 12, marginRight: 12}}>
                                <Button color={"#555"} title={"Hủy"} onPress={()=> {
                                    setToggleMakeFriend(()=> false)
                                }} />
                            </View>
                            <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 12, marginRight: 12}}>
                                <Button title={"Kết bạn"} onPress={async()=> {
                                    setStatusUser({
                                        request: true,
                                        duplicate: true,
                                    });
                                    const result= await send_request_make_friend_by_me(props?.dataUser?._id,props?.data?.accessToken,   props?.data?.user?._id)
                                    console.log(result)
                                    setToggleMakeFriend(()=> false)
                                }} />
                            </View>
                        </View>
                    </View>
                }
                {
                    statusUser?.duplicate=== true && statusUser?.request=== true && <>
                        <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 12, marginRight: 12}}>
                            <Button color={"#555"} title={"Đóng"} onPress={()=> {
                                props?.setIsExistUser(false)
                            }} />
                        </View>
                        <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 12, marginRight: 12}}>
                            <Button title={"Hủy lời mời"} onPress={()=> {
                                setStatusUser({
                                    request: false,
                                    duplicate: false,
                                });
                                setToggleMakeFriend(()=> false)
                            }} />
                        </View>
                    </>
                }
              </>
            }

          </View>
        </View>
      </PopupDialog>
  )
}

export default PopupUser