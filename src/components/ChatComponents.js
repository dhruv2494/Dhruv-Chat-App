import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import io from "socket.io-client";
import api_url from "../api/ApiBaseUrl";
import { post } from "../api/Api";
let socket;

const ChatComponents = ({ otherUserInfo }) => {
  const profileData = useSelector((state) => state.profile);
  console.log(profileData);
  const chatContainerRef = useRef(null);
  const [inputMsg, setInputMsg] = useState("");
  const [chatData, setChatData] = useState([]);

  const [userRoom, setUserRoom] = useState("");

  useEffect(() => {
    const findRoom = async () => {
      {
        profileData &&
          post("chat/find-chat", {
            mobile1: profileData?.mobile,
            mobile2: otherUserInfo?.mobile,
          })
            .then((e) => {
              const response = e.data.roomData;
              setUserRoom(response.room);
              setChatData(
                response.chat.map((e, i) => ({
                  massage: e.massage,
                  sentByMe: e.sender === profileData.mobile,
                  time: e.timestamp,
                }))
              );
            })
            .catch((e) => console.log(e));
      }
    };
    findRoom();
  }, [otherUserInfo, profileData]);

  useEffect(() => {
    if (userRoom && userRoom !== "") {
      socket = io(api_url);

      socket.on("connect", () => {
        console.log("Connected to server. Socket ID:", socket.id);
      });
      socket.emit("new-user-joined", profileData.mobile);

      socket.emit("join-room", userRoom);

      socket.on("receive-msg", (msg) => {
        console.log("recive", msg);
        setChatData((p) => [
          ...p,
          {
            massage: msg.massage,
            sentByMe: msg.sender === profileData.mobile,
            time: msg.timestamp,
          },
        ]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [userRoom]);

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
      socket.emit("send-msg", {
        room: userRoom,
        data: {
          massage: inputMsg,
          sender: profileData.mobile,
          timestamp: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
      });
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
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
          <p className="chat-name">{otherUserInfo?.name}</p>
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
