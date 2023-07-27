import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, View, Image, Text, TouchableHighlight, FlatList } from 'react-native'
import get_list_conversation from '../../api/conversation/get_list_conversation'
import { AuthContext } from '../AuthContainer/AuthContainer'
import { SocketContainerContext } from '../SocketContainer/SocketContainer'
import { LogBox } from 'react-native';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import Search from '../Search/Search'
import _ from "lodash"
import moment from 'moment'

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
const Chats = () => {
  const [visible, setVisible] = useState(false);
  const { data: dataApp, accessToken } = useContext(AuthContext)
  const [data, setData]= useState([])
  const [isSearch, setIsSearch]= useState(false)
  const route= useRoute()
  const { socketState } = useContext(SocketContainerContext)
  useEffect(() => {
    (async ()=> {
      try {
        const result= await get_list_conversation(dataApp?._id, accessToken)
        setData(_.sortBy(result?.filter(item=> item.member.length > 1 || (item.member.length > 0 && item?.label?.length > 0)), function(e) {return moment(e.lastUpdate).valueOf()}))
        
      } catch (error) {
        console.log(error)
      }
  })()
  }, [dataApp])

  useEffect(()=> {
    if(data.length > 0 ) {
        socketState.on("newest_message", (data2)=> {
            const index= data.findIndex(item=> item.id_conversation === data2?.roomId) 
            if(index >= 0) {
                const updateData= [...data.slice(0, index), {...data[index], lastUpdate: data2?.lastUpdate}, ...data.slice(index + 1)]
                setData(()=> _.sortBy(updateData, function(e) {return moment(e.lastUpdate).valueOf()}))
            }
        })
        socketState.on("newest_message_sound", (data2)=> {
            const index= data.findIndex(item=> item.id_conversation === data2?.roomId) 
            // if(index >= 0) {
            //     audio.play();
            // }
        })
    }
}, [socketState, data])

  const renderItem= (data)=> {
    return data?.map((item, index)=> <Item key={index} {...item} setVisible={setVisible} idUser={data?.user?._id} />)
  }
  return (
    <View style={{ flex: 1, display: "flex" }}>
      <Search setIsSearch={setIsSearch} isSearch={isSearch} />
      {
        isSearch=== false && 
        <ScrollView style={{ flex: 1 }}>
          {/* <FlatList data={result?.filter(item=> item.member.length > 1)} renderItem={({ item, index, separators }) => <Item key={index} {...item} setVisible={setVisible} idUser={data?.user?._id} />} /> */}
          {renderItem(_.orderBy(data, function(e) {return moment(e.lastUpdate, "D/M/YYYY, H:mm:ss A").valueOf()}, "desc"))}
        </ScrollView>
      }
      
      {/* Create a new contact */}
      <PopupDialog
        width={0.5}
        visible={visible}
        onTouchOutside={() => setVisible(false)}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
      >
        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <TouchableHighlight>
            <Text style={{paddingTop: 10, paddingBottom: 10, fontSize: 17}}>Ẩn cuộc trò chuyện</Text>
          </TouchableHighlight>
          <Text style={{paddingTop: 10, paddingBottom: 10, fontSize: 17, color: "red"}}>Xóa cuộc trò chuyện</Text>
        </View>
      </PopupDialog>
      
    </View>
  )
}

export const Item = (props) => {
  const { socketState } = useContext(SocketContainerContext)

  const navigation = useNavigation()
  const toDetailConversation = () => {
    if (props?.imageGroup?.length > 0) {
      navigation.navigate("DetailConversation", { idConversation: props?._id, imageGroup: props?.imageGroup, labelGroup: props?.label })
    }
    else if (!props?.imageGroup) {
      navigation.navigate("DetailConversation", { idConversation: props?._id, imageGroup: props?.member?.filter(item => item?._id !== props?.idUser)?.[0]?.profilePicture, labelGroup: props?.member?.filter(item => item?._id !== props?.idUser)?.[0]?.username })
    }
    socketState.emit("join_room_conversation", { roomId: props?._id });
  }
  return (
    <TouchableHighlight onLongPress={() => props?.setVisible(true)} style={{ width: "100%" }} underlayColor={"orange"} onPress={toDetailConversation}>
      {/* <Swipeable leftContent={leftContent} rightButtons={rightButtons}> */}
      <View style={{ width: "100%", padding: 16, display: "flex", alignItems: "center", flexDirection: "row", backgroundColor: "#fff" }}>
        <>
          {
            props?.imageGroup?.length > 0 && props?.label?.length > 0 && <Image style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, backgroundColor: "#d9d9d9" }} source={{ uri: props?.imageGroup }} />
          }
          {
            !props?.imageGroup && props?.member?.filter(item => item?._id !== props?.idUser)?.[0]?.profilePicture?.length > 0 &&  <Image style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, backgroundColor: "#d9d9d9" }} source={{ uri: props?.member?.filter(item => item?._id !== props?.idUser)?.[0]?.profilePicture }} />
          }
          {
            !props?.imageGroup && props?.member?.filter(item => item?._id !== props?.idUser)?.[0]?.profilePicture?.length <= 0 && <View>
              <TouchableHighlight style={{width: 50, height: 50, borderRadius: 25, backgroundColor: "#d9d9d9"}}>
                <Text></Text>
              </TouchableHighlight>
            </View>
          }
        </>
        {/*  */}
        <>
          {
            props?.label?.length > 0 && <Text style={{ fontSize: 18, marginLeft: 12 }}>{props?.label}</Text>
          }
          {
            !props?.label && <Text style={{ fontSize: 18, marginLeft: 12 }}>{props?.member?.filter(item => item?._id !== props?.idUser)?.[0]?.username}</Text>
          }
        </>
      </View>
      {/* </Swipeable> */}

    </TouchableHighlight>
  )
}

export default Chats