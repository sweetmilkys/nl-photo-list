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
`;

export default globalStyles;
