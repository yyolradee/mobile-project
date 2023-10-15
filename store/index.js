import { createStore, combineReducers, applyMiddleware } from "redux"
import drawerReducer from "./reducers/drawerReducer"
import postReducer from "./reducers/postReducer"
import searchReducer from "./reducers/searchReducer";
import thunk from 'redux-thunk';
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  drawer: drawerReducer,
  post: postReducer,
  search: searchReducer,
  user: userReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store