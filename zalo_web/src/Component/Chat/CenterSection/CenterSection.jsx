import "./style.sass";
import Cookies from "js-cookie";
import _ from "lodash";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { IoIosRemoveCircle } from "react-icons/io";
import { SocketContainerContext } from "../../../SocketContainer/SocketContainer";
import recall_message from "../../../api/message/recall_message";
import remove_message from "../../../api/message/remove_message";
import { useEffect, useContext, memo, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  AiFillLike,
  AiOutlineFileZip,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";
import React from "react";
import {
  AiOutlineFilePdf,
  AiOutlineFileExcel,
  AiOutlineFileText,
  AiOutlineFileImage,
} from "react-icons/ai";

const ContentConversation = (props) => {
  const { idConversation } = useParams();
  const { socketState } = useContext(SocketContainerContext);

  return (
    <div
      className={"fjkdjskjfksjdaswawsa"}
      style={{ width: "100%", height: "calc(100% - 60px - 68px" }}
    >
      <div
        id="main-chat-scroll-to-bottom"
        className={"fjkdjsijaskldjakjdsk"}
        style={{ width: "100%", height: "100%", overflow: "auto", padding: 5 }}
      >
        <ScrollToBottom className={"fjkdjsijaskldjakjdsk"} mode="bottom">
          {_.orderBy(
            props?.listMessage,
            (o) => moment(o.createdAt).valueOf(),
            "asc"
          )
            ?.filter((item) => item.roomId === idConversation)
            ?.map((item, index, array) => (
              <ComponentMessage
                socketState={socketState}
                key={item?.key}
                {...item}
                keyId={item?.key}
                idConversation={idConversation}
                isFirstMessageInChain={
                  index === 0 ||
                  array[index - 1]?.sender?._id !== item?.sender?._id
                }
              />
            ))}
          <div
            className="_3ybTi_as"
            name="main-chat"
            style={{ position: "relative" }}
          ></div>
        </ScrollToBottom>
      </div>
    </div>
  );
};

const ComponentMessage = (props) => {
  const { idConversation, isFirstMessageInChain } = props;
  const [open, setOpen] = useState(false);
  const [reValue, setReValue] = useState(undefined);

  useEffect(() => {
    props?.socketState?.on("recall_message_server", (data) => {
      if (props?.keyId === data?.keyId) {
        setReValue(data);
        recall_message(props?.keyId, data?.message);
      }
    });
    props?.socketState?.on("remove_message_server", (data) => {
      if (props?.keyId === data?.keyId) {
        setReValue(data);
        remove_message(props?.keyId, data?.message);
      }
    });
     // eslint-disable-next-line
  }, [props?.keyId]);

  const recallMessage = () => {
    props?.socketState?.emit("recall_message", {
      idConversation: idConversation,
      kindof: "recall",
      idMessage: props?._id,
      keyId: props?.keyId,
    });
  };

  const removeMessage = () => {
    props?.socketState?.emit("remove_message", {
      idConversation: idConversation,
      kindof: "remove",
      idMessage: props?._id,
      keyId: props?.keyId,
    });
    props?.socketState?.on("remove_message_server", (data) => {
      setReValue(data);
      remove_message(props?.keyId, data?.message);
    });
  };

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`fjdhsjkfhjdkahsjassa ${
        props?.sender?._id === Cookies.get("uid")
          ? "fjkdjjkdhjfdasdjkhsa"
          : "djskdhjfhsjdahsja"
      }`}
    >
      <div className={"dfkdsdhsjkfhjkhdadss"} style={{ position: "relative" }}>
        {isFirstMessageInChain ? <Avatar {...props} /> : <NoAvatar />}
        <Text {...props} setOpen={setOpen} reValue={reValue} />
        {props?.sender?._id === Cookies.get("uid") && (
          <div style={{ position: "relative" }}>
            {open === true &&
              props?.status_message !== 2 &&
              props?.status_message !== 3 && (
                <OptionComponentMessage
                  recallMessage={recallMessage}
                  removeMessage={removeMessage}
                  sender={props?.sender?._id}
                  me={Cookies.get("uid")}
                />
              )}
          </div>
        )}
      </div>
    </div>
  );
};

const OptionComponentMessage = (props) => {
  if (props?.sender === props?.me) {
    return (
      <div
        className={"fdkdjskjfkgsdA"}
        style={{
          alignSelf: "center",
          background: "#f2f0f5",
          borderRadius: 5,
          padding: 10,
          gap: 10,
          display: "flex",
          justifyContent: " center",
          alignItems: "center",
          position: "absolute",
          right: "100%",
          top: "50%",
          transform: "translate(-50%, 0)",
        }}
      >
        <div
          onClick={props?.recallMessage}
          title={"Thu hồi"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <IoIosRemoveCircle style={{ width: 18, height: 18 }} />
        </div>
        <div
          onClick={props?.removeMessage}
          title={"Gỡ bỏ"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <MdDelete style={{ width: 18, height: 18 }} />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={"fdkdjskjfkgsdA"}
        style={{
          alignSelf: "center",
          background: "#f2f0f5",
          borderRadius: 5,
          padding: 10,
          gap: 10,
          display: "flex",
          justifyContent: " center",
          alignItems: "center",
          position: "absolute",
          left: "100%",
          top: "50%",
          transform: "translate(50%, 0)",
        }}
      >
        <div
          onClick={props?.recallMessage}
          title={"Thu hồi"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <IoIosRemoveCircle style={{ width: 18, height: 18 }} />
        </div>
        <div
          onClick={props?.removeMessage}
          title={"Gỡ bỏ"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <MdDelete style={{ width: 18, height: 18 }} />
        </div>
      </div>
    );
  }
};

const Avatar = (props) => {
  return (
    <div
      className={"fdjfskjfdkjdkasjkssa"}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={
          props?.sender?.profilePicture ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        alt=""
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

const NoAvatar = (props) => {
    return (
      <div
        className={"fdjfskjfdkjdkasjkssa"}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            objectFit: "cover",
            opacity: 0
          }}
        ></div>
      </div>
    );
  };
 // eslint-disable-next-line
const getFileType = (fileName) => {
  const index = fileName.indexOf("?");
  const fileType = index !== -1 ? fileName.substring(0, index) : fileName;

  const extension = fileType
    .substring(fileType.lastIndexOf(".") + 1)
    .toLowerCase();
  if (["pdf"].includes(extension)) {
    return "pdf";
  } else if (["xls", "xlsx"].includes(extension)) {
    return "excel";
  } else if (["png", "jpg", "jpeg", "gif"].includes(extension)) {
    return "image";
  } else {
    return "text";
  }
};

const getFileIcon = (fileName) => {
  // Lấy phần đầu của fileName trước khi xử lý
  const index = fileName.indexOf("?");
  const fileType = index !== -1 ? fileName.substring(0, index) : fileName;

  const fileExtension = fileType
    .substring(fileType.lastIndexOf(".") + 1)
    .toLowerCase();

  const iconSize = 24;
  const commonIconStyle = { fontSize: iconSize, marginRight: 8 };

  switch (fileExtension) {
    case "pdf":
      return (
        <AiOutlineFilePdf style={{ ...commonIconStyle, color: "#ff4500" }} />
      );
    case "xlsx":
    case "xls":
      return (
        <AiOutlineFileExcel style={{ ...commonIconStyle, color: "#008000" }} />
      );
    case "jpg":
    case "jpeg":
    case "png":
      return (
        <AiOutlineFileImage style={{ ...commonIconStyle, color: "#4169e1" }} />
      );
    case "zip":
    case "rar":
    case "7z":
      return (
        <AiOutlineFileZip style={{ ...commonIconStyle, color: "#800080" }} />
      );
    case "mp4":
    case "avi":
    case "mkv":
      return (
        <AiOutlinePlayCircle style={{ ...commonIconStyle, color: "#ff1493" }} />
      );
    default:
      return (
        <AiOutlineFileText style={{ ...commonIconStyle, color: "#000000" }} />
      );
  }
};

const Text = (props) => {
  const isSentByMe = props?.sender?._id === Cookies.get("uid");
  //   const fileType = getFileType(props?.message);

  return (
    <div
      className={`fjkdjskfhjkdsajkaas ${
        isSentByMe ? "sjfshjkaljsaasasarseas" : "ayuehajkshakjfhdasas"
      }`}
    >
      {props?.reValue && props?.keyId === props?.reValue?.keyId ? (
        <div
          className={"orange"}
          style={{ maxWidth: "100%", wordBreak: "break-word" }}
        >
          {props?.reValue?.message}
        </div>
      ) : (
        <>
          {props?.type_message === "text" && (
            <div
              className={"orange"}
              style={{ maxWidth: "100%", wordBreak: "break-word" }}
            >
              {props?.message}
            </div>
          )}
          {props?.type_message === "image" && (
            <Link to={"/media/" + props?.keyId} state={{ from: true }}>
              <div
                style={{
                  aspectRatio: "none",
                  borderRadius: 5,
                  overflow: "hidden",
                }}
              >
                <img
                  alt={""}
                  src={props?.message}
                  className={"orange"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </Link>
          )}

          {props?.type_message === "file" && (
            <a
              style={{ textDecoration: "none" }}
              rel="noreferrer"
              target={"_blank"}
              href={props?.message}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                  textDecoration: "underline",
                }}
              >
                {getFileIcon(props?.message)} {/* Thêm biểu tượng tương ứng */}
                <div style={{ marginLeft: 5, wordBreak: "break-all" }}>
                  {props?.name_file}
                </div>
              </div>
            </a>
          )}
          {props?.type_message === "audio" && (
            <audio src={props?.message} controls={true}></audio>
          )}
          {props?.type_message === "like" && (
            <AiFillLike size={100} color={"#2e89ff"} />
          )}
          {props?.type_message === "text_to_voice" && (
            <CompoentViewTextToVoice {...props} />
          )}
        </>
      )}
    </div>
  );
};

const CompoentViewTextToVoice = (props) => {
  const refAudio = useRef();
  const [autoplay, setAutoplay] = useState(props?.autoplaying);
  useEffect(() => {
    setAutoplay(() => props?.autoplaying);
  }, [props?.autoplaying]);

  useEffect(() => {
    if (autoplay === 0 && props?.sender?._id !== Cookies.get("uid")) {
      const timeout = setTimeout(() => {
        refAudio.current.play();
      }, 1000);
      const timeout2 = setTimeout(() => {
        setAutoplay(() => 1);
      }, 1000);
      return () => {
        clearTimeout(timeout);
        clearTimeout(timeout2);
      };
    }
  }, []);
  return (
    <>
      <div
        onClick={() => refAudio.current.play()}
        className={"yhsihdukhdkshdasas"}
        style={{
          maxWidth: "100%",
          wordBreak: "break-word",
          background: "#ffb300",
          padding: 5,
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        {props?.extend_text}
      </div>
      <audio ref={refAudio} controls={false} src={props?.message} />
    </>
  );
};

export default memo(ContentConversation);