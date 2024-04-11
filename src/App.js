import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import rootReducer from "./redux";
import RouterFile from "./router/RouterFile";

console.log(rootReducer);
const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <RouterFile />
    </Provider>
  );
};

export default App;
