import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, Text, Touchable, TouchableHighlight, View } from 'react-native'
import get_list_friends from '../../api/friends/get_friends'
import { AuthContext } from '../AuthContainer/AuthContainer'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { LogBox } from 'react-native';

const Contact = () => {
  const navigation= useNavigation()
  useEffect(() => {
    LogBox.ignoreLogs(['source.uri']);
  }, [])

  const {data }= useContext(AuthContext)
  const [result, setResult]= useState({})
  const isFocused = useIsFocused();
  useFocusEffect(
    React.useCallback(()=> {
      get_list_friends(data?.user?._id, data?.accessToken, setResult)
    }, [data, isFocused])
  )
  return (
    <View style={{display: "flex", flex: 1}}>
      {
        result?.data?.friends?.length > 0 && 
        <FlatList data={result?.data?.friends} renderItem={({item, index, separators})=> <TouchableHighlight onPress={()=> navigation.navigate("Profile", {username: item.username, idUser: item._id})} underlayColor={"#e7e7e7"}>
          <View key={index} style={{display: "flex", padding: 16, alignItems: 'center', flexDirection: 'row', backgroundColor: "#fff"}}>
            <Image style={{width: 50, height: 50, borderRadius: 25, backgroundColor: "#d9d9d9"}} source={{uri: item?.profilePicture}} />
            <Text style={{fontSize: 18, marginLeft: 12}}>{item.username}</Text>
          </View>
        </TouchableHighlight>} />
      }
      {
        result?.data?.friends?.length <= 0 && 
        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Text style={{fontSize: 18, marginTop: 12}}>Không có bạn bè</Text>
        </View>
      }

    </View>
  )
}

export default Contact