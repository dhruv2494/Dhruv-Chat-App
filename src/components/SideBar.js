import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { post } from "../api/Api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/actions/profileAction";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
const SideBar = ({ setOtherUserInfo, setMainChatLoader }) => {
  const [searchInput, setSearchInput] = useState("");
  const [recentData, setRecentData] = useState([]);
  const [loader, setLoader] = useState(false);
  const profileData = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (!profileData.login) {
      navigation("/login");
    }

    const getRecentChat = async () => {
      setLoader(true);
      await post("chat/find-recent-chat", { mobile: profileData.mobile })
        .then((element) => {
          if (element.data.found) {
            setRecentData(element.data.chat);
          }
          setLoader(false);
        })
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });
    };
    getRecentChat();
  }, [profileData]);

  const handleSearch = (searchNumber) => {
    setMainChatLoader(true);
    post("user/search-user", {
      mobile: searchNumber,
      myMobile: profileData.mobile,
    })
      .then((e) => {
        if (e.data.found) {
          setOtherUserInfo({ ...e.data.user, loaded: true });
          let a = [...recentData];
          let foundIndex = a.findIndex(
            (item) => item.mobile === e.data.user.mobile
          );

          if (foundIndex !== -1) {
            const user = a.splice(foundIndex, 1)[0];

            a.push(user);
          }

          if (foundIndex === -1) {
            a.push(e.data.user);
          }

          setRecentData(a);

          setSearchInput("");
        } else {
          toast.error("User Not Found", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setOtherUserInfo({
            name: "",
            mobile: "",
            loaded: false,
          });
          setSearchInput("");
        }
        setMainChatLoader(false);
      })
      .catch((e) => {
        console.log(e);
        setMainChatLoader(false);
      });
  };

  const handleLogOut = () => {
    dispatch(
      setProfile({
        login: false,
      })
    );
    localStorage.removeItem("chat-aop-profile");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        position: "relative",
      }}
    >
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 5px",
          alignItems: "center",
          height: "30px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          style={{
            padding: "0 0.5rem",
            width: "90%",
            height: "30px",
            border: "none",
            borderRadius: "4px",
            boxSizing: "border-box",
            backgroundColor: "#383838",
            color: "#fafafa",
            outline: "none",
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch(searchInput);
            }
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div
          style={{
            width: "10%",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => handleSearch(searchInput)}
        >
          <FaSearch />
        </div>
      </div>
      {loader ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ThreeDots
            visible={true}
            height="50"
            width="50"
            color="white"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div
          className="sidebar-recent-render-main-div"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {[...recentData].reverse().map((e, i) => {
            return (
              <div
                onClick={() => handleSearch(e.mobile)}
                className="sidebar-chat-render-class"
              >
                <img
                  className="sidebar-user-profile-picture"
                  src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                  alt="user Profile Picture"
                />
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: "500",
                    }}
                  >
                    {e.name}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: "#c1c1c1",
                      fontSize: "13px",
                      marginTop: "1px",
                    }}
                  >
                    {e.mobile}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div
        onClick={handleLogOut}
        style={{
          width: "100%",
          backgroundColor: "black",
          height: "30px",
          padding: "10px 0px",
          textAlign: "center",
          position: "absolute",
          bottom: "0",
          cursor: "pointer",
        }}
      >
        Log Out
      </div>
    </div>
  );
};

export default SideBar;
