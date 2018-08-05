import * as React from "react";
import styled from "../styled-components";

const Div = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

const Pre = styled.span`
  font-size: 12px;
  opacity: 1;
  font-family: monospace;
  background: #00000018;
  border-radius: 4px;
  padding: 1px;
`;

const Help = () => (
  <Div>
    <strong>* Tip</strong>: you can use JS-style regex. Try <Pre>/^電.+$/</Pre>{" "}
    to get words beginning with "電" (note that regex search is very slow).
  </Div>
);

export default Help;
