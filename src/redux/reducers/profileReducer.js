import { SET_PROFILE } from "../type/type";

const initialProfile = {
  login: false,
};

const profileReducer = (state = initialProfile, action) => {
  switch (action.type) {
    case SET_PROFILE: {
      localStorage.setItem("chat-aop-profile", JSON.stringify(action.profile));
      document.title = action?.profile?.name;
      return action.profile;
    }
    default:
      return state;
  }
};

export default profileReducer;
