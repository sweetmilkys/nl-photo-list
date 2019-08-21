import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
  createContext,
  useRef
} from "react";
import axios from "axios";
import Loader from "Components/Loader";
import Error from "Components/Error";
import ListPresenter from "./ListPresenter";
import { message } from "antd";

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
        photos: action.photos
      };
    case FETCH_DATA:
      return {
        ...state,
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
export const FETCH_DATA = "FETCH_DATA";
export const API_FAILURE = "API_FAILURE";

const ListContainer = ({ history, location: { search } }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, isError, meta, ladeltypes, photos } = state;
  const value = useMemo(() => ({ ladeltypes, meta, photos, dispatch }), [
    ladeltypes,
    meta,
    photos
  ]);
  const [url, setUrl] = useState(
    `${process.env.REACT_APP_NEARTHLAB_API_URL}photos`
  );
  const label1 = useRef(false);
  const label2 = useRef(false);
  const label3 = useRef(false);
  const label4 = useRef(false);

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

  useEffect(() => {
    // Get photo lists
    const getPhotos = async () => {
      try {
        const {
          data: { meta, photos }
        } = await axios.get(url);

        dispatch({
          type: meta.currentPage === 1 ? GET_DATA : FETCH_DATA,
          meta,
          photos
        });
      } catch (error) {
        dispatch({ type: API_FAILURE });
      }
    };

    // 필터 데이터가 없을 경우
    if (ladeltypes.length === 0) {
      getLabels();
    } else {
      getPhotos();
    }
  }, [ladeltypes, url]);

  // Infinite Scroll 함수
  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (meta.currentPage < meta.maxPage) {
        setUrl(
          `${
            process.env.REACT_APP_NEARTHLAB_API_URL
          }photos?page=${meta.currentPage + 1}${
            label1.current ? "&labelTypeIds[]=1" : ""
          }${label2.current ? "&labelTypeIds[]=2" : ""}${
            label3.current ? "&labelTypeIds[]=3" : ""
          }${label4.current ? "&labelTypeIds[]=4" : ""}`
        );
      } else {
        message.warning("마지막 페이지 입니다 :)");
      }
    }
  }, [meta.currentPage, meta.maxPage]);

  // 스크롤 이벤트
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  // 3자리 콤마 계산 정규식
  const addComma = useCallback(num => {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  }, []);

  const completedList = useMemo(() => {
    let completedList = JSON.parse(localStorage.getItem("completed"));
    return completedList;
  }, []);

  // 라벨 종류 선택에 따른 API URL 주소 세팅
  const onClickFilter = e => {
    switch (e.currentTarget.value) {
      case "1":
        label1.current = e.currentTarget.checked;
        break;
      case "2":
        label2.current = e.currentTarget.checked;
        break;
      case "3":
        label3.current = e.currentTarget.checked;
        break;
      case "4":
        label4.current = e.currentTarget.checked;
        break;
      default:
        break;
    }
    setUrl(
      `${process.env.REACT_APP_NEARTHLAB_API_URL}photos?page=1${
        label1.current ? "&labelTypeIds[]=1" : ""
      }${label2.current ? "&labelTypeIds[]=2" : ""}${
        label3.current ? "&labelTypeIds[]=3" : ""
      }${label4.current ? "&labelTypeIds[]=4" : ""}`
    );
    history.push("/");
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <DataContext.Provider value={value}>
      <ListPresenter
        addComma={addComma}
        completedList={completedList}
        onClickFilter={onClickFilter}
      />
    </DataContext.Provider>
  );
};

export default ListContainer;
