import { createTheme } from "@mui/material/styles";

export const lighttheme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#44475a",
    },
    warning: {
      main: "#6272a4",
    },
    info: {
      main: "#bd93f9",
    },
    sidebtn: {
      main: "#5bbbff",
    },
    footerbg: {
      main: "#001829",
    },
    listcolor:{
      main:"#c7c7c7"
    }
  },
  typography: {
    fontFamily: "tanha,vazir, roboto",
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#001829",
          color: "white",
        },
      },
    },
  },
});
