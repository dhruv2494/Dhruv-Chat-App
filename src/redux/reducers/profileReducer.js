import { SET_PROFILE } from "../type/type";

const initialProfile = {
  login: false,
};

const profileReducer = (state = initialProfile, action) => {
  switch (action.type) {
    case SET_PROFILE: {
      // localStorage.setItem("profile", JSON.stringify(action.profile));
      return action.profile;
    }
    default:
      return state;
  }
};

export default profileReducer;
