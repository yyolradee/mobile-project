import { TOGGLE_DRAWER } from "../actions/drawerAction";

const initialState = {
    drawerState: false,
}

const drawerReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_DRAWER:
            console.log("toggle_drawer: " + !state.drawerState);
            return {
                ...state,
                drawerState: !state.drawerState,
            }
        default:
            return state;
    }
}

export default drawerReducer