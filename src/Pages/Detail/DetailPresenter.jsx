import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { Modal, Switch, Card, Descriptions } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div``;

const Contant = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PhotoBox = styled.div`
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

const LabelIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.gray};
`;

const LabelTitle = styled.span`
  margin-left: 8px;
  font-size: 14px;
  letter-spacing: -0.5px;
  color: ${props => props.theme.gray};
`;

const LabelItem = styled(Card)`
  width: 400;
  height: 194;
`;

const DetailPresenter = ({ handleCancel, handleSwitch }) => (
  <Container>
    <Helmet>
      <title>${"123.jpg"} 파일 상세 정보 | Nearthlab</title>
    </Helmet>
    <Modal
      title="파일 상세 정보"
      centered
      visible={true}
      onCancel={handleCancel}
      width="710px"
      footer={
        <Switch
          onChange={handleSwitch}
          defaultChecked={true}
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
            cover={
              <Img
                alt="example"
                src="https://cdn.zeplin.io/5d4bb51c32e23e35167fcbbc/assets/EB9DB7A3-C1CD-4891-80B5-23A0138699F2.png"
              />
            }
          >
            <Descriptions>
              <Descriptions.Item label="파일명">Zhou Maomao</Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="촬영시간">ZhouMaomao</Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="등록일">Zhou Maomao</Descriptions.Item>
            </Descriptions>
          </Card>
        </PhotoBox>
        <LabelBox>
          <LabelHeader>
            <LabelIcon icon={faWrench} />
            <LabelTitle>라벨 정보</LabelTitle>
          </LabelHeader>
          {[1, 3, 4].map(item => (
            <LabelItem key={item}>
              <h2>{`Label #${item}`}</h2>
              <Descriptions>
                <Descriptions.Item label="유형">단순 손상</Descriptions.Item>
              </Descriptions>
              <Descriptions>
                <Descriptions.Item label="설명">
                  Leading Edge에 매우 초기Scratches 발생 - 조치 제안: 블레이드의
                  구조적인 문제는 야기하지 않으며, 운전에 영향을 미지치 않음.
                  지속적인 상태모니터링과 향후 예방정비 사항이 될 수 있음을
                  인지하는 것으로 충분함(Preventive Maintenance Routine_PMR)
                </Descriptions.Item>
              </Descriptions>
            </LabelItem>
          ))}
        </LabelBox>
      </Contant>
    </Modal>
  </Container>
);
export default DetailPresenter;
