import { createStore, combineReducers } from "redux"
import drawerReducer from "./reducers/drawerReducer"
import postReducer from "./reducers/postReducer"
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  drawer: drawerReducer,
  post: postReducer,
  user: userReducer
})

const store = createStore(rootReducer);

export default store