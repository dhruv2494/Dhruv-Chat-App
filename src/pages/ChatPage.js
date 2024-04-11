import React from "react";
import SideBar from "../components/SideBar";
import ChatComponents from "../components/ChatComponents";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const profileData = useSelector((state) => state.profile);
  console.log(profileData);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "black",
      }}
    >
      <div className="sidebar-div">
        <SideBar />
      </div>
      <div className="chatComponents-div">
        <ChatComponents userName={"Mukesh"} />
      </div>
    </div>
  );
};

export default ChatPage;
