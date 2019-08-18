import React from "react";
import styled from "styled-components";
import { Spin } from "antd";
import Helmet from "react-helmet";

const Container = styled.div`
  text-align: center;
  padding-top: 200px;
`;

const Loader = () => (
  <Container>
    <Helmet>
      <title>LOADING | Nearthlab</title>
    </Helmet>
    <Spin size="large" tip="Loading..." />
  </Container>
);

export default Loader;
