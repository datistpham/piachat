import React, { createContext, useContext, useEffect, useState } from 'react'
import get_profile_user from '../../api/user/get_profie_user';
import { SocketContainerContext } from '../SocketContainer/SocketContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_URL } from '../../config';
import axios from "axios"

export const AuthContext= createContext()
const AuthContainer = ({children}) => {
  const { socketState }= useContext(SocketContainerContext)
  const [data, setData] = useState({});
  const [auth, setAuth] = useState();
  const [change, setChange]= useState(false)
  const [data2, setData2]= useState()
  const [visibleTooltip, setVisibleTooltip] = useState(false);
  const [accessToken, setAccessToken]= useState()
  useEffect(()=> {
    (async ()=> {
      const accessToken= JSON.parse(await AsyncStorage.getItem("accessToken"))
      setAccessToken(accessToken)
    })()
  }, [change])
  useEffect(() => {
    (async () => {
      AsyncStorage.getItem("uid")
      .then(async json=> {
        if(json) {
          const accessToken= JSON.parse(await AsyncStorage.getItem("accessToken"))
          const uid= JSON.parse(json)
          const res = await axios({
            url: `${SERVER_URL}/api/users/${uid}`,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            method: "get",
            params: {
              id: uid,
            },
          });
          const result = await res.data;
          if (res.status === 200) {
            setData(result)
            setAuth(() => true);
          } else {
            setAuth(() => false);
          }
          return setData(result);
        }
        else {
          setAuth(()=> false)
        }
      })
    })();
  }, [change]);
  useEffect(()=> {
    if(data?._id && accessToken) {
      (async ()=> {
        const result= await get_profile_user(data?._id, accessToken)
        return setData2(result)
      })()
    }
  }, [data, change])
  useEffect(()=> {
    if(data2?._id) {
      socketState?.emit("join_room_self", {meId: data2?._id})
    }
  }, [data2?._id, change])
  const logout= ()=> {
    AsyncStorage.removeItem("uid")
    AsyncStorage.removeItem("accessToken")
    setAuth(false)
    
  }
  return (
    <AuthContext.Provider value={{data, auth, setData, setChange, setAuth, change, data2, setData2, accessToken, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContainer