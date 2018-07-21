import { injectGlobal } from "styled-components";

export default () => {
  // tslint:disable-next-line
  injectGlobal`
  html {
    background: #1d6d67;
    color: #ffffffcc;
    font-family: sans-serif;
  }
`;
};
