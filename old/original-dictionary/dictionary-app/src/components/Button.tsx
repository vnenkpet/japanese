import Button from "@material-ui/core/Button";
import styled from "../styled-components";

// tslint:disable
export default styled(Button)`
  border: 1px solid ${props => props.theme.primaryColorInverted};
  padding: 10px;
  color: ${props => props.theme.primaryColorInverted};
  background: none;
  border-radius: 6px;
  margin-right: 6px;
  cursor: pointer;
`;
