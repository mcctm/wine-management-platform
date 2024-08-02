import * as React from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./Navbar";
import * as colours from "../colours";

const backgroundBrown = colours.LIGHT_BROWN;
const theme = createTheme();

export default function BasePage(props) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar></Navbar>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: backgroundBrown,
          overflow: "hidden",
          backgroundPosition: "center",
          backgroundRepeat: "no-repear",
          backgroundSize: "cover",
        }}
      >
        {props.children}
      </Box>
    </ThemeProvider>
  );
}
