// import createTheme from "@mui/material/styles/createTheme";
// import { lighten, hexToRgb } from "@mui/material/styles";
import { createTheme, lighten, hexToRgb } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// CUSTOM STYLES
import brand from "./brand";
import { getCustomTypography } from "./typography";
import { getComponentStyleOverrides } from "./componentStyleOverrides";

// Set different theme colours for the dev mode
// const isDevMode = process.env.NODE_ENV === "development";
// const DEV_PRIMARY_COLOR = "#CA965C";
// const DEV_SECONDARY_COLOR = "#876445";

// Define(add) custom theme types
// https://mui.com/material-ui/customization/theming/#custom-variables
// https://dragoshmocrii.com/material-ui-custom-theme-and-typescript/
// type ExtraCommonColors = {
//   grey: string;
//   flag: string;
//   blue: string;
//   seafoam: string;
//   yellow: string;
// };

// TODO: refactor the Material UI custom theme declaration
// https://stackoverflow.com/questions/59365396/how-to-use-material-ui-custom-theme-in-react-with-typescript
// after adding eslint rules, cannot type override.
// declare module "@mui/material/styles/createPalette" {
//   type CommonColors = ExtraCommonColors;
// }

// type ExtraFontStyle = {
//   fontFamilyPoppins: React.CSSProperties["fontFamily"];
//   fontWeighExtraBold: React.CSSProperties["fontWeight"];
// };

// declare module "@mui/material/styles/createTypography" {
//   type FontStyle = ExtraFontStyle;
// }

// Initialise Material UI Theme
const theme = createTheme({
  palette: {
    // mode: !isDevMode ? "light" : "dark",
    common: {
      white: brand.palette.white,
      black: brand.palette.black,
      // grey: brand.palette.grey,
      // flag: brand.palette.flag,
      // blue: brand.palette.blue,
      // seafoam: brand.palette.seafoam,
      // yellow: brand.palette.yellow,
    },
    primary: {
      // main: !isDevMode ? brand.palette.blue : DEV_PRIMARY_COLOR,
      main: brand.palette.blue,
    },
    secondary: {
      // main: !isDevMode ? brand.palette.flag : DEV_SECONDARY_COLOR,
      main: brand.palette.flag,
    },
    error: {
      main: red[600],
    },
    warning: {
      light: lighten(hexToRgb(brand.palette.yellow), 0.85),
      main: brand.palette.yellow,
    },
  },
  typography: {
    fontFamily: brand.fontFamily.firaSans,
    // fontFamilyPoppins: brand.fontFamily.poppins,
    // fontWeighExtraBold: 800,
  },
  transitions: {
    duration: {
      shortest: 80,
      shorter: 160,
      short: 240,
      standard: 320,
      complex: 400,
    },
  },
});

// Custom typography
const updatedTypography = {
  ...theme.typography,
  ...getCustomTypography(theme),
};

theme.typography = updatedTypography;
theme.components = getComponentStyleOverrides(theme);

export default theme;
