import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Image, Text, View } from 'react-native'
import get_conversation_friends from '../../api/conversation/get_conversation_friends'
import make_conversation from '../../api/conversation/make_conversation'
import send_request_make_friend_by_me from '../../api/friends/send_request_friend'
import unfriend from '../../api/friends/un_friends'
import user_profile from '../../api/user_profile'
import { AuthContext } from '../AuthContainer/AuthContainer'

const Profile = () => {
  const isFocused= useIsFocused()
  const route= useRoute()
  const {data }= useContext(AuthContext)
  const [result, setResult]= useState({})
  const [newConversation, setNewConversation]= useState()
  const [hasConversation, setHasConversation]= useState()
  const [isFriend, setIsFriend]= useState(true)

  useEffect(()=> {
    if(data) {
      get_conversation_friends(route.params?.idUser, setHasConversation, data?.accessToken, data?.user?._id)
    }
  }, [route.params, data, isFocused])
  useEffect(()=> {
    if(data?.user) {
      user_profile(route.params?.idUser, data?.accessToken, setResult)
    } 
  }, [route.params, data, isFocused])
  const navigation= useNavigation()
  return (
    <View>
        <View style={{width: "100%"}}>
          <Image style={{width: "100%", aspectRatio: 5 / 2}} source={{uri: "https://cover-talk.zadn.vn/default"}} />
        </View>
        <View style={{width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: 'center'}}>
          <View style={{position: "relative", top: -60}}>
            <View>
              <Image style={{width: 120, height: 120, borderRadius: 60, marginBottom: 12, backgroundColor: "#f2f0f5"}} source={{uri: result?.profilePicture}} />
              <Text style={{fontSize: 18, textAlign: 'center'}}>{result?.username}</Text>
            </View>
          </View>
          <View style={{width: "100%", display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', position: "relative", top: -60, marginTop: 12}}>
            <View style={{display: "flex", justifyContent: "center", alignItems: 'center', marginRight: 8}}>
              <Button onPress={async ()=> {
                if(hasConversation.id_conversation) {
                  navigation.navigate("DetailConversation", {idConversation: hasConversation.id_conversation})
                }
                else {
                  make_conversation(undefined, [route.params?.idUser, data?.user?._id], data?.user?._id, undefined, setNewConversation, navigation, data?.accessToken, 0)
                }
              }} title={"Nhắn tin"} />
            </View>
            {
              isFriend=== true && <View style={{display: "flex", justifyContent: "center", alignItems: 'center', marginLeft: 8}}>
              <Button onPress={()=> {
                unfriend(route.params?.idUser, data?.user?._id)
                setIsFriend(false)
              }} title={"Hủy kết bạn"} />
            </View>
            }
            {
              isFriend=== false && 
              <View style={{display: "flex", justifyContent: "center", alignItems: 'center', marginLeft: 8}}>
                <Button onPress={()=> {
                  send_request_make_friend_by_me(route.params?.idUser, data?.accessToken, data?.user?._id)
                  setIsFriend(false)
                }} title={"Kết bạn"} />
              </View>
            }
          </View>
        </View>
    </View>
  )
}

export default Profile