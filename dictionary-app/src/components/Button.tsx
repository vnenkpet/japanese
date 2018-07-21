import styled from "../styled-components";

// tslint:disable
export default styled.button`
  border: 1px solid white;
  padding: 10px;
  color: ${props => props.theme.fontColor}
  background: none;
  border-radius: 6px;
  margin-right: 6px;
  cursor: pointer;
`;
