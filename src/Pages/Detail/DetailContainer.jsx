import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
  createContext
} from "react";
import axios from "axios";
import { GET_DATA } from "Pages/List/ListContainer";
import DetailPresenter from "./DetailPresenter";
import { notification } from "antd";

export const DataContext = createContext({
  ladeltypes: [],
  data: {},
  labels: []
});

const initialState = {
  isLoading: true,
  ladeltypes: [],
  data: {},
  labels: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        isLoading: false,
        ladeltypes: action.ladeltypes,
        data: action.photos,
        labels: action.photos.labels
      };
    default:
      return state;
  }
};

const DetailContainer = ({ history, match: { params } }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isLoading, ladeltypes, data, labels } = state;
  const value = useMemo(() => ({ ladeltypes, data, labels }), [
    ladeltypes,
    data,
    labels
  ]);
  const completed = useRef();

  // Get a single photo
  useEffect(() => {
    console.log("데이터");
    const getData = async () => {
      try {
        const { data: ladeltypes } = await axios.get(
          `${process.env.REACT_APP_NEARTHLAB_API_URL}labelTypes`
        );
        const { data: photos } = await axios.get(
          `${process.env.REACT_APP_NEARTHLAB_API_URL}photos/${params.id}`
        );
        console.log("확인", ladeltypes, photos);
        dispatch({
          type: GET_DATA,
          ladeltypes: ladeltypes,
          photos: photos
        });
      } catch (error) {
        notification["error"]({
          message: "ERROR",
          description: "파일 상세 정보를 가져올 수 없습니다."
        });
      }
    };
    getData();
  }, [params.id]);

  // 파일상세 정보 모달 창 닫기 버튼
  const handleCancel = useCallback(
    e => {
      e.stopPropagation();
      history.goBack();
    },
    [history]
  );

  // 작업완료 버튼
  const handleSwitch = useCallback((checked, event) => {
    console.log("클릭?", checked, event);
    completed.current = checked;
    console.log(completed.current);
  }, []);

  console.log("value", value);

  return isLoading ? null : (
    <DataContext.Provider value={value}>
      <DetailPresenter
        handleCancel={handleCancel}
        handleSwitch={handleSwitch}
      />
    </DataContext.Provider>
  );
};

export default DetailContainer;
