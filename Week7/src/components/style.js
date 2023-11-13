import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: "Cafe24Supermagic-Bold-v1.0";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/Cafe24Supermagic-Bold-v1.0.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
  }
  
body {
  background-color: rgb(167, 168, 211);
  font-family: "Cafe24Supermagic-Bold-v1.0";
}
`;
