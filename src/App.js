import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux";
import RouterFile from "./router/RouterFile";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// console.log(rootReducer);
const store = createStore(rootReducer);

const App = () => {
  // console.log(process.env.REACT_APP_API_URL);
  return (
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
  );
};

export default App;
