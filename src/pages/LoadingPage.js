import Lottie from "lottie-react";
import React, { useEffect } from "react";
import mainLoading from "./../assets/lottieIcon/first-page-loading.json";
import progressLoading from "./../assets/lottieIcon/first-page-progress-animation.json";
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
  const navigation = useNavigate();

  useEffect(() => {

    navigation("/login");

  }, []);
  return (
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
  );
};

export default LoadingPage;
