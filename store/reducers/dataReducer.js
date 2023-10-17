import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  FETCH_LOCATIONS_FAILURE
} from "../actions/dataAction";

const initialState = {
  categoriesData: [],
  locationData: [],
  postDetailData: [],
  statusData: ["รอรับเรื่อง", "กำลังดำเนินการ", "แก้ไขเสร็จสิ้น"],
  filterData: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    // Categories Handler
    case FETCH_CATEGORIES_REQUEST:
      return state;

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoriesData: action.payload,
      };

    case FETCH_CATEGORIES_FAILURE:
      console.log(action.payload);
      return state;

    // POSTS Handler
    case FETCH_POSTS_REQUEST:
      return state;

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        postDetailData: action.payload,
      };

    case FETCH_POSTS_FAILURE:
      console.log(action.payload);
      return state;

      // LOCATIONS Handler
    case FETCH_LOCATIONS_REQUEST:
      return state;

    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        locationData: action.payload,
      };

    case FETCH_LOCATIONS_FAILURE:
      console.log(action.payload);
      return state;

    default:
      return state;
  }
};

export default dataReducer;
