import styled from "../styled-components";

export default styled.input`
  border: 1px solid white;
  padding: 10px;
  color: ${props => props.theme.fontColor};
  background: none;
  border-radius: 6px;
  margin-right: 6px;
  width: 200px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;
