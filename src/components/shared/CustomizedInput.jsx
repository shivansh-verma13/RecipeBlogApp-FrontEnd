// eslint-disable-next-line no-unused-vars
import React from "react";
import { TextField, useMediaQuery, useTheme } from "@mui/material";

// eslint-disable-next-line react/prop-types
export const CustomizedInput = ({ name, label, type }) => {
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
          fontSize: 20,
          color: "#000",
        },
      }}
      name={name}
      label={label}
      type={type}
    />
  );
};
