import { useRoute } from '@react-navigation/native'
import React, { memo, useContext, useEffect, useState } from 'react'
import { TextInput, TouchableHighlight, View, Text, Image, SafeAreaView, Platform  } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons'
import Icons1 from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../AuthContainer/AuthContainer'
import { SocketContainerContext } from '../SocketContainer/SocketContainer'
import TypeWriter from 'react-native-typewriter'
import uuid from 'react-native-uuid';
import post_message from '../../api/message/post_message'
import update_last_conversation_id from '../../api/conversation/update_last_conversation_id'
import * as DocumentPicker from 'expo-document-picker';
import upload_image from '../../api/upload_image'
import text_to_voice from '../../api/conversation/text_to_voice'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Type = memo(() => {
    const insets= useSafeAreaInsets()
    const route= useRoute()
    const {socketState }= useContext(SocketContainerContext)
    const {data }= useContext(AuthContext)
    const [contentText, setContentText]= useState("")
    const [typing, setTyping] = useState(false);
    const [userTyping, setUserTyping] = useState();
  
    useEffect(() => {
      socketState.on("broadcast_to_all_user_in_room_typing", (data) => {
        setTyping(data.data.typing);
        setUserTyping(data.data.data.username);
      });
    }, [socketState]);
    const f= (e)=> {
      setContentText(e)
      if(e?.length === 1) {
        socketState.emit("typing_from_client_on", {roomId: route.params?.idConversation, data: data.user, typing: true})
      }
      else if(e?.length <= 0) {
        socketState.emit("typing_from_client_off", {roomId: route.params?.idConversation, data: data.user, typing: false})
      }
    }
  
      const sendMessage= ()=> {
          if(contentText.length <= 0) {
              socketState.emit("message_from_client", {message: "like", roomId: route.params?.idConversation, sender: data.user, type_message: "like", key: uuid.v4(), createdAt: new Date()})
              socketState.emit("typing_from_client_off", {roomId: route.params?.idConversation, data: data.user, typing: false})
              post_message(data.user._id, route.params?.idConversation, uuid.v4(), "like", route.params?.idConversation, "like", "", data.accessToken)
              update_last_conversation_id(route.params?.idConversation, data.accessToken, data.user?._id)
          }
          else {
              socketState.emit("message_from_client", {message: contentText, roomId: route.params?.idConversation, sender: data.user, type_message: "text", key: uuid.v4(), createdAt: new Date()})
              socketState.emit("typing_from_client_off", {roomId: route.params?.idConversation, data: data.user, typing: false})
              post_message(data.user._id, route.params?.idConversation, uuid.v4(), contentText, route.params?.idConversation, "text", "", data.accessToken)
              update_last_conversation_id(route.params?.idConversation, data.accessToken, data.user?._id)
              setContentText(()=> "")
          }
      }
  // 
      const sendMessageTextToVoice= async ()=> {
          if(contentText.length > 0) {
              const voiceResult= await text_to_voice(contentText, data?.accessToken)
              socketState.emit("message_from_client", {message: voiceResult, roomId: route.params?.idConversation, sender: data.user, type_message: "text_to_voice", key: uuid.v4(), createdAt: new Date()})
              socketState.emit("typing_from_client_off", {roomId: route.params?.idConversation, data: data.user, typing: false})
              post_message(data.user._id, route.params?.idConversation, uuid.v4(), voiceResult, route.params?.idConversation, "text_to_voice", "", data.accessToken)
              update_last_conversation_id(route.params?.idConversation, data.accessToken, data.user?._id)
              setContentText(()=> "")
          }
      }
    return (
      <View style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: 'row', padding: 10, backgroundColor: "#fff", position: "absolute", bottom: 0, left: 0, borderTopColor: "#d9d9d9", borderStyle: "solid", borderTopWidth: 1, zIndex: 999, paddingBottom: Platform.OS=== "ios" ? insets.bottom : 10}}>
          <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
              <ChooseImage />
              <ChooseFile />
          </View>
          <View style={{flex: 1, marginLeft: 8, marginRight: 8}}>
              <TextInput value={contentText} onChangeText={f} style={{borderRadius: 80, borderStyle: 'solid', borderColor: '#d9d9d9', borderWidth: 1, height: 40, padding: 10}} />
          </View>
          <View style={{display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: 'row'}}>
              {/* <SendMessageVoice sendMessageTextToVoice={sendMessageTextToVoice} /> */}
              <SendMessage contentText={contentText} sendMessage={sendMessage} />
          </View>
          {
              typing=== true && <TypingMessage userTyping={userTyping} />
          }
          {/* <View style={{marginBottom: 60}}></View> */}
      </View>
    )
})

const ChooseImage= ()=> {
    const {socketState }= useContext(SocketContainerContext)
    const {data }= useContext(AuthContext)
    const route= useRoute()
    const sendImage= async (messageImg)=> {
        socketState.emit("message_from_client", {message: messageImg, roomId: route.params?.idConversation, sender: data.user, type_message: "image", key: uuid.v4(), createdAt: new Date()})
        post_message(data.user?._id, route.params?.idConversation, uuid.v4(), messageImg, route.params?.idConversation, "image", "", data.accessToken)
        update_last_conversation_id(route.params?.idConversation, data.accessToken, data.user?._id)
    }
    const [resultImage, setResultImage]= useState()
    const chooseImageFunction= ()=> {
        DocumentPicker.getDocumentAsync()
        .then(async res=> {
            // const fileUri= res.uri
            const formData= new FormData()
            formData.append("image", {...res, type: "image/jpeg"})
            const result= await upload_image(formData)
            sendImage(result?.secure_url)
            setResultImage(result)
        })
        .catch(err=> setResultImage(err))
    }
    return (
        <TouchableHighlight underlayColor={"unset"} onPress={chooseImageFunction}>
            <View style={{padding: 10, borderRadius: 100, borderWidth: 1, borderStyle: "solid", borderColor: "#d9d9d9", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Icons name={"image"} size={18} color={"orange"} />
            </View>
        </TouchableHighlight>
    )
}

const ChooseFile= ()=> {
    return (
        <TouchableHighlight underlayColor={"unset"} style={{marginLeft: 12}}>
            <View style={{padding: 10, borderRadius: 100, borderWidth: 1, borderStyle: "solid", borderColor: "#d9d9d9", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Icons name={"attach-file"} size={18} color={"orange"} />
            </View>
        </TouchableHighlight>
    )
}

const SendMessage= (props)=> {
    
    return (
        <TouchableHighlight underlayColor={"unset"} style={{marginLeft: 12}}>
           <>
                {
                    props?.contentText?.length <=0 && <TouchableHighlight onPress={()=> props?.sendMessage()} underlayColor={"unset"}>
                    <Icons1 onPress={()=> props?.sendMessage()} name={"like1"} size={18} color={"orange"} />
                    </TouchableHighlight>
                }
                {
                    props?.contentText?.length > 0 && <View>
                        <Icons onPress={()=> props?.sendMessage()} name={"send"} size={18} color={"orange"} />
                    </View>
                }
           </>
        </TouchableHighlight>
    )
}
const SendMessageVoice= (props)=> {
    return (
        <TouchableHighlight onPress={()=> props?.sendMessageTextToVoice()} underlayColor={"unset"} style={{marginLeft: 12}}>
            <Icons name={"multitrack-audio"} color={"orange"} size={18} />
        </TouchableHighlight>
    )
}

const TypingMessage= (props)=> {
    return (
        <View style={{position: "absolute", top: "-100%", left: 0, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", padding: 10, backgroundColor: "#fff"}}>
            <Text>{props?.userTyping} is typing </Text>
            <TypeWriter typing={1}>...</TypeWriter>
        </View>
    )
}

export default Type