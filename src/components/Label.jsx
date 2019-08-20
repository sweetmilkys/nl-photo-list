import React, { memo } from "react";
import styled from "styled-components";
import { Card, Descriptions } from "antd";

const LabelItem = styled(Card)`
  width: 400;
  height: 194;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.5px;
  color: ${props => props.theme.gray};
`;

const Photo = memo(({ typeId, type, description }) => (
  <LabelItem>
    <Title>{`라벨 #${typeId}`}</Title>
    <Descriptions>
      <Descriptions.Item label="유형">{type}</Descriptions.Item>
    </Descriptions>
    <Descriptions>
      <Descriptions.Item label="설명">{description}</Descriptions.Item>
    </Descriptions>
  </LabelItem>
));

export default Photo;
