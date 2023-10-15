import CATEGORIES from "../../data/categories.json";
import FACULTIES from "../../data/faculties.json";
import LOCATION from "../../data/location.json";
import POSTDETAIL from "../../data/postDetail.json";
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from "../actions/dataAction";

const initialState = {
  categoriesData: [],
  facultiesData: FACULTIES,
  locationData: LOCATION,
  postDetailData: [],
  statusData: ["รอรับเรื่อง", "กำลังดำเนินการ", "แก้ไขเสร็จสิ้น"],
  filterData: [],
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    // Categories Handler
    case FETCH_CATEGORIES_REQUEST:
      // You can handle loading states if needed
      return state;

    case FETCH_CATEGORIES_SUCCESS:
      // Update the categoriesData with the fetched data
      return {
        ...state,
        categoriesData: action.payload,
      };

    case FETCH_CATEGORIES_FAILURE:
      // Handle errors if needed
      console.log(action.payload);
      return state;

    // POSTS Handler
    case FETCH_POSTS_REQUEST:
      // You can handle loading states if needed
      return state;

    case FETCH_POSTS_SUCCESS:
      // Update the categoriesData with the fetched data
      return {
        ...state,
        postDetailData: action.payload,
      };

    case FETCH_POSTS_FAILURE:
      // Handle errors if needed
      console.log(action.payload);
      return state;

    default:
      return state;
  }
};

export default dataReducer;
