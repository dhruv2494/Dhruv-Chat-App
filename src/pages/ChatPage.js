import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import ChatComponents from "../components/ChatComponents";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const navigation = useNavigate();

  const profileData = useSelector((state) => state.profile);
  useEffect(() => {
    if (!profileData.login) {
      navigation("/");
    }
  }, []);
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
