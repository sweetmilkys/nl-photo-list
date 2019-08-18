import React, { useEffect, useMemo, useReducer, createContext } from "react";
import axios from "axios";
import Loader from "Components/Loader";
import Error from "Components/Error";
import ListPresenter from "./ListPresenter";

export const DataContext = createContext({
  ladeltypes: [],
  metaData: {},
  photosData: [],
  dispatch: () => {}
});

const initialState = {
  isLoading: true,
  isError: false,
  ladeltypes: [],
  meta: {},
  photos: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_LABEL_TYPES:
      return {
        ...state,
        ladeltypes: action.ladeltypes
      };
    case GET_DATA:
      return {
        ...state,
        isLoading: false,
        meta: action.meta,
        photos: [...state.photos, ...action.photos]
      };
    case API_FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export const GET_LABEL_TYPES = "GET_LABEL_TYPES";
export const GET_DATA = "GET_DATA";
export const API_FAILURE = "API_FAILURE";

const ListContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, isError, meta, ladeltypes, photos } = state;
  const value = useMemo(() => ({ ladeltypes, meta, photos, dispatch }), [
    ladeltypes,
    meta,
    photos
  ]);

  // Get label types
  const getLabels = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_NEARTHLAB_API_URL}labelTypes`
      );
      dispatch({
        type: GET_LABEL_TYPES,
        ladeltypes: data
      });
    } catch (error) {
      dispatch({ type: API_FAILURE });
    }
  };

  // Get photo lists
  const getPhotos = async () => {
    try {
      const {
        data: { meta, photos }
      } = await axios.get(`${process.env.REACT_APP_NEARTHLAB_API_URL}photos`);
      dispatch({
        type: GET_DATA,
        meta,
        photos
      });
    } catch (error) {
      dispatch({ type: API_FAILURE });
    }
  };

  useEffect(() => {
    if (ladeltypes.length === 0) {
      getLabels();
    } else {
      getPhotos();
    }
  }, [ladeltypes]);

  const addComma = num => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <DataContext.Provider value={value}>
      <ListPresenter addComma={addComma} />
    </DataContext.Provider>
  );
};

export default ListContainer;
