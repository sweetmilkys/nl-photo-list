import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
  ${reset};

  @import "responsive";

  html {
      height: 100%;
  }

  body {
      height: 100%;
      font-family: -apple-system, Helvetica, Arial, "hiragino kaku gothic pro",
          meiryo, "Microsoft YaHei", "ms pgothic", "Apple SD Gothic Neo",
          "Nanum Gothic", "Malgun Gothic", sans-serif;
  }

  .container {
      padding: 0;
      max-width: 794px;
  }

  input,
  input:focus {
      outline: none !important;
      box-shadow: none !important;
  }

  input[type="text"],
  textarea {
      box-shadow: none !important;
      -moz-appearance: none;
      -webkit-appearance: none;
      resize: none;
  }

  a {
      cursor: pointer;
  }

  .ant-modal-header {
    border-bottom: none !important;
  }
  .ant-modal-title {
    font-size: 18px !important;
    font-weight: 500 !important;
    letter-spacing: -0.5px !important;
    color: ${props => props.theme.gray} !important;
  }
  .ant-modal-body {
    padding: 0 24px 24px !important
  }
  .ant-modal-footer {
    border-top: none !important;
    padding: 10px 24px 24px !important;
  }
  .ant-switch{
    background-color: ${props => props.theme.border} !important;
    width: 88px !important;
    height: 34px !important;
  }
  .ant-switch-checked {
    background-color: ${props => props.theme.btnBlue} !important;
    width: 88px !important;
    height: 34px !important;
  }
  .ant-switch-checked::after {
    top: 3px !important;
    margin-left: -2px !important;
    width: 32px !important;
    height: 26px !important;
  }
  .ant-switch::after {
    top: 3px !important;
    width: 32px !important;
    height: 26px !important;
  }
  .ant-switch-inner {
    font-size: 14px !important;
    font-weight: 500 !important;
  }
`;

export default globalStyles;
