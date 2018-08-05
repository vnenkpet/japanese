export interface IThemeInterface {
  primaryColor: string;
  primaryColorInverted: string;
}

// Define what props.theme will look like
const theme: IThemeInterface = {
  primaryColor: "#black",
  primaryColorInverted: "#white"
};

export default theme;
