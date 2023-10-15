import { createStore, combineReducers, applyMiddleware } from "redux"
import drawerReducer from "./reducers/drawerReducer"
import dataReducer from "./reducers/dataReducer"
import searchReducer from "./reducers/searchReducer";
import thunk from 'redux-thunk';
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  drawer: drawerReducer,
  data: dataReducer,
  search: searchReducer,
  user: userReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store