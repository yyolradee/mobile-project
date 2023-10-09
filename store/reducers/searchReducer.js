import { TOGGLE_SEARCH } from "../actions/searchAction";

const initialState = {
    searchIsVisible: false
}

const searchReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_SEARCH:
            return {
                ...state,
                searchIsVisible: action.payload
            };
        default:
            return state;
    }

}

export default searchReducer;