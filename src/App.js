import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux";
import RouterFile from "./router/RouterFile";
import { ToastContainer } from "react-toastify";
import mainLoading from "./assets/lottieIcon/first-page-loading.json";
import progressLoading from "./assets/lottieIcon/first-page-progress-animation.json";

import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";

// console.log(rootReducer);
const store = createStore(rootReducer);

const App = () => {
  // console.log(process.env.REACT_APP_API_URL);
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 3000);
  }, []);
  return (
    <>
      {animation ? (
        <div
          style={{
            width: "100%",
            height: "100dvh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#2c2c2c",
          }}
        >
          <div>
            <Lottie
              className="first-page-main-loading"
              style={{
                height: "500px",
              }}
              animationData={mainLoading}
            />
            <Lottie
              className="first-page-progress-loading"
              animationData={progressLoading}
              loop={false}
            />
          </div>
        </div>
      ) : (
        <Provider store={store}>
          <RouterFile />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Provider>
      )}
    </>
  );
};

export default App;
