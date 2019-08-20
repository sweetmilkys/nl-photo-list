import React, { memo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card } from "antd";

const Container = styled.li`
  width: 25%;
  padding: 3px;
  list-style: none;
  display: inline-block;
  vertical-align: top;

  @media (max-width: 767px) {
    width: 50%;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 50%;
  }
  .ant-card-body {
    padding: 11px 10px;
  }
`;

const ButtonBox = styled.div`
  position: relative;
`;

const CheckBtn = styled.div`
  position: absolute;
  text-align: right;
  top: 10px;
  right: 10px;
  z-index: 1;
`;

const InCompleateBtn = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="18"
    viewBox="0 0 40 18"
  >
    <g fill="none" fillRule="evenodd">
      <rect width="40" height="18" fill="#F5C85C" rx="9" />
      <text
        fill="#FFF"
        fontFamily="NotoSansCJKkr-Medium, Noto Sans CJK KR"
        fontSize="10"
        fontWeight="400"
        letterSpacing="-.278"
      >
        <tspan x="7" y="13">
          미완료
        </tspan>
      </text>
    </g>
  </svg>
);
const CompleateBtn = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="18"
    viewBox="0 0 32 18"
  >
    <g fill="none" fillRule="evenodd">
      <rect width="32" height="18" fill="#69DD95" rx="9" />
      <text
        fill="#FFF"
        fontFamily="NotoSansCJKkr-Bold, Noto Sans CJK KR"
        fontSize="10"
        fontWeight="bold"
        letterSpacing="-.278"
      >
        <tspan x="7" y="13">
          완료
        </tspan>
      </text>
    </g>
  </svg>
);

const ContentPhoto = styled(Card)``;

const Img = styled.img`
  height: 140px;

  @media (max-width: 767px) {
    height: 300px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    height: 300px;
  }
`;

const ContentInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const ContentText = styled(Card.Meta)`
  display: block;
  position: relative;
  flex-grow: 1;
  .ant-card-meta-title {
    font-size: 13px;
  }
`;

const LabelCount = ({ number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="56"
    height="18"
    viewBox="0 0 56 18"
  >
    <g fill="none" fillRule="evenodd">
      <rect width="56" height="18" fill="#E9EEF1" rx="9" />
      <text
        fill="#2A67E2"
        fontFamily="NotoSansCJKkr-Medium, Noto Sans CJK KR"
        fontSize="10"
        fontWeight="400"
        letterSpacing="-.278"
      >
        <tspan x="17" y="12.553">
          {`라벨 ${number}개`}
        </tspan>
      </text>
      <path
        fill="#2A67E2"
        d="M10.708 8.293l4.363 4.364-1.414 1.414-4.364-4.363a3 3 0 0 1-4.001-4.001l2 2 1.415-1.414-2-2a3 3 0 0 1 4.001 4.001z"
      />
    </g>
  </svg>
);

const Photo = memo(({ id, photoUrl, completed, labels }) => (
  <Link to={`/photos/${id}`}>
    <Container key={id}>
      <ButtonBox>
        <CheckBtn>{completed ? <CompleateBtn /> : <InCompleateBtn />}</CheckBtn>
      </ButtonBox>
      <ContentPhoto hoverable cover={<Img alt={id} src={photoUrl} />}>
        <ContentInfoBox>
          <ContentText title={photoUrl.split("/")[3]} />
          <LabelCount number={labels ? labels.length : null} />
        </ContentInfoBox>
      </ContentPhoto>
    </Container>
  </Link>
));

export default Photo;
