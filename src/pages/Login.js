import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setProfile } from "../redux/actions/profileAction";
import { useDispatch } from "react-redux";

const Login = () => {
  // const userData = JSON.parse(localStorage.getItem("profile"));
  // const dispatch = useDispatch();

  const profileData = useSelector((state) => state.profile);
  useEffect(() => {
    // if (userData && userData.login) {
    //   dispatch(setProfile(userData));
    //   navigation("/chat");
    // }
    if (profileData.login) {
      navigation("/chat");
    }
  }, []);
  const [form, setForm] = useState({
    mobile: "",
  });
  const navigation = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigation("/register", { state: form });
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

        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
