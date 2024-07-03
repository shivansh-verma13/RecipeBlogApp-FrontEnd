import { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  getSavedRecipes,
  saveRecipe,
  getSavedRecipesID,
  deleteSavedRecipe,
} from "../helpers/api-communicators";
import {
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RecipeCard } from "../components/RecipeCard";
import { FooterHome } from "../components/shared/FooterHome";
import { SiFoodpanda } from "react-icons/si";
import { useGetUserID } from "../hooks/useGetUserID";
import TypingAnimationSaved from "../components/typer/TypingAnimationSaved";
import { IoSave } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/shared/Footer";

export const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const auth = useAuth();
  const navigate = useNavigate();

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleSaveRecipe = async (recipeID) => {
    try {
      toast.loading("Saving the Recipe...", { id: "savingRecipe" });
      const response = await saveRecipe(recipeID);
      setSavedRecipes(response.savedRecipes);
      toast.success("Saved the Recipe Successfully", { id: "savingRecipe" });
    } catch (err) {
      console.log(err.message);
      toast.error("Saving the Recipe Failed", { id: "savingRecipe" });
    }
  };

  const handleUnsavingRecipe = async (recipeID) => {
    try {
      if (auth?.userId && auth?.isLoggedIn) {
        toast.loading("Unsaving the Recipe...", { id: "unsavingRecipe" });
        const response = await deleteSavedRecipe(recipeID);
        console.log(response);
        toast.loading("Unsaving the Recipe...", { id: "unsavingRecipe" });
      } else {
        navigate("/auth");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unsaving the Recipe Failed", { id: "unsavingRecipe" });
    }
  };

  useEffect(() => {
    if (!auth?.userId) {
      navigate("/auth");
    }
  });

  useLayoutEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        toast.loading("Loading Saved Recipes...", { id: "savedRecipes" });
        const res = await getSavedRecipes();
        setRecipes(res.savedRecipes);
        toast.success("Loaded Saved Recipes Successfully!", {
          id: "savedRecipes",
        });
      } catch (err) {
        console.log(err);
        toast.error("Failed to Load Saved Recipes", { id: "savedRecipes" });
      }
    };

    const fetchSavedRecipesID = async () => {
      try {
        toast.loading("Loading Saved Recipes...", { id: "savedRecipes" });
        const res = await getSavedRecipesID();
        setSavedRecipes(res.savedRecipes);
        toast.success("Loaded Saved Recipes Successfully", {
          id: "savedRecipes",
        });
      } catch (err) {
        console.log(err.message);
        toast.error("Loading Saved Recipes Failed", { id: "savedRecipes" });
      }
    };

    fetchSavedRecipes();
    fetchSavedRecipesID();
  }, [userID]);

  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        width={"100%"}
        height={"100%"}
        display="flex"
        justifyContent="center"
        sx={{
          bgcolor: "#EEF5FF",
          flexDirection: { md: "row", sm: "column", xs: "column" },
        }}
      >
        <Box
          width={"50%"}
          height={"100%"}
          displapy="flex"
          flexDirection="column"
          sx={{
            bgcolor: "#FEFBF6",
            width: { md: "50%", sm: "80%", xs: "80%" },
            boxShadow: "1px 1px 20px #000",
            m: { md: 5, sm: "auto", xs: "auto" },
            mr: 2,
            ml: 2,
            p: 2,
            mt: { sm: 2, xs: 2 },
            borderRadius: 2,
          }}
        >
          <Typography sx={{ fontSize: 45, textAlign: "center", p: 2, mb: 2 }}>
            RecipeBl
            <SiFoodpanda />g
          </Typography>
          <hr style={{ width: "100%", backgroundColor: "#000" }} />
          <Avatar
            sx={{ borderRadius: "50%", bgcolor: "#7F5283", color: "#fff" }}
          >
            {auth?.isLoggedIn
              ? auth?.user?.name[0] + auth?.user?.name.split(" ")[1][0]
              : "U"}
          </Avatar>
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
            {" "}
            {auth?.isLoggedIn ? auth?.user?.name : "User"}
          </Typography>
          <Typography sx={{ fontSize: 15 }}>
            {auth?.isLoggedIn ? auth?.user?.tagline : "Tagline"}
          </Typography>
        </Box>
        <Box
          width={"100%"}
          height={"100%"}
          sx={{
            width: { sm: "90%", xs: "90%" },
            m: { md: "auto", xs: "auto" },
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              mt: 5,
              fontSize: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            S<IoSave />
            ved Recipes
          </Typography>
          {recipes.map((recipe, index) => (
            <RecipeCard
              recipe={recipe}
              key={index}
              onSave={handleSaveRecipe}
              onUnSave={handleUnsavingRecipe}
              savedRecipes={savedRecipes}
            />
          ))}
        </Box>

        <Box
          width={"70%"}
          height={"100%"}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          sx={{
            display: { md: "flex", sm: "none", xs: "none" },
            boxShadow: "1px 1px 20px #000",
            m: 5,
            mr: 5,
            ml: 2,
            p: 2,
            borderRadius: 2,
            bgcolor: "#FEFBF6",
          }}
        >
          <TypingAnimationSaved />
          <hr style={{ width: "100%", backgroundColor: "#000" }} />
          <Box
            width={"100%"}
            height={"100%"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: "auto",
            }}
          >
            <img
              src="fooditems.png"
              className="img-shadow"
              alt="food-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <FooterHome />
        </Box>
        {isBelowMd && <Footer />}
      </Box>
    </Box>
  );
};
