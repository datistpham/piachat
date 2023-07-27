import React, { createContext, Fragment, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { SERVER_URL } from '../../config'

export const SocketContainerContext= createContext()
const SocketContainer = ({children}) => {
  const [socketState, setSocketState]= useState()
  const [meSocket, setMeSocket]= useState("")
  useEffect(()=> {
    const socket= io(`${SERVER_URL}`, [{transports: ["websocket"]}])
    socket.on("me", (id)=> {
      setMeSocket(id)
    })
    setSocketState(socket)
    return ()=> socket.disconnect()
  }, [])
  return (
    <SocketContainerContext.Provider value={{socketState, meSocket}}>
      {children}
    </SocketContainerContext.Provider>
  )
}

export default SocketContainer