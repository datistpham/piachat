import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Image, Text, TouchableHighlight, View, ScrollView } from 'react-native'
import Icons from 'react-native-vector-icons/MaterialIcons';
import user_profile from '../../api/user_profile';
import { AuthContext } from '../AuthContainer/AuthContainer';

const AboutDetailConversation = (()=> {
    const isFocused= useIsFocused()
    const navigation= useNavigation()
    const route= useRoute()
    const {data }= useContext(AuthContext)
    const [result, setResult]= useState({})
    useEffect(()=> {
        if(data?.user) {
          user_profile(route.params?.idUser, data?.accessToken, setResult)
        } 
      }, [route.params, data, isFocused])
    return (
        <ScrollView style={{flex: 1, backgroundColor: "#fff"}}>
            <View style={{height: "100%", backgroundColor: "#fff"}}>
                {/* <View style={{marginBottom: 12, padding: 10, display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexDirection: 'row'}}>
                    <View><Text style={{opacity: 0}}>Xongaaa</Text></View>
                    <TouchableHighlight underlayColor={"unset"} style={{display: "flex", justifyContent:"center", alignItems: "center"}}>
                        <Text style={{height: 5, width: 60, borderRadius: 5, backgroundColor: "#d9d9d9", textAlign: "center"}}></Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={"unset"}>
                        <Text onPress={()=> navigation.goBack(-1)} style={{padding: 10}}>Đóng</Text>
                    </TouchableHighlight>
                </View> */}
                <View>
                    <View style={{width: "100%"}}>
                        <Image style={{width: "100%", aspectRatio: 5 / 2}} source={{uri: "https://cover-talk.zadn.vn/default"}} />
                    </View>
                    <View style={{width: "100%", position: "relative", display: "flex", justifyContent: "center", alignItems: 'center'}}>
                        <View style={{position: "relative", top: -60, width: '100%'}}>
                            <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Image style={{width: 120, height: 120, borderRadius: 60, marginBottom: 12, backgroundColor: "#f2f0f5"}} source={{uri: route.params?.imageGroup}} />
                                <Text style={{fontSize: 18, textAlign: 'center'}}>{route.params?.labelGroup}</Text>
                            </View>
                            <TouchableHighlight onPress={()=> navigation.navigate("Storage", {...route.params})} underlayColor={"unset"}>
                                <View style={{padding: 10, backgroundColor: "#f2f0f5", width: '100%', marginTop: 12}}>
                                    <View style={{width: "100%", display: "flex", alignItems: 'center', flexDirection: 'row', justifyContent: "space-between"}}>
                                        <View style={{display: "flex", justifyContent: "center", alignItems: 'center', flexDirection: "row"}}>
                                            <Icons name={"image"} size={20} />
                                            <Text style={{marginLeft: 12, fontSize: 18}}>Kho lưu trữ</Text>
                                        </View>
                                        <TouchableHighlight>
                                            <View style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                                                <Icons name={"arrow-forward-ios"} size={20} />
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View> 
        </ScrollView>   
    )
    }
)

export default AboutDetailConversation