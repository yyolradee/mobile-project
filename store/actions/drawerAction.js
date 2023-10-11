export const TOGGLE_DRAWER = "TOGGLE_DRAWER";
export const SET_DRAWER = "SET_DRAWER";

export const toggleDrawer = () => {
    return { type: TOGGLE_DRAWER };
   };

export const setDrawer = (bool) => {
    return { type: SET_DRAWER, payload: bool }
}