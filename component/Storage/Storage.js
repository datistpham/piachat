import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, Text, TouchableHighlight, View } from 'react-native'
import get_files_conversation from '../../api/conversation/get_files_conversation'
import { AuthContext } from '../AuthContainer/AuthContainer'
// import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
// import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';

const Storage = () => {
  const navigation= useNavigation()
  const { data}= useContext(AuthContext)
  const [mode, setMode]= useState(1)
  const [result, setResult]= useState([])
  const [visible, setVisible]= useState(false)
  const route= useRoute()
  useEffect(()=> {
    (async()=> {
        const r= await get_files_conversation(route.params?.idConversation, data?.accessToken)
        return setResult(r?.media)
    })()
  }, [route.params, data])
  return (
    <View style={{flex: 1, backgroundColor: "#fff"}}>
        <View style={{width: "100%", display: 'flex', justifyContent: "space-between", alignItems: 'center', flexDirection: "row", marginTop: 12,}}>
            <TouchableHighlight underlayColor={"unset"} onPress={()=> setMode(()=> 1)}>
                <View style={{marginLeft: 12, marginRight: 12, paddingLeft: 18, paddingRight: 18, height: 32, display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: "row", borderRadius: 80, backgroundColor: mode===1 ? "orange" : "#f2f0f5"}}>
                    <Text style={{fontSize: 18, color: mode===1 ? "#fff": "#000"}}>Media</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={"unset"} onPress={()=> setMode(()=> 2)}>
                <View style={{marginLeft: 12, marginRight: 12, paddingLeft: 18, paddingRight: 18, height: 32, display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: "row", borderRadius: 80, backgroundColor: mode===2 ? "orange" : "#f2f0f5"}}>
                    <Text style={{fontSize: 18, color: mode===2 ? "#fff": "#000"}}>Files</Text>
                </View>
            </TouchableHighlight>
        </View>
        {
            mode=== 1 && 
            <View style={{width: '100%', display: "flex", alignItems: "center", flexDirection: 'row', flexWrap: 'wrap'}}>
                <FlatList numColumns={3} data={result?.filter(item=> item.type_message === "image")} renderItem={({item, index, separators})=> <TouchableHighlight underlayColor={"unset"} onPress={()=> navigation.navigate("DetailImage", {image: item.message})}>
                <View style={{padding: 5, width: Dimensions.get("window").width / 3}} key={index}>
                    <Image style={{width: "100%", aspectRatio: 1 / 1}} source={{uri: item.message}} />
                </View>
                </TouchableHighlight>} />
            </View>
        }
        {
            mode=== 2 && 
            <View style={{width: '100%', display: "flex", alignItems: "center", flexDirection: 'row', flexWrap: 'wrap'}}>
                <FlatList keyExtractor={(item, index) => item.id } data={result?.filter(item=> item.type_message === "file")} renderItem={({item, index, separators})=> <View style={{padding: 5, width: "100%", marginTop: 8}} key={index}>
                    <TouchableHighlight underlayColor={"unset"} onPress={()=> WebBrowser.openBrowserAsync(item?.message)}> 
                        <View style={{width: "100%", backgroundColor: "#f2f0f5", padding: 10}}>
                            <Text numberOfLines={1} style={{fontSize: 18, overflow: "hidden"}}>{item?.message}</Text>
                        </View>
                    </TouchableHighlight>
                </View>} />
            </View>
        }
    </View>
  )
}

export default Storage