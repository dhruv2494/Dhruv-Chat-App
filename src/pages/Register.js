import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/actions/profileAction";
import { useNavigate } from "react-router-dom";
import { post } from "../api/Api";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
  const location = useLocation();
  const { mobile } = location.state || "";
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [isUserExist, setIsUserExist] = useState(true);
  const [form, setForm] = useState({
    mobile: mobile,
    password: "",
    email: "",
    name: "",
  });

  const [formPass, setFormPass] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mobile) {
      post("user/find-user", { mobile: mobile })
        .then((e) => {
          setIsUserExist(e.data.found);
          if (e.data.found) {
            setForm(e.data.user);
          }
          setLoading(false);
        })
        .catch((e) => console.log(e));
    } else {
      navigation("/");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

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
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
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
        navigation("/chat");
      })
      .catch((e) => console.log(e));
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
      {loading ? null : ( //loader setup
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
              <input type="submit" />
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
              <input type="submit" />
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;
