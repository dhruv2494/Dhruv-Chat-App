import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import ChatComponents from "../components/ChatComponents";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const navigation = useNavigate();

  const profileData = useSelector((state) => state.profile);
  console.log(profileData);
  const [otherUserInfo, setOtherUserInfo] = useState({
    name: "",
    mobile: "",
    loaded: false,
  });
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
        <SideBar setOtherUserInfo={setOtherUserInfo} />
      </div>
      <div className="chatComponents-div">
        {otherUserInfo.loaded ? (
          <ChatComponents otherUserInfo={otherUserInfo} />
        ) : null}
      </div>
    </div>
  );
};

export default ChatPage;
