import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import toast from "react-hot-toast";
import { SiFoodpanda } from "react-icons/si";
import NavbarSmallDevices from "./NavbarSmallDevice";

export const Navbar = () => {
  const auth = useAuth();
  const handleLogout = async () => {
    try {
      toast.loading("Logging Out User...", { id: "logout" });
      await auth.logout();
      toast.success("Logged Out User Successfully", { id: "logout" });
      // window.location.reload();
    } catch (err) {
      toast.error("Logged Out Failed", { id: "logout" });
    }
  };
  const navigate = useNavigate();

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  const foodpandaIconStyle = {
    fontSize: "2rem",
    cursor: "pointer",
  };

  return (
    <div className="header" style={{ zIndex: 1 }}>
      <div
        style={{
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          padding: "8px 8px",
          marginRight: "auto",
          textTransform: "none",
        }}
      >
        <SiFoodpanda onClick={() => navigate("/")} style={foodpandaIconStyle} />
        RecipeBlog
      </div>
      {!isBelowMd && (
        <div
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            display: "flex",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/create-recipe">
            Create Recipe
          </Link>
          <Link className="nav-link" to="/saved-recipes">
            Saved Recipe
          </Link>
        </div>
      )}
      {isBelowMd ? (
        <NavbarSmallDevices />
      ) : (
        <>
          {auth?.isLoggedIn ? (
            <Button
              onClick={handleLogout}
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
            >
              logout
            </Button>
          ) : (
            <Link className="nav-link" to="/auth">
              Login/Register
            </Link>
          )}
        </>
      )}
    </div>
  );
};
