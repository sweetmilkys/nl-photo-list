import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

const Container = styled.div`
  text-align: center;
`;

const ImageContainer = styled.div`
  position: relative;
  max-width: 400px;
  margin: 80px auto 50px;
`;

const Img = styled.img`
  display: flex;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
`;

const Text = styled.h2`
  line-height: 1.4;
  word-wrap: break-word;
  margin: 20px 0 15px;
  font-size: 26px;
  font-weight: 600;
  color: #b5b5b5;
`;

const Error = () => (
  <Container>
    <Helmet>
      <title>ERROR | Nearthlab</title>
    </Helmet>
    <ImageContainer>
      <Img src={require(`assets/img/lighthouse.png`)} />
    </ImageContainer>
    <Text>PAGE NOT FOUND</Text>
  </Container>
);

export default Error;
