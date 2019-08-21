import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import { DataContext } from "./ListContainer";
import Helmet from "react-helmet";
import { Checkbox, Divider, BackTop } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Photo from "Components/Photo";

const Container = styled.div`
  position: relative;
  max-width: 794px;

  @media (min-width: 768px) and (max-width: 991px) {
    width: 90%;
    margin: 0 auto;
    padding: 27px 0 80px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    width: 90%;
    margin: 0 auto;
    padding: 27px 0 80px;
  }
  @media (min-width: 1200px) {
    width: 87.72%;
    margin: 0 auto;
    padding: 27px 0 80px;
  }
  @media (max-width: 767px) {
    padding-bottom: 20px;
  }

  :after {
    display: block;
    content: "";
    clear: both;
  }
`;

const FitlerBox = styled.div``;

const FilterHeader = styled.div`
  margin-bottom: 12px;
`;

const FitlerIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.gray};
`;

const FilterTitle = styled.span`
  margin-left: 8px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${props => props.theme.gray};
`;

const Filter = styled.div`
  font-size: 13px;
  letter-spacing: -0.5px;
  color: ${props => props.theme.ligthGray};
  label {
    margin-right: 8px;
  }
`;

const FilterCheckBox = styled(Checkbox)`
  border-color: ${props => props.theme.checkBox};
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${props => props.theme.blue};
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${props => props.theme.blue};
    border-color: ${props => props.theme.blue};
  }
  .ant-checkbox-checked::after {
    border: 1px solid ${props => props.theme.blue};
  }
`;

const TotalCountBox = styled.div``;

const Count = styled.h2`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${props => props.theme.gray};
`;

const ContentBox = styled.ul``;

const ListPresenter = ({ addComma, completedList, onClickFilter }) => {
  const {
    ladeltypes,
    meta: { total },
    photos
  } = useContext(DataContext);

  return (
    <Container>
      <BackTop />
      <Helmet>
        <title>사진목록 | Nearthlab</title>
      </Helmet>
      <FitlerBox>
        <FilterHeader>
          <FitlerIcon icon={faFilter} />
          <FilterTitle>라벨 종류 선택</FilterTitle>
        </FilterHeader>
        <Filter>
          {ladeltypes.map(({ id, title }) => (
            <Fragment key={id}>
              <FilterCheckBox onClick={onClickFilter} value={id} />
              {title}
            </Fragment>
          ))}
        </Filter>
      </FitlerBox>
      <Divider />
      <TotalCountBox>
        <Count>{`전체 ${total
          .toString()
          .replace("/B(?=(d{3})+(?!d))/g", ",")}개`}</Count>
      </TotalCountBox>
      <ContentBox>
        {photos.map(
          ({ id, photoUrl, photoTakenAt, createdAt, completed, labels }) => (
            <Photo
              key={id}
              id={id}
              photoUrl={photoUrl}
              photoTakenAt={photoTakenAt}
              createdAt={createdAt}
              completed={
                completedList !== null &&
                completedList.find(item => id === item.id) !== undefined
                  ? completedList.find(item => id === item.id).completed
                  : completed
              }
              labels={labels}
            />
          )
        )}
      </ContentBox>
    </Container>
  );
};
export default ListPresenter;
