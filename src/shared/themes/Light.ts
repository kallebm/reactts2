import { createTheme } from "@mui/material";
import { yellow, cyan } from "@mui/material/colors";

export const LightTheme = createTheme({
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
      paper: "#ffffffff",
      default: "#f7f6f3",
    },
  },
});
