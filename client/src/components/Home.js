import * as React from "react";
import * as colours from "../colours";
import { Typography } from "@mui/material";
import BasePage from "./BasePage";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import vinyard from "../images/vinyard.jpg";

const styles = {
  paperContainer: {
    backgroundImage: `url(${vinyard})`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: "80%",
  },
};

export default function Home() {
  return (
    <BasePage>
      <Paper style={styles.paperContainer}>
        <Typography
          variant="h3"
          noWrap
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "Josefin Slab",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "#fff",
            textDecoration: "none",
            fontSize: "5rem",
          }}
        >
          Welcome to MAE Winery
        </Typography>
      </Paper>
    </BasePage>
  );
}
