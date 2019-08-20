import React, { useContext } from "react";
import styled from "styled-components";
import { Modal, Switch, Card, Descriptions } from "antd";
import { DataContext } from "./DetailContainer";
import Label from "Components/Label";

const Container = styled.div``;

const Contant = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PhotoBox = styled.div`
  .ant-card-hoverable:hover {
    border-color: none;
    box-shadow: none;
  }
  .ant-card-body {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .ant-descriptions-item-label {
    font-weight: bold !important;
    width: 25% !important;
  }
  .ant-descriptions-item-colon::after {
    content: none !important;
  }
`;

const Img = styled.img`
  width: 240px;
  height: 178.9px;
`;

const LabelBox = styled.div`
  width: 400px;
  .ant-card-bordered {
    margin: 10px 0 !important;
    border-radius: 10px !important;
    box-shadow: 0 2px 2px 0 #ecedef !important;
    border: solid 1px #dfe3ea !important;
    background-color: #ffffff !important;
  }
`;

const LabelHeader = styled.div`
  margin-bottom: 12px;
`;

const LabelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="11"
    viewBox="0 0 11 11"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M-4-4h18v18H-4z" />
      <path
        fill="#727682"
        d="M6.234 4.69L11 9.454 9.455 11 4.69 6.234a3.277 3.277 0 0 1-4.37-4.37l2.185 2.185L4.05 2.504 1.864.32a3.277 3.277 0 0 1 4.37 4.37z"
      />
    </g>
  </svg>
);

const LabelTitle = styled.span`
  padding-left: 5px;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.5px;
  color: ${props => props.theme.ligthGray};
`;

const DetailPresenter = ({ handleCancel, handleSwitch }) => {
  const {
    ladeltypes,
    data: { id, photoUrl, photoTakenAt, createdAt, completed },
    labels
  } = useContext(DataContext);

  return (
    <Container>
      <Modal
        title="파일 상세 정보"
        centered
        visible={true}
        onCancel={handleCancel}
        width="710px"
        footer={
          <Switch
            onChange={handleSwitch}
            defaultChecked={completed}
            checkedChildren="완료"
            unCheckedChildren="미완료"
          />
        }
      >
        <Contant>
          <PhotoBox>
            <Card
              hoverable
              style={{ width: 240, border: "none" }}
              cover={<Img alt={id} src={photoUrl} />}
            >
              {[
                { label: "파일명", val: photoUrl.split("/")[3] },
                {
                  label: "촬영시간",
                  val:
                    photoTakenAt.split("T")[0].replace(/-/g, ".") +
                    (photoTakenAt.split("T")[1].split(":")[0] < 12
                      ? " 오전 "
                      : " 오후 ") +
                    photoTakenAt.split("T")[1].split(".")[0]
                },
                {
                  label: "등록일",
                  val:
                    createdAt.split("T")[0].replace(/-/g, ".") +
                    (createdAt.split("T")[1].split(":")[0] < 12
                      ? " 오전 "
                      : " 오후 ") +
                    createdAt.split("T")[1].split(".")[0]
                }
              ].map(({ label, val }) => (
                <Descriptions key={label}>
                  <Descriptions.Item label={label}>{val}</Descriptions.Item>
                </Descriptions>
              ))}
            </Card>
          </PhotoBox>
          <LabelBox>
            <LabelHeader>
              <LabelIcon />
              <LabelTitle>라벨 정보</LabelTitle>
            </LabelHeader>
            {labels.map(({ id, typeId, description }) => (
              <Label
                key={id}
                typeId={typeId}
                type={ladeltypes.find(({ id }) => id === typeId).title}
                description={description}
              />
            ))}
          </LabelBox>
        </Contant>
      </Modal>
    </Container>
  );
};
export default DetailPresenter;
