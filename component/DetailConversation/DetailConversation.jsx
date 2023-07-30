import { useRoute } from "@react-navigation/native";
import React, {
  createRef,
  forwardRef,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableHighlight,
  Button,
  SafeAreaView,
} from "react-native";
import get_message_conversationid from "../../api/message/get_message_conversationid";
import { AuthContext } from "../AuthContainer/AuthContainer";
import Type from "./Type";
import _ from "lodash";
import moment from "moment";
import { SocketContainerContext } from "../SocketContainer/SocketContainer";
import remove_message from "../../api/message/remove_message";
import recall_message from "../../api/message/recall_message";
import { LogBox } from "react-native";
import Icons from "react-native-vector-icons/AntDesign";
import RBSheet from "react-native-raw-bottom-sheet";
// import WaveForm from 'react-native-audiowaveform'
import { Audio } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// import AboutDetailConversation from './AboutDetailConversation'

const DetailConversation = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  const insets = useSafeAreaInsets();
  const { socketState } = useContext(SocketContainerContext);
  const [result, setResult] = useState([]);
  const { data, accessToken } = useContext(AuthContext);
  const route = useRoute();
  const query = {
    page: 1,
    limit: 9,
  };
  useEffect(() => {
    if (accessToken) {
      get_message_conversationid(
        route.params.idConversation,
        setResult,
        accessToken,
        query
      );
    }
  }, [route.params, data]);
  useEffect(() => {
    socketState.on("broadcast_to_all_user_in_room", (data) => {
      setResult((prev) => [...prev, data]);
    });
  }, [socketState]);
  return (
    <View style={{ flex: 1, position: "relative", backgroundColor: "#fff" }}>
      <ContentConversation
        result={result}
        meId={data?._id}
        socketState={socketState}
      />
      <Type />
      <View style={{ height: 60 + insets.bottom }}></View>
    </View>
  );
};

const ContentConversation = (props) => {
  const scrollViewRef = useRef();
  const refBottom = useRef([]);
  const { data, accessToken } = useContext(AuthContext);
  refBottom.current = props?.result.map(
    (element, i) => refBottom.current[i] ?? createRef()
  );
  const renderItem = (data) => {
    return data?.map((item, index, array) => (
      <ComponentMessage
        ref={refBottom.current[index]}
        socketState={props?.socketState}
        idConversation={item?.idConversation}
        key={item?.key}
        {...item}
        keyId={item?.key}
        meId={props?.meId}
        accessToken={accessToken}
        isFirstMessageInChain={
                  index === 0 ||
                  array[index - 1]?.sender?._id !== item?.sender?._id
                }
      />
    ));
  };
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef?.current?.scrollToEnd({ animated: true })
        }
      >
        {/* <FlatList data={_.orderBy(props?.result, o=> moment(o.createdAt).valueOf(), 'asc')} renderItem={({item, index, separators})=> <ComponentMessage ref={refBottom.current[index]} socketState={props?.socketState} key={item?.key} {...item} keyId={item?.key} meId={props?.meId} accessToken={data.accessToken} />} /> */}
        {renderItem(
          _.orderBy(props?.result, (o) => moment(o.createdAt).valueOf(), "asc")
        )}
      </ScrollView>
    </View>
  );
};

export const ComponentMessage = memo(
  forwardRef((props, ref) => {
    const [reValue, setReValue] = useState(undefined);
    const { isFirstMessageInChain } = props;
    const route= useRoute()
    const idConversation= route.params?.idConversation

    useEffect(() => {
      props?.socketState?.on("recall_message_server", (data) => {
        setReValue(data);
        recall_message(props?.keyId, data?.message, props?.accessToken);
      });
      props?.socketState?.on("remove_message_server", (data) => {
        setReValue(data);
        remove_message(props?.keyId, data?.message, props?.accessToken);
      });
    }, [props?.socketState, props?.keyId]);

    const recallMessage = () => {
      props?.socketState?.emit("recall_message", {
        idConversation: route.params?.idConversation,
        kindof: "recall",
        idMessage: props?._id,
        keyId: props?.keyId,
      });
      ref.current.close();
    };

    const removeMessage = () => {
      props?.socketState?.emit("remove_message", {
        idConversation: route.params?.idConversation,
        kindof: "remove",
        idMessage: props?._id,
        keyId: props?.keyId,
      });
      ref.current.close();
    };

    const getFileIcon = (fileExtension) => {
      switch (fileExtension) {
        case "pdf":
          return "pdf-icon"; // Đặt tên biểu tượng PDF tại đây
        case "doc":
        case "docx":
          return "word-icon"; // Đặt tên biểu tượng Word tại đây
        case "xls":
        case "xlsx":
          return "excel-icon"; // Đặt tên biểu tượng Excel tại đây
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
          return "image-icon"; // Đặt tên biểu tượng Image tại đây
        // Thêm các trường hợp khác tương ứng với đuôi của file khác
        default:
          return "file-icon"; // Đặt tên biểu tượng mặc định cho các file không xác định
      }
    };

    const fileExtension = props?.message?.split(".").pop().toLowerCase();
    const fileIcon = getFileIcon(fileExtension);

    return (
      <TouchableHighlight underlayColor={"unset"}>
        <>
          <TouchableHighlight
            underlayColor={"unset"}
            onLongPress={() => ref.current.open()}
          >
            <View
              style={{
                width: "100%",
                padding: 16,
                display: "flex",
                flexDirection:
                  props?.sender?._id === props?.meId ? "row-reverse" : "row",
              }}
            >
              {isFirstMessageInChain ? <Image
                style={{ width: 50, height: 50, borderRadius: 25 }}
                source={{ uri: props?.sender?.profilePicture }}
              /> : <View
                style={{ width: 50, height: 50, borderRadius: 25 }}
              ></View>}
              
              {props?.type_message === "text" && (
                <Text
                  style={{
                    marginLeft: 12,
                    marginRight: 12,
                    fontSize: 18,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor:
                      props?.sender?._id === props?.meId ? "orange" : "#f2f0f5",
                    color: props?.sender?._id === props?.meId ? "#fff" : "#000",
                  }}
                >
                  {props?.message}
                </Text>
              )}
              {props?.type_message === "image" && (
                <Image
                  style={{
                    aspectRatio: 16 / 9,
                    width: "75%",
                    marginLeft: 12,
                    marginRight: 12,
                    borderRadius: 10,
                  }}
                  source={{ uri: props?.message }}
                />
              )}
              {props?.type_message === "like" && (
                <Icons
                  style={{ margin: 12 }}
                  name={"like1"}
                  color={"orange"}
                  size={48}
                />
              )}
              {props?.type_message === "text_to_voice" && (
                <AudioComponent message={props?.message} />
              )}
              {/* Hiển thị biểu tượng file nếu loại tin nhắn là "file" */}
              {props?.type_message === "file" && (
                <Icons
                  style={{ margin: 12 }}
                  name={fileIcon}
                  color={"blue"}
                  size={48}
                />
              )}
            </View>
          </TouchableHighlight>
          <RBSheet height={60} ref={ref}>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: 10,
              }}
            >
              <Text
                onPress={recallMessage}
                style={{ padding: 10, fontSize: 16 }}
              >
                Thu hồi
              </Text>
              <Text
                onPress={removeMessage}
                style={{ padding: 10, fontSize: 16 }}
              >
                Gỡ bỏ
              </Text>
            </View>
          </RBSheet>
        </>
      </TouchableHighlight>
    );
  })
);


const AudioComponent = memo((props) => {
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({ uri: props?.message });
    await sound.playAsync();
  }
  return (
    <>
      <Button title={"Play"} onPress={() => playSound()} />
    </>
  );
});

export default DetailConversation;
