import React, { useContext, useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import Background from '../Background/Background'
import Icons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../AuthContainer/AuthContainer';
import login from '../../api/login';
import { useNavigation } from '@react-navigation/native';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import signup from '../../api/signup';
import check_user from '../../api/check_user';
import OTPTextInput  from "react-native-otp-textinput"
import confirm_code from '../../api/confirm_code';
const Signup = () => {
  const navigation= useNavigation()
  const {setData, setAuth }= useContext(AuthContext)
  const [phoneNumber, setPhoneNumber]= useState("")
  const [password, setPassword]= useState("")
  const [isLogin, setIsLogin]= useState(false)
  const [dataLogin, setDataLogin]= useState()
  const [username, setUsername] = useState(() => "");
  const [email, setEmail] = useState(() => "");
  // eslint-disable-next-line
  const [confirmPassword, setConfirmPassword] = useState(() => "");
  // eslint-disable-next-line
  const [data1, setData1] = useState();

  const [message, setMessage] = useState();
  const [checkFinal, setCheckFinal] = useState();
  const [codeVerify, setCodeVerify] = useState();
  const [status, setStatus] = useState();
  const [showPassword, setShowPassword]= useState(false)
  const [showConfirmPassowrd, setShowConfirmPassword]= useState(false)
  const [isExist, setIsExist]= useState(false)
  const [isVerfiy, setIsVerify]= useState(false)
  const [checkVerifyCode, setCheckVerifyCode]= useState(false)
  const checkUserandSignup = async () => {
    const check = await check_user(email, phoneNumber);
    if (check?.msg === true) {
      setMessage(true);
      forgot_password(email, setCheckFinal, true);
    } else {
      setMessage(false);
    }
  };
  const closePopup= ()=> {
    setIsLogin(false)
  }
  return (
    <View style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative"}}>
      <Background />
      <View style={{width: "100%", padding: 10, marginTop: 12}}>
        <Text style={{textAlign: "center", marginBottom: 8, fontSize: 24}}>Đăng ký tài khoản Chat NPD</Text>
        <Text style={{textAlign: "center", marginBottom: 16, fontSize: 24}}>để kết nối với ứng dụng</Text>
        {
            isVerfiy=== false &&
            <View style={{width: '100%', backgroundColor: "#fff", borderRadius: 10}}>
            <View style={{width: "100%", padding: 10, backgroundColor: "#fff", borderRadius: 10, position: "relative", marginBottom: 12}}>
                <TextInput value={username} onChangeText={setUsername} placeholder={"Họ và tên"} style={{width: "100%", height: 50, borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", padding: 10, paddingLeft: 32, fontSize: 17}} />
                <Icons name={"phone"} size={18} style={{position: "absolute", top: 25, left: 20}} />
            </View>
            {/*  */}
            <View style={{width: "100%", padding: 10, backgroundColor: "#fff", borderRadius: 10, position: "relative", marginBottom: 12}}>
                <TextInput value={phoneNumber} onChangeText={setPhoneNumber} placeholder={"Số điện thoại"} style={{width: "100%", height: 50, borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", padding: 10, paddingLeft: 32, fontSize: 17}} />
                <Icons name={"phone"} size={18} style={{position: "absolute", top: 25, left: 20}} />
            </View>
            {/*  */}
            <View style={{width: "100%", padding: 10, backgroundColor: "#fff", borderRadius: 10, position: "relative", marginBottom: 12}}>
                <TextInput value={email} onChangeText={setEmail} placeholder={"Email"} style={{width: "100%", height: 50, borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", padding: 10, paddingLeft: 32, fontSize: 17}} />
                <Icons name={"phone"} size={18} style={{position: "absolute", top: 25, left: 20}} />
            </View>
            {/*  */}
            <View style={{width: "100%", padding: 10, backgroundColor: "#fff", borderRadius: 10, position: "relative", marginBottom: 12}}>
                <TextInput value={password} onChangeText={setPassword} placeholder={"Mật khẩu"} secureTextEntry={true} style={{width: "100%", height: 50, borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", padding: 10, paddingLeft: 32, fontSize: 17}} />
                <Icons name={"lock"} size={18} style={{position: "absolute", top: 25, left: 20}} />
            </View>
            {/*  */}
            <View style={{width: "100%", padding: 10, backgroundColor: "#fff", borderRadius: 10, position: "relative", marginBottom: 12}}>
                <TextInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder={"Nhập lại mật khẩu"} secureTextEntry={true} style={{width: "100%", height: 50, borderRadius: 10, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", padding: 10, paddingLeft: 32, fontSize: 17}} />
                <Icons name={"lock"} size={18} style={{position: "absolute", top: 25, left: 20}} />
            </View>
            <View style={{padding: 10}}>
                <Button onPress={async ()=> {
                const result1= await check_user(email, phoneNumber) 
                if(result1?.msg=== false) {
                    setIsExist(true)
                }
                
                else {
                    // chua dang ky
                    setIsExist(false)
                    setIsVerify(true)
                }
                //   if(result?.login !== true) {
                //     setDataLogin(result)
                //     setIsLogin(true)
                //   }
                //   else {
                //     navigation.navigate("Tab", {headerTitle: "Đoạn Chat"})
                //   }
                }} title={"Đăng ký"} />
            </View>
            <View style={{width: "100%", direction: "rtl", padding: 10}}>
                <Text style={{fontSize: 14, textAlign: "right"}}>Quên mật khẩu</Text>
            </View>
            <View style={{marginTop: 18, padding: 10}}>
                <View style={{width: "100%", borderTopColor: "#e7e7e7", borderStyle: "solid", borderTopWidth: 1, padding: 10, borderBottomColor: "#e7e7e7", borderBottomWidth: 1}}>
                <Text onPress={()=> navigation.navigate("Login")} style={{textAlign: "center", textDecorationStyle: "solid", textDecorationLine: "underline", textDecorationColor: "#000", color: "#000"}}>Đăng nhập</Text>
                </View>
            </View>
            </View>
        }
        {

        }
      </View>
      {
        isVerfiy=== true && <View style={{padding: 10, backgroundColor: "#fff"}}>
            <Text style={{textAlign: "center", fontSize: 17}}>Chúng tôi đã gửi đến cho bạn một mã xác thực gồm 6 chữ số vui lòng điền vào trường dưới đây để hoàn tất quá trình đăng ký tài khoản</Text>
            <OTPTextInput  inputCount={6} handleTextChange={setCodeVerify} />
            <View style={{marginTop: 12}}></View>
            <Button onPress={async ()=> {
                const result= await confirm_code(email, codeVerify)
                console.log(result)
                if(result?.verify=== true) {
                    const result= await signup(username, phoneNumber, password, email)
                    // console.log(result)
                    navigation.navigate("Login")
                }
                else {

                    // ma xac thuc sai
                    setCheckVerifyCode(true)
                }
            }} title={"Xác nhận"} color={"orange"} />
        </View>
      }
      <PopupDialog
        width={0.5}
        visible={isLogin}
        onTouchOutside={() => closePopup()}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
      >
        <View style={{padding: 10}}>
          <Text style={{textAlign: "center", fontSize: 17}}>{dataLogin?.msg}</Text>
          <Button onPress={()=> closePopup()} title={"Đóng"} />
        </View>
      </PopupDialog>
      <PopupDialog
        width={0.5}
        visible={isExist}
        onTouchOutside={() => setIsExist(false)}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
      >
        <View style={{padding: 10}}>
          <Text style={{textAlign: "center", fontSize: 17}}>Email hoặc số điện thoại đã tồn tại vui lòng thử lại</Text>
          <Button onPress={() => setIsExist(false)} title={"Đóng"} />
        </View>
      </PopupDialog>
      <PopupDialog
        width={0.5}
        visible={checkVerifyCode}
        onTouchOutside={() => setCheckVerifyCode(false)}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
      >
        <View style={{padding: 10}}>
          <Text style={{textAlign: "center", fontSize: 17}}>Mã xác thực không chính xác</Text>
          <Button onPress={() => setCheckVerifyCode(false)} title={"Đóng"} />
        </View>
      </PopupDialog>
    </View>
  )
}

export default Signup