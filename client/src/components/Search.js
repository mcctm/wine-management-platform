import * as React from "react";
import { createTheme } from "@mui/material/styles";
import * as colours from "../colours";
import { Typography } from "@mui/material";

import BasePage from "./BasePage";
import SearchForm from "./SearchForm";

const backgroundBrown = colours.LIGHT_BROWN;
const theme = createTheme();

export default function Home() {
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
            Search
      </Typography>
      <br />
      <SearchForm />
    </div>
    </BasePage>
  );
}
