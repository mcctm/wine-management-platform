import React from "react";
import * as colours from "../colours";
import Typography from "@mui/material/Typography";

import BasePage from "./BasePage";
import SupplierForm from "./SupplierForm";

export default function Suppliers() {
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
          Wood Suppliers
        </Typography>
        <br />
        <Typography
          variant="h6"
          sx={{
            ml: "10px",
            color: colours.MED_GREEN,
          }}
        >
          Search wood supplier information by wine batch ID:
        </Typography>
        <div>
          <SupplierForm />
        </div>
      </div>
    </BasePage>
  );
}
