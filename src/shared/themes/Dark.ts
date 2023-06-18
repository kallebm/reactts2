import { createTheme } from "@mui/material";
import { yellow, cyan } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: "#ffffffff",
    },
    secondary: {
      main: cyan[700],
      dark: cyan[800],
      light: cyan[500],
      contrastText: "#ffffffff",
    },
    background: {
      paper: "#303134",
      default: "#202124",
    },
  },
});
