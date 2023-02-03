import { Theme } from "@mui/material/styles/createTheme";
import { lighten } from "@mui/material/styles";

export const getComponentStyleOverrides = (theme: Theme) => {
  const textColor = theme.palette.text.primary;
  const menuSelected = theme.palette.primary.dark;
  const menuSelectedBack = lighten(theme.palette.primary.light, 0.75);

  return {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: textColor,
          paddingTop: "10px",
          paddingBottom: "10px",
          "&.Mui-selected": {
            color: menuSelected,
            backgroundColor: menuSelectedBack,
            "&:hover": {
              backgroundColor: menuSelectedBack,
            },
            "& .MuiListItemIcon-root": {
              color: menuSelected,
            },
          },
          "&:hover": {
            backgroundColor: menuSelectedBack,
            color: menuSelected,
            "& .MuiListItemIcon-root": {
              color: menuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: textColor,
          minWidth: "36px",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: theme.typography.subtitle2.fontSize,
        },
      },
    },
  };
};
