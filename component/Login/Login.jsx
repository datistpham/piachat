import React, { useContext, useState } from "react";
import {
  Button,
  Image,
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Background from "../Background/Background";
import Icons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../AuthContainer/AuthContainer";
import login from "../../api/login";
import { useNavigation } from "@react-navigation/native";
import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from 'react-native-restart';

const Login = () => {
  const navigation = useNavigation();
  const { setData, setAuth, setChange } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [dataLogin, setDataLogin] = useState();
  const [loading, setLoading]= useState(false)
  const handleRestart = () => {
    RNRestart.restart();
  };
  const closePopup = () => {
    setIsLogin(false);
  };
  const loginfunc= async ()=> {
    Keyboard.dismiss()
    setLoading(true)
    try {
      const result = await login(
        phoneNumber,
        password,
        setData,
        setAuth
      );
      if (result?.login !== true) {
        setDataLogin(result);
        setIsLogin(true);
      } else {
        const accessToken= JSON.stringify(result.accessToken)
        const uid= JSON.stringify(result.user._id)
        AsyncStorage.setItem("accessToken", accessToken)
        AsyncStorage.setItem("uid", uid)
        setChange(prev=> !prev)
        navigation.navigate("Tab", { headerTitle: "Đoạn Chat" });
      }
      
    } catch (error) {
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Background />
      <View style={{ width: "100%", padding: 10, marginTop: 12 }}>
        
        <View
          style={{ width: "100%", backgroundColor: "#fff", borderRadius: 10 }}
        >
          <View style={{ marginBottom: 12, width: "100%", display: "flex", justifyContent: "center", alignItems: "center", padding: 10, flexDirection: 'row', position: "relative", zIndex: 99}}>
          <Image style={{width: 200, height: 160}} source={{uri: "https://res.cloudinary.com/cockbook/image/upload/v1689881188/logothv_kbnqge.png"}} />
        </View>
          <View
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              position: "relative",
              marginBottom: 12,
            }}
          >
            <TextInput
              cursorColor={"#000"}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder={"Tên tài khoản"}
              style={{
                width: "100%",
                height: 50,
                borderRadius: 10,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#e7e7e7",
                padding: 10,
                paddingLeft: 32,
                fontSize: 17,
              }}
            />
            <Icons
              name={"account-circle"}
              size={18}
              style={{ position: "absolute", top: 25, left: 20 }}
            />
          </View>
          <View
            style={{
              width: "100%",
              padding: 10,
              backgroundColor: "#fff",
              borderRadius: 10,
              position: "relative",
              marginBottom: 12,
            }}
          >
            <TextInput
              cursorColor={"#000"}
              value={password}
              onChangeText={setPassword}
              placeholder={"Mật khẩu"}
              secureTextEntry={true}
              style={{
                width: "100%",
                height: 50,
                borderRadius: 10,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#e7e7e7",
                padding: 10,
                paddingLeft: 32,
                fontSize: 17,
              }}
            />
            <Icons
              name={"lock"}
              size={18}
              style={{ position: "absolute", top: 25, left: 20 }}
            />
          </View>
          <View style={{ padding: 10 }}>
            {Platform.OS === "android" && (
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={loginfunc}
              >
                {
                  loading=== false ? 
                <Text style={styles.buttonText}>Đăng nhập</Text>
                : 
                <ActivityIndicator animating={true} color={"#fff"} size={20} />
                }
              </TouchableOpacity>
            )}
            {Platform.OS === "ios" && (
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={loginfunc}
              >
                {
                  loading=== false ? 
                <Text style={styles.buttonText}>Đăng nhập</Text>
                : 
                <ActivityIndicator animating={true} color={"#fff"} size={20} />
                }
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <PopupDialog
        width={0.85}
        visible={isLogin}
        onTouchOutside={() => closePopup()}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      >
        <View style={{ padding: 10 }}>
          <Text numberOfLines={1} style={{ textAlign: "center", fontSize: 17, padding: 10}}>
            {dataLogin?.msg}
          </Text>
          <Button onPress={() => closePopup()} title={"Đóng"} color={"orange"} />
        </View>
      </PopupDialog>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
