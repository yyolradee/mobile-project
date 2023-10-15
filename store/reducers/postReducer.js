import CATEGORIES from "../../data/categories.json";
import FACULTIES from "../../data/faculties.json";
import LOCATION from "../../data/location.json";
import POSTDETAIL from "../../data/postDetail.json";
import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from "../actions/postAction";

const initialState = {
  categoriesData: [],
  facultiesData: FACULTIES,
  locationData: LOCATION,
  postDetailData: POSTDETAIL,
  statusData: ["รอรับเรื่อง", "กำลังดำเนินการ", "แก้ไขเสร็จสิ้น"],
  filterData: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
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
      console.log(action.payload)
      return state;
    default:
      return state;
  }
};

export default postReducer;
