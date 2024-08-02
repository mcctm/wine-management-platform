import React from "react";
import { createTheme } from "@mui/material/styles";
import * as colours from "../colours";
import Typography from "@mui/material/Typography";

import BasePage from "./BasePage";
import InsertEmployee from "./InsertEmployee";
import EmployeeForm from "./EmployeeForm";

export default function Employees() {
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
            Winemakers
        </Typography>
        <br />
        <InsertEmployee />
        <EmployeeForm />
    </div>

    </BasePage>
    );
}