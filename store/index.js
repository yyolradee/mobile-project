import { createStore, combineReducers } from "redux"
import drawerReducer from "./reducers/drawerReducer"

const rootReducer = combineReducers({
  drawer: drawerReducer
})

const store = createStore(rootReducer);

export default store