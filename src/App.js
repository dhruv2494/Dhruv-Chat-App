import React from "react";
// import JoinChat from "./Socket/JoinChat";
import SideBar from "./components/SideBar";
import ChatComponents from "./components/ChatComponents";

const App = () => {
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

export default App;
