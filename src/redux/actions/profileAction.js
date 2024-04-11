import { SET_PROFILE } from "../type/type";

export const setProfile = (profile) => {
  return {
    type: SET_PROFILE,
    profile: profile,
  };
};
