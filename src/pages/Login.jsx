// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CustomizedInput } from "../components/shared/CustomizedInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { Footer } from "../components/shared/Footer";

export const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("userName");
    const password = formData.get("password");
    try {
      toast.loading("Logging In User...", { id: "login" });
      await auth?.login(userName, password);
      toast.success("User Logged In Successfully", { id: "login" });
      navigate("/");
    } catch (e) {
      console.log(e);
      toast.error("User Logging In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.userId) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <Box width={"100%"} height={"100%"} m={0}>
      <Box width={"100%"} height={"100%"} display="flex">
        <Box
          sx={{
            pr: 8,
            ml: 0,
            zIndex: 0,
            display: { md: "flex", sm: "none", xs: "none" },
          }}
        >
          <img
            src="food.png"
            alt="food-img"
            style={{
              width: "50vw",
              height: "100vh",
              objectFit: "cover",
              zIndex: 0,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // ml: "8%",
            pt: "10vh",
            m: "auto",
            mb: { sm: 5, xs: 5 },
            width: { md: "100%", sm: "80%", xs: "80%" },
          }}
        >
          <form
            onSubmit={handleLogin}
            style={{
              borderRadius: 5,
              border: "none",
              boxShadow: "1px 1px 20px #000",
              margin: !isBelowMd ? "auto" : 0,
              padding: { md: 16, sm: 0, xs: 0 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                m: { sm: 2, xs: 2 },
              }}
            >
              <Typography
                variant="h4"
                textAlign="center"
                padding={2}
                fontWeight={600}
              >
                LOGIN
              </Typography>
              <CustomizedInput type="text" name="userName" label="UserName" />
              <CustomizedInput
                type="password"
                name="password"
                label="Password"
              />
              <Button
                type="submit"
                sx={{
                  fontWeight: "bold",
                  width: { md: "350px", sm: "300px", xs: "300px" },
                  bgcolor: "#000",
                  color: "#fff",
                  borderRadius: 10,
                  px: 2,
                  py: 1,
                  my: 1,
                  letterSpacing: 1,
                  fontSize: "1.1rem",
                  ":hover": {
                    bgcolor: "#272829",
                    color: "#fff",
                  },
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/auth")}
                sx={{
                  color: "#005B41",
                  width: { md: "350px", sm: "300px", xs: "300px" },
                  fontWeight: "bold",
                  px: 2,
                  py: 1,
                  my: 1,
                  borderRadius: 10,
                  fontSize: "0.8rem",
                  ":hover": {
                    bgcolor: "#D8D9DA",
                    color: "#445D48",
                  },
                }}
              >
                New User? Register Here
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
