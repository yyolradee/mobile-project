import { createStore, combineReducers } from "redux"
import drawerReducer from "./reducers/drawerReducer"
import postReducer from "./reducers/postReducer"

const rootReducer = combineReducers({
  drawer: drawerReducer,
  post: postReducer
})

const store = createStore(rootReducer);

export default store