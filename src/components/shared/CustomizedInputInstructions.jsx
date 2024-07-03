/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { TextField, useMediaQuery, useTheme } from "@mui/material";

// eslint-disable-next-line react/prop-types
export const CustomizedInputInstructions = (props) => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <TextField
      margin="normal"
      autoComplete="off"
      InputLabelProps={{ style: { color: "#000" } }}
      InputProps={{
        style: {
          width: !isBelowMd ? "350px" : "300px",
          borderRadius: 10,
          fontSize: 15,
          color: "#000",
        },
      }}
      multiline
      rows={4}
      onChange={props.onChange}
      name={props.name}
      label={props.label}
      type={props.type}
    />
  );
};
