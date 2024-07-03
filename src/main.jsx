import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material";

axios.defaults.baseURL = "http://localhost:3002";
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: "Oswald, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="bottom-right" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
