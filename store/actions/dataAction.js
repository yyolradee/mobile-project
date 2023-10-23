// Categories

import { getAllCategories } from "../../data/catagories/categoriesController";
export const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";

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

// Posts

import { getAllPosts } from "../../data/posts/postsController";
export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

const fetchPostsSuccess = (data) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: data,
});

const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());

    try {
      const posts = await getAllPosts();
      dispatch(fetchPostsSuccess(posts));
    } catch (error) {
      dispatch(fetchPostsFailure(error));
    }
  };
};

import {
  getAllLocations,
  getFollowLocations,
} from "../../data/locations/locationsController";
import { useSelector } from "react-redux";
export const FETCH_LOCATIONS_REQUEST = "FETCH_LOCATIONS_REQUEST";
export const FETCH_LOCATIONS_SUCCESS = "FETCH_LOCATIONS_SUCCESS";
export const FETCH_LOCATIONS_FAILURE = "FETCH_LOCATIONS_FAILURE";

const fetchLocationsRequest = () => ({
  type: FETCH_LOCATIONS_REQUEST,
});

const fetchLocationsSuccess = (data) => ({
  type: FETCH_LOCATIONS_SUCCESS,
  payload: data,
});

const fetchLocationsFailure = (error) => ({
  type: FETCH_LOCATIONS_FAILURE,
  payload: error,
});

export const fetctLocations = () => {
  return async (dispatch) => {
    dispatch(fetchLocationsRequest());

    try {
      const location = await getAllLocations();
      dispatch(fetchLocationsSuccess(location));
    } catch (error) {
      dispatch(fetchLocationsFailure(error));
    }
  };
};

// get Following Location

export const FETCH_FOLLOWLOCATIONS = "FETCH_FOLLOWLOCATIONS";

export const fetchFollowLocations = (user_id) => {
  return async (dispatch) => {
    try {
      const followLocations = await getFollowLocations(user_id);
      dispatch({ type: FETCH_FOLLOWLOCATIONS, payload: followLocations });
    } catch (error) {
      console.error(error);
    }
  };
};


export const SET_FILTERED_DATA = 'SET_FILTERED_DATA';

export const setFilteredData = (item) => {
  return {
    type: SET_FILTERED_DATA,
    payload: item,
  };
};