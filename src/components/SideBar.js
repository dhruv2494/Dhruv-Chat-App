import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { post } from "../api/Api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../redux/actions/profileAction";
import { useNavigate } from "react-router-dom";
const SideBar = ({ setOtherUserInfo }) => {
  const [searchInput, setSearchInput] = useState("");
  const [recentData, setRecentData] = useState([]);
  const profileData = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (!profileData.login) {
      navigation("/");
    }

    profileData?.recentlyChatted?.map(async (e, i) => {
      await post("user/get-other-user", { mobile: e.mobile })
        .then((element) => {
          if (element.data.found) {
            setRecentData((p) => [...p, element.data.user]);
          }
        })
        .catch((e) => console.log(e));
    });
  }, [profileData]);

  const handleSearch = (searchNumber) => {
    post("user/search-user", {
      mobile: searchNumber,
      myMobile: profileData.mobile,
    })
      .then((e) => {
        if (e.data.found) {
          setOtherUserInfo({ ...e.data.user, loaded: true });
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
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleLogOut = () => {
    dispatch(
      setProfile({
        login: false,
      })
    );
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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div onClick={() => handleSearch(searchInput)}>
          <FaSearch />
        </div>
      </div>
      <div
        className="sidebar-recent-render-main-div"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {recentData.map((e, i) => {
          return (
            <div
              onClick={() => handleSearch(e.mobile)}
              className="sidebar-chat-render-class"
            >
              <p
                style={{
                  margin: 0,
                }}
              >
                {e.name}
              </p>
              <p
                style={{
                  margin: 0,
                }}
              >
                {e.mobile}
              </p>
            </div>
          );
        })}
      </div>
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
        }}
      >
        Log Out
      </div>
    </div>
  );
};

export default SideBar;
