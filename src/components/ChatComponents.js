import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import io from "socket.io-client";
import api_url from "../api/ApiBaseUrl";
let socket;

const ChatComponents = ({ userName }) => {
  const profileData = useSelector((state) => state.profile);

  const chatContainerRef = useRef(null);
  const [inputMsg, setInputMsg] = useState("");
  const [chatData, setChatData] = useState([]);
  // const [chatData, setChatData] = useState([
  //   {
  //     massage: "hello",
  //     sentByMe: false,
  //     time: "10:25",
  //   },
  //   {
  //     massage: "hiii",
  //     sentByMe: true,
  //     time: "10:26",
  //   },
  //   {
  //     massage: "How Are You",
  //     sentByMe: false,
  //     time: "10:27",
  //   },
  //   {
  //     massage: "I am Fine",
  //     sentByMe: true,
  //     time: "10:28",
  //   },
  //   {
  //     massage: "hello",
  //     sentByMe: false,
  //     time: "10:25",
  //   },
  //   {
  //     massage: "hiii",
  //     sentByMe: true,
  //     time: "10:26",
  //   },
  //   {
  //     massage: "How Are You",
  //     sentByMe: false,
  //     time: "10:27",
  //   },
  //   {
  //     massage: "I am Fine",
  //     sentByMe: true,
  //     time: "10:28",
  //   },
  //   {
  //     massage: "hello",
  //     sentByMe: false,
  //     time: "10:25",
  //   },
  //   {
  //     massage: "hiii",
  //     sentByMe: true,
  //     time: "10:26",
  //   },
  //   {
  //     massage: "How Are You",
  //     sentByMe: false,
  //     time: "10:27",
  //   },
  //   {
  //     massage: "I am Fine",
  //     sentByMe: true,
  //     time: "10:28",
  //   },
  //   {
  //     massage: "hello",
  //     sentByMe: false,
  //     time: "10:25",
  //   },
  //   {
  //     massage: "hiii",
  //     sentByMe: true,
  //     time: "10:26",
  //   },
  //   {
  //     massage: "How Are You",
  //     sentByMe: false,
  //     time: "10:27",
  //   },
  //   {
  //     massage: "I am Fine",
  //     sentByMe: true,
  //     time: "10:28",
  //   },
  //   {
  //     massage: "hello",
  //     sentByMe: false,
  //     time: "10:25",
  //   },
  //   {
  //     massage: "hiii",
  //     sentByMe: true,
  //     time: "10:26",
  //   },
  //   {
  //     massage: "How Are You",
  //     sentByMe: false,
  //     time: "10:27",
  //   },
  //   {
  //     massage: "I am Fine",
  //     sentByMe: true,
  //     time: "10:28",
  //   },
  //   {
  //     massage: "hello",
  //     sentByMe: false,
  //     time: "10:25",
  //   },
  //   {
  //     massage: "hiii",
  //     sentByMe: true,
  //     time: "10:26",
  //   },
  //   {
  //     massage: "How Are You",
  //     sentByMe: false,
  //     time: "10:27",
  //   },
  //   {
  //     massage: "I am Fine",
  //     sentByMe: true,
  //     time: "10:28",
  //   },
  //   {
  //     massage: "hello",
  //     sentByMe: false,
  //     time: "10:25",
  //   },
  //   {
  //     massage: "hiii",
  //     sentByMe: true,
  //     time: "10:26",
  //   },
  //   {
  //     massage: "How Are You",
  //     sentByMe: false,
  //     time: "10:27",
  //   },
  //   {
  //     massage: "I am Fine",
  //     sentByMe: true,
  //     time: "10:28",
  //   },
  //   {
  //     massage: "hello",
  //     sentByMe: false,
  //     time: "10:25",
  //   },
  //   {
  //     massage: "hiii",
  //     sentByMe: true,
  //     time: "10:26",
  //   },
  //   {
  //     massage: "How Are You",
  //     sentByMe: false,
  //     time: "10:27",
  //   },
  //   {
  //     massage: "I am Fine",
  //     sentByMe: true,
  //     time: "10:28",
  //   },
  // ]);

  useEffect(() => {
    socket = io(api_url);

    socket.on("connect", () => {
      console.log("Connected to server. Socket ID:", socket.id);
    });
    socket.emit("new-user-joined", profileData.mobileNo);

    socket.on("user-join", (name) => {
      setChatData((p) => [
        ...p,
        {
          massage: `${name} Joined`,
          sentByMe: false,
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
      ]);
    });

    socket.on("receive-msg", (msg) => {
      setChatData((p) => [
        ...p,
        {
          massage: msg,
          sentByMe: false,
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleMsgSent = async () => {
    if (inputMsg !== "") {
      await setChatData((p) => [
        ...p,
        {
          massage: inputMsg,
          sentByMe: true,
          time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
      ]);
      await setInputMsg("");
    }
    socket.emit("send-msg", inputMsg);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div className="chat-name-header">
          <img
            className="chat-user-profile-picture"
            src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
            alt="user Profile Picture"
          />
          <p className="chat-name">{userName}</p>
        </div>
        <div className="chat-massage-container" ref={chatContainerRef}>
          {chatData.map((e, i) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: e.sentByMe ? "right" : "left",
                }}
              >
                <div className="chat-text-div">
                  <div>
                    <p className="chat-msg-text">{e.massage}</p>
                  </div>
                  <p className="chat-text-time">{e.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-msg-main-div">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="type a massage"
          className="chat-msg-input"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleMsgSent();
            }
          }}
        />
        <div
          style={{
            width: "10%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            onClick={handleMsgSent}
            width="50%"
            height="50%"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs></defs>

            <title />

            <g data-name="12-sent" id="_12-sent">
              <polygon
                class="chat-sent-svg-style"
                points="19 31 13 19 1 13 31 1 19 31"
              />

              <line
                class="chat-sent-svg-style"
                x1="13"
                x2="25"
                y1="19"
                y2="7"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatComponents;
