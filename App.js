// import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  Button,
  Platform,
  LogBox,
  PermissionsAndroid
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from "react-native-vector-icons/MaterialIcons";
import Icons2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icons3 from "react-native-vector-icons/FontAwesome5";
import Icons4 from "react-native-vector-icons/Ionicons";
import Chats from "./component/Chats/Chats";
import SocketContainer from "./component/SocketContainer/SocketContainer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./component/Login/Login";
import AuthContainer, {
  AuthContext,
} from "./component/AuthContainer/AuthContainer";
import { useContext, useEffect, useState } from "react";
import Contact from "./component/Contact/Contact";
// import Search from "./component/Search/Search";
import Me from "./component/Me/Me";
import DetailConversation from "./component/DetailConversation/DetailConversation";
import Profile from "./component/Profile/Profile";
import AboutDetailConversation from "./component/DetailConversation/AboutDetailConversation";
import Storage from "./component/Storage/Storage";
import DetailImage from "./component/DetailImage/DetailImage";
import Notifications from "./component/Notification/Notifications";
import * as Linking from "expo-linking";
import PopupDialog, { SlideAnimation } from "react-native-popup-dialog";
import "expo-dev-client";
import PopupUser from "./component/Search/PopupUser";
import { URL_WEB } from "./config";
import Signup from "./component/Signup/Signup";
import search_user_by_phone from "./api/search_user_by_phone";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Tooltip from "react-native-walkthrough-tooltip";
import { StatusBar } from "react-native";
import registerNNPushToken from 'native-notify';
import AsyncStorage from "@react-native-async-storage/async-storage";
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreLogs(["Require cycle:"]);

export default function App() {
  registerNNPushToken(9631, 'ytAdkd1sv2fbpSXRikoSFN');
  return (
    <>
      <StatusBar showHideTransition={"fade"} />
      <SocketContainer>
      <AuthContainer>
        <WrapApp />
      </AuthContainer>
    </SocketContainer>
    </>
  );
}

const WrapApp = () => {
  // const [visibleTooltip, setVisibleTooltip] = useState(false);
  const {auth}= useContext(AuthContext)
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {
          auth=== true &&
          <Stack.Navigator
            initialRouteName={"Tab"}
            screenOptions={{ animation: "slide_from_right", animationDuration: 1}}
          >
            <Stack.Screen
              
              options={({ route, navigation }) => ({
                
                headerLeft: () => (
                  <>
                    <Icons
                      onPress={() => navigation.goBack(-1)}
                      name="close"
                      size={20}
                    />
                  </>
                ),
                headerRight: () => (
                  <>
                    <Icons name={"file-download"} size={20} />
                  </>
                ),
                headerTitle: () => <></>,
                headerBackVisible: false,
              })}
              name={"DetailImage"}
              component={DetailImage}
            />
            <Stack.Screen
              options={({ route, navigation }) => ({
                headerTitle: "Kho lưu trữ",
                headerTitleAlign: "center",
                headerLeft: () => (
                  <TouchableHighlight
                    underlayColor={"unset"}
                    onPress={() => navigation.goBack(-1)}
                  >
                    <View style={{ padding: 10 }}>
                      <Icons
                        name={"arrow-back-ios"}
                        color={"orange"}
                        size={20}
                      />
                    </View>
                  </TouchableHighlight>
                ),
              })}
              name={"Storage"}
              component={Storage}
            />
            <Stack.Screen
              options={{ headerTitle: "Đăng nhập", headerTitleAlign: "center", headerShown: false }}
              name={"Login"}
              component={Login}
            />
            <Stack.Screen
              options={{ headerTitle: "Đăng ký", headerTitleAlign: "center" }}
              name={"Signup"}
              component={Signup}
            />
            <Stack.Screen
              
              options={{
                headerTitle: "Đoạn chat",
                headerTitleAlign: "center",
                headerLeft: () => <></>,
                headerShown: false,
              }}
              name={"Tab"}
              component={TabNavigationContainer}
            />
            <Stack.Screen
              options={({ route, navigation }) => ({
                headerStyle: { height: 100 },
                headerTitleStyle: {
                  height: 100,
                  maxWidth: 250,
                },
                headerTitleAlign: "left",
                headerTitle: () => {
                  if (Platform.OS === "ios") {
                    return <></>;
                  }
                  if (Platform.OS === "android") {
                    return (
                      <TouchableHighlight
                        onPress={() =>
                          navigation.navigate("AboutDetailConversation", {
                            idConversation: route.params?.idConversation,
                            ...route.params,
                          })
                        }
                        underlayColor={"unset"}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            padding: 10,
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "row",
                              padding: 10,
                            }}
                          >
                            <Image
                              style={{ width: 50, height: 50, borderRadius: 25 }}
                              source={{ uri: route.params?.imageGroup }}
                            />
                            <Text style={{ fontSize: 18, marginLeft: 12 }}>
                              {route.params?.labelGroup}
                            </Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    );
                  }
                },
                headerLeft: () => (
                  <TouchableHighlight
                    underlayColor={"unset"}
                    onPress={() => navigation.goBack(-1)}
                  >
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <View style={{ padding: 10 }}>
                        <Icons
                          name={"arrow-back-ios"}
                          color={"orange"}
                          size={20}
                        />
                      </View>
                      {/* ios new here */}
                      {Platform.OS === "ios" && (
                        <TouchableHighlight
                          onPress={() =>
                            navigation.navigate("AboutDetailConversation", {
                              idConversation: route.params?.idConversation,
                              ...route.params,
                            })
                          }
                          underlayColor={"unset"}
                        >
                          <View
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                              }}
                            >
                              <Image
                                style={{
                                  width: 36,
                                  height: 36,
                                  borderRadius: 18,
                                }}
                                source={{ uri: route.params?.imageGroup }}
                              />
                              <Text
                                lineBreakMode="tail"
                                numberOfLines={1}
                                style={{
                                  flex: 1,
                                  fontSize: 18,
                                  marginLeft: 12,
                                  maxWidth: 150,
                                }}
                              >
                                {route.params?.labelGroup}
                              </Text>
                            </View>
                          </View>
                        </TouchableHighlight>
                      )}
                    </View>
                  </TouchableHighlight>
                ),
                // headerRight: () => (
                //   <View
                //     style={{
                //       display: "flex",
                //       justifyContent: "center",
                //       alignItems: "center",
                //       flexDirection: "row",
                //     }}
                //   >
                //     {/* <Icons name={"call"} size={32} color={"#2e89ff"} /> */}
                //     <Tooltip
                //       isVisible={visibleTooltip}
                //       content={<Text>Video call</Text>}
                //       placement="left"
                //       onClose={() => setVisibleTooltip(false)}
                //     >
                //       <TouchableHighlight
                //         style={{
                //           padding: Platform.OS === "ios" ? 0 : 10,
                //           marginLeft: 18,
                //         }}
                //       >
                //         <Icons3
                //           onLongPress={()=> setVisibleTooltip(true)}
                //           onPress={() =>
                //             Linking.openURL(
                //               URL_WEB + "/call" + "/" + route.params?.idConversation
                //             )
                //           }
                //           name={"video"}
                //           size={32}
                //           color={"#2e89ff"}
                //         />
                //       </TouchableHighlight>
                //     </Tooltip>
                //   </View>
                // )
                                
                headerBackVisible: false,
              })}
              name={"DetailConversation"}
              component={DetailConversation}
            />
            <Stack.Screen
              options={({ route }) => ({
                headerTitle: route.params?.username || "",
                headerTitleAlign: "center",
              })}
              name={"Profile"}
              component={Profile}
            />
            <Stack.Screen
              options={({ route, navigation }) => ({
                headerTitle: () => <></>,
                headerBackVisible: false,
                headerLeft: () => (
                  <TouchableHighlight
                    underlayColor={"unset"}
                    onPress={() => navigation.goBack(-1)}
                  >
                    <View style={{ padding: 10 }}>
                      <Icons
                        name={"arrow-back-ios"}
                        color={"orange"}
                        size={20}
                      />
                    </View>
                  </TouchableHighlight>
                ),
              })}
              name={"AboutDetailConversation"}
              component={AboutDetailConversation}
            />
          </Stack.Navigator>
        }
        {
          auth=== false && <Stack.Navigator
          initialRouteName={"Login"}
          screenOptions={{ animation: "slide_from_right", animationDuration: 1}}
        >
          <Stack.Screen
            
            options={({ route, navigation }) => ({
              
              headerLeft: () => (
                <>
                  <Icons
                    onPress={() => navigation.goBack(-1)}
                    name="close"
                    size={20}
                  />
                </>
              ),
              headerRight: () => (
                <>
                  <Icons name={"file-download"} size={20} />
                </>
              ),
              headerTitle: () => <></>,
              headerBackVisible: false,
            })}
            name={"DetailImage"}
            component={DetailImage}
          />
          <Stack.Screen
            options={({ route, navigation }) => ({
              headerTitle: "Kho lưu trữ",
              headerTitleAlign: "center",
              headerLeft: () => (
                <TouchableHighlight
                  underlayColor={"unset"}
                  onPress={() => navigation.goBack(-1)}
                >
                  <View style={{ padding: 10 }}>
                    <Icons
                      name={"arrow-back-ios"}
                      color={"orange"}
                      size={20}
                    />
                  </View>
                </TouchableHighlight>
              ),
            })}
            name={"Storage"}
            component={Storage}
          />
          <Stack.Screen
            options={{ headerTitle: "Đăng nhập", headerTitleAlign: "center", headerShown: false }}
            name={"Login"}
            component={Login}
          />
          <Stack.Screen
            options={{ headerTitle: "Đăng ký", headerTitleAlign: "center" }}
            name={"Signup"}
            component={Signup}
          />
          <Stack.Screen
            
            options={{
              headerTitle: "Đoạn chat",
              headerTitleAlign: "center",
              headerLeft: () => <></>,
              headerShown: false,
            }}
            name={"Tab"}
            component={TabNavigationContainer}
          />
          <Stack.Screen
            options={({ route, navigation }) => ({
              headerStyle: { height: 100 },
              headerTitleStyle: {
                height: 100,
                maxWidth: 250,
              },
              headerTitleAlign: "left",
              headerTitle: () => {
                if (Platform.OS === "ios") {
                  return <></>;
                }
                if (Platform.OS === "android") {
                  return (
                    <TouchableHighlight
                      onPress={() =>
                        navigation.navigate("AboutDetailConversation", {
                          idConversation: route.params?.idConversation,
                          ...route.params,
                        })
                      }
                      underlayColor={"unset"}
                    >
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          padding: 10,
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            padding: 10,
                          }}
                        >
                          <Image
                            style={{ width: 50, height: 50, borderRadius: 25 }}
                            source={{ uri: route.params?.imageGroup }}
                          />
                          <Text style={{ fontSize: 18, marginLeft: 12 }}>
                            {route.params?.labelGroup}
                          </Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  );
                }
              },
              headerLeft: () => (
                <TouchableHighlight
                  underlayColor={"unset"}
                  onPress={() => navigation.goBack(-1)}
                >
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ padding: 10 }}>
                      <Icons
                        name={"arrow-back-ios"}
                        color={"orange"}
                        size={20}
                      />
                    </View>
                    {/* ios new here */}
                    {Platform.OS === "ios" && (
                      <TouchableHighlight
                        onPress={() =>
                          navigation.navigate("AboutDetailConversation", {
                            idConversation: route.params?.idConversation,
                            ...route.params,
                          })
                        }
                        underlayColor={"unset"}
                      >
                        <View
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            <Image
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 18,
                              }}
                              source={{ uri: route.params?.imageGroup }}
                            />
                            <Text
                              lineBreakMode="tail"
                              numberOfLines={1}
                              style={{
                                flex: 1,
                                fontSize: 18,
                                marginLeft: 12,
                                maxWidth: 150,
                              }}
                            >
                              {route.params?.labelGroup}
                            </Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    )}
                  </View>
                </TouchableHighlight>
              ),
              // headerRight: () => (
              //   <View
              //     style={{
              //       display: "flex",
              //       justifyContent: "center",
              //       alignItems: "center",
              //       flexDirection: "row",
              //     }}
              //   >
              //     {/* <Icons name={"call"} size={32} color={"#2e89ff"} /> */}
              //     <Tooltip
              //       isVisible={visibleTooltip}
              //       content={<Text>Video call</Text>}
              //       placement="left"
              //       onClose={() => setVisibleTooltip(false)}
              //     >
              //       <TouchableHighlight
              //         style={{
              //           padding: Platform.OS === "ios" ? 0 : 10,
              //           marginLeft: 18,
              //         }}
              //       >
              //         <Icons3
              //           onLongPress={()=> setVisibleTooltip(true)}
              //           onPress={() =>
              //             Linking.openURL(
              //               URL_WEB + "/call" + "/" + route.params?.idConversation
              //             )
              //           }
              //           name={"video"}
              //           size={32}
              //           color={"#2e89ff"}
              //         />
              //       </TouchableHighlight>
              //     </Tooltip>
              //   </View>
              // )
                              
              headerBackVisible: false,
            })}
            name={"DetailConversation"}
            component={DetailConversation}
          />
          <Stack.Screen
            options={({ route }) => ({
              headerTitle: route.params?.username || "",
              headerTitleAlign: "center",
            })}
            name={"Profile"}
            component={Profile}
          />
          <Stack.Screen
            options={({ route, navigation }) => ({
              headerTitle: () => <></>,
              headerBackVisible: false,
              headerLeft: () => (
                <TouchableHighlight
                  underlayColor={"unset"}
                  onPress={() => navigation.goBack(-1)}
                >
                  <View style={{ padding: 10 }}>
                    <Icons
                      name={"arrow-back-ios"}
                      color={"orange"}
                      size={20}
                    />
                  </View>
                </TouchableHighlight>
              ),
            })}
            name={"AboutDetailConversation"}
            component={AboutDetailConversation}
          />
        </Stack.Navigator>
        }
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const TabNavigationContainer = () => {
  const { data } = useContext(AuthContext);
  const [newChat, setNewChat] = useState(false);
  const [newFriend, setNewFriend] = useState(false);
  const [isExistUser, setIsExistUser] = useState(false);
  const [newGroup, setNewGroup] = useState(false);
  const [isNotExistUser, setIsNotExistUser] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dataUser, setDataUser] = useState();
  const closeNewChat = () => {
    setNewChat(false);
  };
  const closeNewFriend = () => {
    setPhoneNumber("");
    setNewFriend(false);
  };
  const closeNewGroup = () => {
    setNewGroup(false);
  };
  return (
    <>
      <Tab.Navigator
        initialRouteName={"Chats"}
        
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: 60
          },
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Chats") {
              if (focused === true) {
                return <>
                  <Icons2 name={"chat"} size={24} color={"orange"} />
                  <Text style={{color: "orange"}}>Chat</Text>
                </>;
              } else {
                return <>
                  <Icons2 name={"chat"} size={24} color={"#000"} />
                  <Text style={{color: "#000"}}>Chat</Text>
                </>;
              }
            } else if (route.name === "Contact") {
              if (focused === true) {
                return (
                  <>
                    <Icons3 name={"user-friends"} size={24} color={"orange"} />
                    <Text style={{color: "orange"}}>Liên hệ</Text>
                  </>
                );
              } else {
                return (
                  <>
                    <Icons3 name={"user-friends"} size={24} color={"#000"} />
                    <Text style={{color: "#000"}}>Liên hệ</Text>
                  </>
                );
              }
            }
            // else if(route.name=== "Search") {
            //   if(focused=== true) {
            //     return <Icons name={"search"} size={24} color={"orange"} />
            //   }
            //   else {
            //     return <Icons name={"search"} size={24} color={"#000"} />
            //   }
            // }
            else if (route.name === "Notifications") {
              if (focused === true) {
                return (
                  <>
                    <Icons name={"notifications"} size={24} color={"orange"} />
                    <Text style={{color: "orange"}}>Thông báo</Text>
                  </>
                );
              } else {
                return (
                  <>
                    <Icons name={"notifications"} size={24} color={"#000"} />
                    <Text style={{color: "#000"}}>Thông báo</Text>
                  </>
                );
              }
            } else if (route.name === "Me") {
              if (focused === true) {
                return (
                  <View
                    style={{
                      padding: 5,
                      borderRadius: 100,
                      backgroundColor: "orange",
                    }}
                  >
                    <Image
                      style={{ width: 26, height: 26, borderRadius: 13 }}
                      source={{ uri: `${data?.profilePicture}` }}
                    />
                  </View>
                );
              } else {
                return (
                  <Image
                    style={{ width: 26, height: 26, borderRadius: 13 }}
                    source={{ uri: `${data?.profilePicture}` }}
                  />
                );
              }
            }
          },
        })}
      >
        <Tab.Screen
          name={"Chats"}
          component={Chats}
          options={{
            tabBarLabel: () => null,
            headerTitle: () => (
              <Text style={{ fontSize: 18, fontWeight: "600" }}>Đoạn Chat</Text>
            ),
            headerTitleAlign: "center",
            headerRight: () => (
              <Text
                onPress={() => {
                  setNewChat(true);
                }}
                style={{ marginRight: 10 }}
              >
                <Icons4 name={"create-outline"} size={24} />
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name={"Contact"}
          component={Contact}
          options={{
            tabBarLabel: () => null,
            headerTitle: "Liên hệ",
            headerTitleAlign: "center",
          }}
        />
        {/* <Tab.Screen name={"Search"} component={Search} options={{tabBarLabel: ()=> null,headerTitle: "Tìm kiếm", headerTitleAlign: "center"}} /> */}
        {/* <Tab.Screen
          options={{
            tabBarLabel: () => null,
            headerTitle: "Thông báo",
            headerTitleAlign: "center",
          }}
          name={"Notifications"}
          component={Notifications}
        /> */}
        <Tab.Screen
          options={{
            tabBarLabel: () => null,
            headerTitle: "Cá nhân",
            headerTitleAlign: "center",
          }}
          name={"Me"}
          component={Me}
        />
      </Tab.Navigator>
      <PopupDialog
        width={0.5}
        visible={newChat}
        onTouchOutside={() => closeNewChat()}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableHighlight
            onPress={() => setNewFriend(() => true)}
            underlayColor={"unset"}
          >
            <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 17 }}>
              Tạo liên hệ mới
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => setNewGroup(() => true)}
            underlayColor={"unset"}
          >
            <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 17 }}>
              Tạo nhóm mới
            </Text>
          </TouchableHighlight>
        </View>
      </PopupDialog>
      {/*  */}

      {/* Find */}
      <PopupDialog
        width={0.8}
        visible={newFriend}
        onTouchOutside={() => closeNewFriend()}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      >
        <View style={{ padding: 5 }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              fontWegight: "600",
              color: "#000",
              marginBottom: 12,
            }}
          >
            Thêm bạn
          </Text>
          <Text style={{ marginBottom: 12, fontSize: 17 }}>
            Tìm bằng số điện thoại
          </Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={{
              width: "100%",
              height: 40,
              borderRadius: 10,
              backgroundColor: "#e7e7e7",
              fontSize: 16,
              padding: 10,
            }}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onPress={() => setNewFriend(false)}
                color={"#555"}
                title={"Huỷ"}
              />
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 12,
                marginLeft: 12,
              }}
            >
              <Button
                onPress={async () => {
                  const result = await search_user_by_phone(
                    phoneNumber,
                    data?.accessToken
                  );
                  if (result?.exist === false) {
                    closeNewFriend();
                    setIsNotExistUser(true);
                  } else {
                    setDataUser(result);
                    closeNewFriend();
                    setIsExistUser(true);
                  }
                }}
                title={"Xác nhận"}
              />
            </View>
          </View>
        </View>
      </PopupDialog>
      {/*  */}

      <PopupDialog
        width={0.8}
        visible={isNotExistUser}
        onTouchOutside={() => setIsNotExistUser(false)}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      >
        <View style={{ padding: 5 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Không tìm thấy người dùng
          </Text>
          <Button title={"Đóng"} onPress={() => setIsNotExistUser(false)}>
            Đóng
          </Button>
        </View>
      </PopupDialog>

      {/* Find out user */}
      <PopupUser
        isExistUser={isExistUser}
        setIsExistUser={setIsExistUser}
        dataUser={dataUser}
        data={data}
      />

      <PopupDialog
        width={0.5}
        visible={newGroup}
        onTouchOutside={() => closeNewGroup()}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
      ></PopupDialog>
    </>
  );
};
