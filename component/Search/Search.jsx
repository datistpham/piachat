import React, { useContext, useEffect, useState } from 'react'
import { FlatList, ScrollView, TextInput, View, TouchableHighlight, Text, Button, Image, Dimensions } from 'react-native'
import Fuse from "fuse.js"
import { useIsFocused } from '@react-navigation/native'
import get_list_conversation from '../../api/conversation/get_list_conversation'
import { AuthContext } from '../AuthContainer/AuthContainer'
import { Item } from '../Chats/Chats'
import Icons from "react-native-vector-icons/AntDesign"
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import search_user_by_phone from '../../api/search_user_by_phone'
import PopupUser from './PopupUser'

const Search = (props) => {
  const isFocused= useIsFocused()
  const {data }= useContext(AuthContext)
  const [result, setResult]= useState([])
  const [querySearch, setQuerySearch]= useState("")
  const [newFriend, setNewFriend]= useState(false)
  const [newGroup, setNewGroup]= useState(false)
  const [isExistUser, setIsExistUser]= useState(false)
  const [isNotExistUser, setIsNotExistUser]= useState(false)
  const [phoneNumber, setPhoneNumber]= useState("")
  const [dataUser, setDataUser]= useState()
  const options = {
    keys: [
        { name: 'label', getFn: (book) => book.label },
        { name: 'username', getFn: (book) => book.member?.map(item=> item.username) }
      ]
  };
  useEffect(()=> {
    get_list_conversation(setResult, data?.user?._id, data?.accessToken)
  }, [isFocused])
  
  const fuse = new Fuse(result, options);
  const closeNewFriend= ()=> {
    setPhoneNumber("")
    setNewFriend(false)
  }
  const closeNewGroup= ()=> {
    setNewGroup(false)
  }
  useEffect(()=> {
    if(querySearch?.length > 0) {
      props?.setIsSearch(()=> true)
    }
    else {
      props?.setIsSearch(()=> false)
    }
  }, [querySearch])
  function searchByLabel(searchTerm) {
    // Filter the data to only include items with matching labels

    const results = result?.filter(item => item?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    return results;
  }

  function searchByMember(searchTerm) {
    // Filter the data to only include items with members that have matching usernames
    const results = result?.filter(item=> item?.label=== undefined )?.filter(item => item?.member?.some(member => member?.username?.toLowerCase()?.includes(searchTerm.toLowerCase())));
    return results;
  }

  function finalSearch(searchTerm) {
    const search1= searchByLabel(searchTerm)
    const search2= searchByMember(searchTerm)
    return search1.concat(search2)
  }
  const renderItem= (data)=> {
    return data?.map((item, index)=> <Item {...item} key={index} idUser={data?.user?._id} />)
  }
  return (
    <View>
      <View style={{marginTop: 12, width: "100%", display: "flex", justifyContent: "center", alignItems: "center",}}>
        <View style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
          <View style={{flex: 1, height: 50, position: "relative", marginBottom: 12}}>
            <Icons style={{position: "absolute", left: 0, transform: [
              {translateX: - Dimensions.get('window').height}
            ]}} name={"search1"} size={20} />
            <TextInput cursorColor={"#000"} value={querySearch} onChangeText={setQuerySearch} style={{flex: 1, height: 50, borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "orange", padding: 10, backgroundColor: "#fff", marginLeft: 10, marginRight: 10}} placeholder={"Tìm kiếm cuộc trò chuyện"} />
          
          </View>
          {/* <View style={{display: "flex", justifyContent: "center", alignItems: "center", margin: 12}}>
            <TouchableHighlight style={{padding: 10, borderRadius: 100}} underlayColor={"orange"} onPress={()=> setNewFriend(true)}>
              <Icons name={"adduser"} size={24} />
            </TouchableHighlight>
          </View>
          <View style={{display: "flex", justifyContent: "center", alignItems: "center", margin: 12}}>
            <TouchableHighlight style={{padding: 10, borderRadius: 100}} underlayColor={"orange"} onPress={()=> setNewGroup(true)}>
              <Icons name={"addusergroup"} size={24} />
            </TouchableHighlight>
          </View> */}
        </View>
        {
          props?.isSearch=== true && 
          <ScrollView style={{width: '100%', marginTop: 12}}>
            {renderItem(finalSearch(querySearch))}
          </ScrollView>
        }
      </View>




      {/* Find */}
      <PopupDialog
        width={0.8}
        visible={newFriend}
        onTouchOutside={() => closeNewFriend()}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
      >
        <View style={{padding: 5}}>
          <Text style={{fontSize: 18, textAlign: "center", fontWegight: "600", color: "#000", marginBottom: 12}}>Thêm bạn</Text>
          <Text style={{marginBottom: 12, fontSize: 17}}>Tìm bằng số điện thoại</Text>
          <TextInput value={phoneNumber} onChangeText={setPhoneNumber} style={{width: "100%", height: 40, borderRadius: 10, backgroundColor: "#e7e7e7", fontSize: 16, padding: 10}} />
          <View style={{display: "flex", flexDirection: "row-reverse", alignItems: "center", marginTop: 12}}>
            <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Button onPress={()=> setNewFriend(false)} color={"#555"} title={"Huỷ"} />
            </View>
            <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginRight: 12, marginLeft: 12}}>
              <Button onPress={async ()=> {
                const result= await search_user_by_phone(phoneNumber, data?.accessToken)
                if(result?.exist=== false ) {
                  closeNewFriend()
                  setIsNotExistUser(true)
                }
                else {
                  setDataUser(result)
                  closeNewFriend()
                  setIsExistUser(true)
                }
              }} title={"Xác nhận"} />
            </View>
          </View>
        </View>
      </PopupDialog>
      {/*  */}

      <PopupDialog
        width={0.8}
        visible={isNotExistUser}
        onTouchOutside={() => setIsNotExistUser(false)}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
      >
        <View style={{padding: 5}}>
          <Text style={{fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 12}}>Không tìm thấy người dùng</Text>          
          <Button title={"Đóng"} onPress={()=> setIsNotExistUser(false)}>Đóng</Button>
        </View>
      </PopupDialog>

      {/* Find out user */}
      <PopupUser isExistUser={isExistUser} setIsExistUser={setIsExistUser} dataUser={dataUser} data={data} />

      <PopupDialog
        width={0.5}
        visible={newGroup}
        onTouchOutside={() => closeNewGroup()}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
      >
        
      </PopupDialog>
    </View>
  )
}

export default Search 