import React, { Fragment, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as colours from "../colours";
import WineProdForm from "./WineProdForm";
import BasePage from "./BasePage";
import Typography from "@mui/material/Typography";

const backgroundBrown = colours.LIGHT_BROWN;
const theme = createTheme();

export default function WineProduction() {
  return (
    <BasePage>
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
          Wine Production
        </Typography>
        <br />
        <Typography 
            variant="h6"
            sx={{ 
                mr:2,
                color: colours.MED_GREEN
            }}
        > 
          All about our wine batches! Use the dropdown to filter certain columns.
        </Typography>
        <WineProdForm />
      </div>
    </BasePage>
  );
}
