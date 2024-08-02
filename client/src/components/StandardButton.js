import React from "react";
import * as colours from "../colours";
import Button from "@mui/material/Button";

export default function StandardButton(props) {
  const buttoncolor = colours.DARK_GREEN;
  const hovercolor = colours.LIGHT_GREEN;
  return (
    <main>
      <div>
        <Button
          href={props.href}
          variant="contained"
          sx={{
            fontSize: "12px",
            backgroundColor: buttoncolor,
            "&:hover": {
              backgroundColor: hovercolor,
              color: buttoncolor,
            },
          }}
        >
          {props.label}
        </Button>
      </div>
    </main>
  );
}
