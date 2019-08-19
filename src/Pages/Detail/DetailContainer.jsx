import React, { useRef, useContext, useCallback, useEffect } from "react";
import DetailPresenter from "./DetailPresenter";

const DetailContainer = ({ history }) => {
  const completed = useRef(true);

  useEffect(() => {
    console.log(completed.current);
  });

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
    console.log(checked, event);
  }, []);

  return (
    <DetailPresenter handleCancel={handleCancel} handleSwitch={handleSwitch} />
  );
};

export default DetailContainer;
