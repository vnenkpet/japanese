import * as React from "react";
import styled from "./styled-components";

const Footer = styled.footer`
  font-size: 12px;
  opacity: 0.8;
`;

const Home = () => {
  return (
    <div>
      <h1>Complete Japanese Dictionary.</h1>
      <p>Start with searching something in the bar above, e. g. "train".</p>
      <Footer>Data sources: JMDict, JMnedict, KanjiDic.</Footer>
    </div>
  );
};

export default Home;
