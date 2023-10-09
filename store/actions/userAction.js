export const SET_USER = "SET_USER";

export const setUserInfo = (user) => {
    return {
      type: SET_USER,
      payload: user,
    };
  };