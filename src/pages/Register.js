import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/actions/profileAction";
import { useNavigate } from "react-router-dom";
import { post } from "../api/Api";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
const Register = () => {
  const location = useLocation();
  const { userInfo } = location.state || "";
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [isUserExist, setIsUserExist] = useState(userInfo.found);
  const [form, setForm] = useState(
    isUserExist
      ? userInfo.user
      : {
          mobile: userInfo.mobile,
          password: "",
          email: "",
          name: "",
        }
  );
  const [formPass, setFormPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    if (formPass === form.password) {
      dispatch(setProfile({ ...form, login: true }));
      toast.success("Login Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      navigation("/chat");
    } else {
      toast.error("Wrong Password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    post("user/register", form)
      .then((e) => {
        dispatch(setProfile({ ...form, login: true }));
        toast.success("Register Success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        navigation("/chat");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
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
      {/* {loading ? null : ( //loader setup */}
      <div>
        {isUserExist ? (
          <form id="login-signup-form" onSubmit={handleLogin}>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              // minLength={8}
              value={formPass}
              onChange={(e) => setFormPass(e.target.value)}
            />
            <button type="submit">
              {loading ? (
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
                "submit"
              )}
            </button>
          </form>
        ) : (
          <form id="login-signup-form" onSubmit={handleRegister}>
            <input
              name="name"
              type="text"
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              // minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button type="submit">
              {loading ? (
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
                "submit"
              )}
            </button>
          </form>
        )}
      </div>
      {/* )} */}
    </div>
  );
};

export default Register;
