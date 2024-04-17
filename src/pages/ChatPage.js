import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import ChatComponents from "../components/ChatComponents";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const navigation = useNavigate();

  const profileData = useSelector((state) => state.profile);
  // console.log(profileData);
  const [mainChatLoader, setMainChatLoader] = useState(false);
  const [otherUserInfo, setOtherUserInfo] = useState({
    name: "",
    mobile: "",
    loaded: false,
  });
  useEffect(() => {
    if (!profileData.login) {
      navigation("/login");
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
        <SideBar
          setOtherUserInfo={setOtherUserInfo}
          setMainChatLoader={setMainChatLoader}
        />
      </div>
      <div className="chatComponents-div">
        {otherUserInfo.loaded ? (
          <ChatComponents
            otherUserInfo={otherUserInfo}
            mainChatLoader={mainChatLoader}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ChatPage;
