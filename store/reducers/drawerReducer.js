import { TOGGLE_DRAWER, SET_DRAWER } from "../actions/drawerAction";

const initialState = {
  drawerState: false,
};

const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      console.log("toggle_drawer: " + !state.drawerState);
      return {
        ...state,
        drawerState: !state.drawerState,
      };
    case SET_DRAWER:
      console.log("set_drawer: " + action.payload);
      return {
        ...state,
        drawerState: action.payload,
      };
    default:
      return state;
  }
};

export default drawerReducer;
