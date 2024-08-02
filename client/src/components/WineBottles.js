import React from "react";
import { createTheme } from "@mui/material/styles";
import * as colours from "../colours";
import WineBottleForm from "./WineBottlesForm";
import WineTypeForm from "./WineTypeForm";
import BasePage from "./BasePage";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function WineBottles() {
  return (
    <BasePage>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <div>
          <Typography
            variant="h3"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Josefin Slab",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: colours.DARK_GREEN,
              textDecoration: "none",
            }}
          >
            Wine Bottles
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              color: colours.MED_GREEN,
            }}
          >
            Find the average quality test scores per wine bottle!
          </Typography>
          <br />
          <WineBottleForm />
          <br />
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              color: colours.MED_GREEN,
            }}
          >
            Find the lowest average alcohol content of all the wine types!
          </Typography>
          <br />
          <WineTypeForm />
        </div>
      </Box>
    </BasePage>
  );
}
