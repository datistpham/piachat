import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Image,
  Text,
  View,
  Switch,
  Button,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { AuthContext } from "../AuthContainer/AuthContainer";
import ActionSheet from "react-native-actions-sheet";
import Icons from "react-native-vector-icons/MaterialIcons";
import * as DocumentPicker from "expo-document-picker";
import upload_image from "../../api/upload_image";
import update_info_user from "../../api/update_info_user";
import { Snackbar } from "react-native-paper";
import deaf_user from "../../api/user/deaf_user";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native";

const Me = () => {
  const insets= useSafeAreaInsets()
  const isFocused = useIsFocused();
  const actionSheetRef = useRef(null);
  const { data, setAuth, setData, data2, setData2, logout, accessToken } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    deaf_user(!isEnabled, data2?._id, accessToken);
    setData2((prev) => ({ ...prev, isDeaf: !isEnabled }));
  };
  const [resultImage, setResultImage] = useState();
  const [profilePicture, setProfilePicture] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const toggleGender = () => setGender((previousState) => !previousState);

  const [username, setUsername] = useState("");
  useEffect(() => {
    setProfilePicture(() => data2?.profilePicture);

    setGender(() => data2?.gender);
    setUsername(() => data2?.username);
    setIsEnabled(() => data2?.isDeaf);
    setAddress(() => data2?.address);
  }, [data2, isFocused]);
  const chooseImageFunction = () => {
    DocumentPicker.getDocumentAsync()
      .then(async (res) => {
        // const fileUri= res.uri
        const formData = new FormData();
        formData.append("image", { ...res, type: "image/jpeg" });
        const result = await upload_image(formData);
        setResultImage(result);
        // console.log(result?.secure_url)
        // const result1= await update_info_user(data2?._id, username, gender, result?.secure_url, data?.accessToken)
        setData2((prev) => ({ ...prev, profilePicture: result.secure_url }));
        setData((prev) => ({ ...prev, profilePicture: result.secure_url }));
        setVisible(() => true);
      })
      .catch((err) => setResultImage(err));
  };
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);
  return (
    <ScrollView>
      <View style={{ width: "100%" }}>
        <Image
          style={{ width: "100%", aspectRatio: 5 / 2 }}
          source={{
            uri: data2?.coverPicture || "https://cover-talk.zadn.vn/default",
          }}
        />
      </View>
      <View
        style={{
          width: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ position: "relative", top: -60 }}>
          <Image
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              marginBottom: 12,
            }}
            source={{ uri: data2?.profilePicture }}
          />
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            {data2?.username}
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", padding: 10 }}>
        <View
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 10,
          }}
        >
          <Text style={{ marginBottom: 12, fontSize: 18, fontWeight: "600" }}>
            Thông tin cá nhân
          </Text>
          <Text style={{ marginBottom: 12, fontSize: 18 }}>
            Điện thoại: {data2?.phoneNumber}
          </Text>
          <Text style={{ marginBottom: 24, fontSize: 18 }}>
            Giới tính: {data2?.gender === true ? "Nam" : "Nữ"}
          </Text>
          <View style={{ width: "100%", marginBottom: 24 }}>
            <Button
              color={"orange"}
              title={"Cập nhật thông tin"}
              onPress={() => actionSheetRef.current?.show()}
            />
          </View>
          <View style={{ width: "100%", marginBottom: 12 }}>
            <Button
              color={"#f00"}
              title={"Đăng xuất"}
              onPress={() => {
                setAuth(() => false);
                logout()
                navigation.navigate("Login");
              }}
            />
          </View>
        </View>
        {/* popup edit user */}
      </View>
      <SafeAreaView>
        <ActionSheet ref={actionSheetRef}>
          <View style={{ height: "100%", marginTop: insets.top }}>
            <View
              style={{
                marginBottom: 12,
                padding: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
              }}
            >
              <View>
                <Text style={{ opacity: 0, padding: 10 }}>Xong</Text>
              </View>
              <TouchableHighlight
                underlayColor={"unset"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    height: 5,
                    width: 60,
                    borderRadius: 5,
                    backgroundColor: "#d9d9d9",
                    textAlign: "center",
                  }}
                ></Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={"unset"}
                onPress={() => actionSheetRef.current?.hide()}
              >
                <Text style={{ padding: 10 }}>Đóng</Text>
              </TouchableHighlight>
            </View>
            <View style={{ width: "100%" }}>
              <View style={{ width: "100%" }}>
                <Image
                  style={{ width: "100%", aspectRatio: 5 / 2 }}
                  source={{ uri: "https://cover-talk.zadn.vn/default" }}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ position: "relative", top: -60 }}>
                  <View style={{ position: "relative" }}>
                    <Image
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        marginBottom: 12,
                      }}
                      source={{ uri: data?.profilePicture }}
                    />
                    <Icons
                      onPress={chooseImageFunction}
                      style={{ position: "absolute", right: 5, bottom: 5 }}
                      name={"camera-alt"}
                      size={32}
                    />
                  </View>
                  <Text style={{ fontSize: 18, textAlign: "center" }}>
                    {data2?.username}
                  </Text>
                </View>
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 17, marginBottom: 12 }}>
                  Tên người dùng
                </Text>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  style={{
                    width: "100%",
                    height: 40,
                    borderColor: "orange",
                    backgroundColor: "#f2f0f5",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 10,
                    padding: 10,
                    fontSize: 17,
                    marginBottom: 18,
                  }}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}
                >
                  Thông tin cá nhân
                </Text>
                <Text>Giới tính</Text>
                <View
                  style={{
                    marginBottom: 12,
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ marginRight: 12 }}>Nữ</Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={gender ? "#fff" : "#f4f3f4"}
                    onValueChange={toggleGender}
                    value={gender}
                  />
                  <Text style={{ marginLeft: 12 }}>Nam</Text>
                </View>
                <KeyboardAvoidingView behavior={"padding"}>
                  <>
                    <Text style={{ fontSize: 17, marginBottom: 12 }}>
                      Địa chỉ
                    </Text>
                    <TextInput
                      value={address}
                      onChangeText={setAddress}
                      style={{
                        width: "100%",
                        height: 40,
                        borderColor: "orange",
                        backgroundColor: "#f2f0f5",
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderRadius: 10,
                        padding: 10,
                        fontSize: 17,
                        marginBottom: 18,
                      }}
                    />
                  </>
                </KeyboardAvoidingView>
                <Button
                  color={"orange"}
                  title={"Lưu"}
                  onPress={() =>
                    update_info_user(
                      data?._id,
                      username,
                      profilePicture,
                      gender,
                      false
                    )
                  }
                />
                <View style={{ marginTop: 12 }}>
                  <Button
                    color={"#555"}
                    title={"Đóng"}
                    onPress={() => actionSheetRef.current?.hide()}
                  />
                </View>
              </View>
            </View>
            <Snackbar
              visible={visible}
              duration={2000}
              onDismiss={onDismissSnackBar}
              action={{
                label: "Close",
                onPress: () => onDismissSnackBar,
              }}
            >
              Cập nhật thông tin thành công
            </Snackbar>
          </View>
        </ActionSheet>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Me;
