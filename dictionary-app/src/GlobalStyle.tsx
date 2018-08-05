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
      overflow-anchor: none;
      font-family: 'Roboto', sans-serif;
    }

    *:focus {
      outline: none;
    }
  `;
  return Children.only(children);
};

export default withTheme(Global);
