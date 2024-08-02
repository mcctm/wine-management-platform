import React, { Fragment, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as colours from "../colours";
import GrapeGroupByForm from "./GrapeGroupByForm";
import BasePage from "./BasePage";
import Typography from "@mui/material/Typography";
import GrapeDivisionForm from "./GrapeDivisionForm";

const backgroundBrown = colours.LIGHT_BROWN;
const theme = createTheme();

export default function GrapeProduction() {
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
          Grape Production
        </Typography>
        <br />
        <Typography 
            variant="h6"
            sx={{ 
                mr:2,
                color: colours.MED_GREEN
            }}
        > 
          Find out how many grape clusters are produced each season:
        </Typography>
        <GrapeGroupByForm />
        <Typography 
            variant="h6"
            sx={{ 
                mr:2,
                mt:10,
                mb:2,
                color: colours.MED_GREEN
            }}
        > 
          The experienced ones! Viticulturists who've grown grapes for ALL existing grape clusters:
        </Typography>
        <GrapeDivisionForm />
      </div>
    </BasePage>
  );
}
