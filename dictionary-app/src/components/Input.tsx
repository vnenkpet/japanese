import styled from "../styled-components";

export default styled.input`
  border: 1px solid ${props => props.theme.primaryColorInverted};
  padding: 10px;
  color: ${props => props.theme.primaryColorInverted};
  background: none;
  border-radius: 6px;
  margin-right: 6px;
  width: 200px;
  &::placeholder {
    color: ${props => props.theme.primaryColorInverted};
    opacity: 0.7;
  }
`;
