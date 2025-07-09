"use client";
import { Box, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const path = usePathname();

  return (
    <ThemeProvider theme={theme}>
      <Box position="relative">
        {!path.startsWith("/auth") && <Navbar />}
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
