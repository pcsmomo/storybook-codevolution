import { Theme } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

export const getCustomTypography = (theme: Theme) => {
  const typography: TypographyOptions = {};

  typography.h1 = {
    fontFamily: theme.typography.fontFamily,
    // fontFamily: theme.typography.fontFamilyPoppins,
    fontSize: theme.typography.pxToRem(32),
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 0,
    lineHeight: 46 / 32,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(42),
      lineHeight: 60 / 42,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: theme.typography.pxToRem(56),
      lineHeight: 78 / 56,
    },
  };

  typography.h2 = {
    fontFamily: theme.typography.fontFamily,
    // fontFamily: theme.typography.fontFamilyPoppins,
    fontSize: theme.typography.pxToRem(38),
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 0,
    lineHeight: 54 / 38,
    // fontSize: theme.typography.pxToRem(28),
    // lineHeight: 40 / 28,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(38),
      lineHeight: 54 / 38,
    },
  };

  typography.h3 = {
    fontFamily: theme.typography.fontFamily,
    // fontFamily: theme.typography.fontFamilyPoppins,
    fontSize: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 0,
    lineHeight: 34 / 24,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(30),
      lineHeight: 42 / 30,
    },
  };

  typography.h5 = {
    fontFamily: theme.typography.fontFamily,
    // fontFamily: theme.typography.fontFamilyPoppins,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 0,
    lineHeight: 26 / 18,
  };

  typography.body1 = {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightLight,
    letterSpacing: 0,
    lineHeight: 22 / 14,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: 24 / 16,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: theme.typography.pxToRem(18),
      lineHeight: 26 / 18,
    },
  };

  typography.body2 = {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightLight,
    letterSpacing: 0,
    lineHeight: 24 / 16,
    [theme.breakpoints.up("lg")]: {
      fontSize: theme.typography.pxToRem(18),
      lineHeight: 26 / 18,
    },
  };

  // typography.footer = {
  //   fontFamily: theme.typography.fontFamily,
  //   fontSize: theme.typography.pxToRem(12),
  //   fontWeight: theme.typography.fontWeightRegular,
  //   letterSpacing: 0,
  //   lineHeight: 14 / 12,
  //   [theme.breakpoints.up("lg")]: {
  //     fontSize: theme.typography.pxToRem(14),
  //     lineHeight: 18 / 14,
  //   },
  // };

  // typography.navLabel = {
  //   fontFamily: theme.typography.fontFamily,
  //   fontSize: theme.typography.pxToRem(16),
  //   fontWeight: theme.typography.fontWeightRegular,
  //   letterSpacing: 0,
  //   lineHeight: 20 / 16,
  // };

  // typography.navItem = {
  //   fontFamily: theme.typography.fontFamily,
  //   fontSize: theme.typography.pxToRem(24),
  //   fontWeight: theme.typography.fontWeightLight,
  //   letterSpacing: 0,
  //   lineHeight: 30 / 24,
  // };

  typography.button = {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
    letterSpacing: 0,
    lineHeight: 1,
    textTransform: "uppercase",
  };

  // Set typography gradient clip
  // typography.gradient = {
  //   "-webkit-background-clip": "text",
  //   "-webkit-text-fill-color": "transparent",
  //   backgroundClip: "text",
  //   backgroundImage: `linear-gradient(left, ${theme.palette.common.flag} 0%, \
  //                    ${theme.palette.common.blue} 50%, ${theme.palette.common.seafoam} 100%)`,
  //   color: theme.palette.common.blue,
  // };

  return typography;
};
