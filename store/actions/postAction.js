// actions.js
import { getAllCategories } from "../../data/catagories/categoriesController";

// Action Types
export const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";
// Action Types
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";

// Action Creators

const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

const fetchCategoriesSuccess = (data) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: data,
});

const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesRequest());

    try {
      const categories = await getAllCategories();
      dispatch(fetchCategoriesSuccess(categories));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error));
    }
  };
};
