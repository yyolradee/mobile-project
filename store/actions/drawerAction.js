export const TOGGLE_DRAWER = "TOGGLE_DRAWER";

export const toggleDrawer = (isOpen) => {
    return { type: TOGGLE_DRAWER, isOpen: isOpen };
   };