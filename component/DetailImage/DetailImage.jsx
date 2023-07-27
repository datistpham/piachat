import React from 'react'
import { Image, View } from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
// import ImageViewer from 'react-native-image-zoom-viewer';
import { useRoute } from '@react-navigation/native';

const DetailImage = () => {
  const route= useRoute()
  const downloadFile= ()=> {
    const uri = "https://firebasestorage.googleapis.com/v0/b/quiz-20730.appspot.com/o/images%2Fsuite4.jpg?alt=media&token=ebae891c-aebe-44bb-9c9a-9f3831801213"
    let fileUri = FileSystem.documentDirectory + "suite4.jpg";
    FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
        saveFile(uri)
      })
      .catch(error => {
        console.error(error);
      })
    }   
    const saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
        }
    }
  return (
    <View style={{flex: 1, backgroundColor: "#fff", display: 'flex', justifyContent: "center", alignItems: "center"}}>
        <Image source={{uri: route.params?.image}} style={{width: "90%", aspectRatio: 2 / 3}} />
    </View>
  )
}

export default DetailImage