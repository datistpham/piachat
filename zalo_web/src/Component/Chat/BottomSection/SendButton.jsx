import Cookies from 'js-cookie'
import React from 'react'
import { useContext } from 'react'
import { memo } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { v4 } from 'uuid'
import update_last_conversation_id from '../../../api/coversation/update_last_conversation_id'
import post_message from '../../../api/message/post_message'
import { AppContext } from '../../../App'
import { SocketContainerContext } from '../../../SocketContainer/SocketContainer'
import TypingText from './TypingText'
// import {RiVoiceprintLine } from "react-icons/ri"
import text_to_voice from '../../../api/message/text_to_voice'

const SendButton = (props) => {
  const {socketState}= useContext(SocketContainerContext)
  const {data }= useContext(AppContext)
  const {idConversation }= useParams()
  const keyMessage= v4()
  const sendMessage= ()=> {
    socketState.emit("message_from_client", {message: props.contentText, roomId: idConversation, sender: data, type_message: "text", key: keyMessage, createdAt: new Date()})
    socketState.emit("typing_from_client_off", {roomId: idConversation, data, typing: false})
    post_message(Cookies.get("uid"), idConversation, keyMessage, props.contentText, idConversation, "text")
    update_last_conversation_id(idConversation)
    props.setContentText(()=> "")
    props?.sendNewMessage()
  }
 // eslint-disable-next-line
  const sendMessageTextToVoice= async ()=> {
    if(props?.contentText.length > 0) {
      const voiceResult= await text_to_voice(props?.contentText)
      socketState.emit("message_from_client", {message: voiceResult, roomId: idConversation, sender: data, type_message: "text_to_voice", key: keyMessage, createdAt: new Date(), extend_text: props?.contentText, autoplaying: 0})
      socketState.emit("typing_from_client_off", {roomId: idConversation, data: data, typing: false})
      post_message(Cookies.get("uid"), idConversation, keyMessage, voiceResult, idConversation, "text_to_voice", "", props?.contentText)
      update_last_conversation_id(idConversation)
      props?.setContentText(()=> "")
      props?.sendNewMessage()
    }
}
  return (
    <>
      <TypingText {...props} sendMessage={sendMessage} />
      {/* {
        data?.isDeaf=== true &&
        <div title={"Send text voice"} className={"dfjdkdjskjkdjkgfljdadsas"}  style={{display: "flex", justifyContent: "center", alignItems: 'center', gap: 10, paddingLeft: 16}}>
          <Button onClick={()=> {
            sendMessageTextToVoice()
            props?.newestMessage()
          }} variant={"primary"}>
            <RiVoiceprintLine />
          </Button>
        </div>
      } */}
      <div className={"dfjdkdjskjkdjkgfljdadsas"}  style={{display: "flex", justifyContent: "center", alignItems: 'center', gap: 10, paddingLeft: 16}}>
        <Button onClick={()=> {
          sendMessage()
          props?.newestMessage()
        }} disabled={props?.contentText?.length > 0 ? false : true } style={{backgroundColor: "orange"}}>Gửi</Button>
      </div>

    </>
  )
}

export default memo(SendButton)