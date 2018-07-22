import { Children } from "react";
import { injectGlobal, withTheme } from "./styled-components";
import { IThemeInterface } from "./theme";

const Global = ({
  theme,
  children
}: {
  theme: IThemeInterface;
  children: any;
}) => {
  // tslint:disable-next-line
  injectGlobal`
    @import url('https://fonts.googleapis.com/css?family=Lato');
    
    body {
      font-family: "Lato", sans-serif;
      color: ${theme.primaryColorInverted}
      background: ${theme.primaryColor}
    }
    *:focus {
      outline: none;
    }
  `;
  return Children.only(children);
};

export default withTheme(Global);
