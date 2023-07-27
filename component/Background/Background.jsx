import React from 'react'
import { Image, View } from 'react-native'

const Background = () => {
  return (
    <View style={{width: '100%', height: '100%', display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", top: 0, left: 0}}>
        <Image style={{width: '100%', height: '100%'}} source={{uri: "https://res.cloudinary.com/cockbook/image/upload/v1689881119/Screen_Shot_2023-07-21_at_02.25.00_fsoss6.png"}} />
    </View>
  )
}

export default Background