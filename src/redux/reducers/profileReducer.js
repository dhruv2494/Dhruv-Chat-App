import { SET_PROFILE } from "../type/type";

const initialProfile = {
  
};

const profileReducer = (state = initialProfile, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.profile;
    default:
      return state;
  }
};

export default profileReducer;
