import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/actions/profileAction";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    mobileNo: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const handleLogin = () => {
    if (form.mobileNo !== "" && form.password !== "") {
      dispatch(setProfile(form));
    }
    navigation("/chat");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        backgroundColor: "#2c2c2c",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        color: "white",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "30%",
          marginTop: "50px",
        }}
      >
        <div>
          <h4
            style={{
              width: "100%",
              margin: "0",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Mobile No.
          </h4>
          <input
            style={{
              width: "100%",
              height: "20px",
            }}
            type="number"
            value={form.mobileNo}
            onChange={(e) => setForm({ ...form, mobileNo: e.target.value })}
          />
        </div>
        <div>
          <h4
            style={{
              width: "100%",
              margin: "0",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Password
          </h4>
          <input
            style={{
              width: "100%",
              height: "20px",
            }}
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
      </div>
      <button
        onClick={handleLogin}
        style={{
          width: "80px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#696969",
          border: "none",
          padding: "5px 10px",
          borderRadius: "10px",
          color: "white",
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
