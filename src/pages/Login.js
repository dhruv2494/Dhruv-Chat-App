import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ThreeDots } from "react-loader-spinner";
import { post } from "../api/Api";
import { toast } from "react-toastify";
import { setProfile } from "../redux/actions/profileAction";

const Login = () => {
  const profileData = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("chat-aop-profile"));
    if (localData && localData.login) {
      dispatch(setProfile(localData));
      navigation("/chat");
    }
    if (profileData.login) {
      navigation("/chat");
    }
  }, []);
  const [form, setForm] = useState({
    mobile: "",
  });
  const [loader, setLoader] = useState(false);
  const navigation = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    setLoader(true);
    if (form.mobile.length === 10) {
      post("user/find-user", form)
        .then((e) => {
          setLoader(false);
          navigation("/register", {
            state: { userInfo: { ...e.data, mobile: form.mobile } },
          });
        })
        .catch((e) => {
          console.log(e);
          setLoader(false);
        });
    } else {
      toast.error("Please enter exactly 10 digits", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoader(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#2c2c2c",
        height: "100dvh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form id="login-signup-form" onSubmit={handleLogin}>
        <input
          name="phone"
          type="number"
          placeholder="Mobile Number"
          required
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />

        <button type="submit">
          {loader ? (
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="white"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "find"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
