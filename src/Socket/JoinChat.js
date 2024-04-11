import React, { useEffect, useState } from "react";
import io from "socket.io-client";
let socket;

const JoinChat = () => {
  const [msgInput, setMsgInput] = useState("");
  const [msgData, setMsgData] = useState([]);

  // useEffect(() => {
  //   socket = io("http://192.168.1.100:4000");
  //   const uName = prompt("Enter Your Name");

  //   socket.on("connect", () => {
  //     console.log("Connected to server. Socket ID:", socket.id);
  //   });
  //   socket.emit("new-user-joined", uName);

  //   socket.on("user-join", (name) => {
  //     setMsgData((p) => [
  //       ...p,
  //       {
  //         msg: `${name} Added`,
  //         align: "center",
  //       },
  //     ]);
  //   });

  //   socket.on("receive-msg", (msg) => {
  //     setMsgData((p) => [
  //       ...p,
  //       {
  //         msg: msg,
  //         align: "left",
  //       },
  //     ]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  const handleMsgSent = () => {
    setMsgData((p) => [
      ...p,
      {
        msg: msgInput,
        align: "right",
      },
    ]);
    // socket.emit("send-msg", msgInput);
    setMsgInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          backgroundColor: "rgba(255,255,0,0.8)",
          height: "70dvh",
          marginTop: "5px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          {msgData.map((e, i) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: e.align,
                  marginBottom: "10px",
                }}
              >
                <p
                  style={{
                    backgroundColor: "green",
                    width: "fit-content",
                    padding: "1px 14px",
                    borderRadius: "10px",
                    color: "white",
                    margin: "0px",
                    fontSize: "20px",
                  }}
                >
                  {e.msg}
                </p>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex" }}>
          <input
            style={{
              width: "100%",
            }}
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            type="text"
          />
          <div
            onClick={handleMsgSent}
            style={{
              width: "30px",
              backgroundColor: "green",
              height: "30px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default JoinChat;
