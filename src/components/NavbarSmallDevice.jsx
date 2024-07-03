import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function NavbarSmallDevices() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      toast.loading("Logging Out User...", { id: "logout" });
      await auth.logout();
      toast.success("Logged Out User Successfully", { id: "logout" });
      handleClose();
    } catch (err) {
      toast.error("Logged Out Failed", { id: "logout" });
    }
  };

  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row-reverse" }}>
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{
            bgcolor: "#fff",
            color: "#000",
            "&hover": {bgcolor: "7F5283", color: "#fff"}
          }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              navigate("/");
              handleClose();
            }}
          >
            HOME
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/create-recipe");
              handleClose();
            }}
          >
            CREATE RECIPE
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/saved-recipes");
              handleClose();
            }}
          >
            SAVED RECIPE
          </MenuItem>
          {auth?.isLoggedIn ? (
            <MenuItem
              sx={{
                backgroundColor: "#D8D9DA",
                borderRadius: 20,
                color: "#000",
                fontWeight: "bold",
                fontSize: "0.9rem",
                padding: "0px 20px",
                ":hover": {
                  backgroundColor: "#606470",
                  color: "#CACACA",
                },
              }}
              onClick={handleLogout}
            >
              LOGOUT
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                navigate("/auth");
                handleClose();
              }}
            >
              REGISTER/LOGIN{" "}
            </MenuItem>
          )}
        </Menu>
      </div>
    </Box>
  );
}
