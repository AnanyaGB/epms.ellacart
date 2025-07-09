const { createTheme } = require("@mui/material");

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "1rem",
          borderRadius: "0.5rem",
        },
      },
    },
  },
});

export { theme };
