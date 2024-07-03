import { useLayoutEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  deleteSavedRecipe,
  getLikedRecipesID,
  getRecipes,
  getSavedRecipesID,
  likeRecipe,
  saveRecipe,
  unlikeRecipe,
} from "../helpers/api-communicators";
import {
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RecipeCard } from "../components/RecipeCard";
import TypingAnimation from "../components/typer/TypingAnimation";
import { FooterHome } from "../components/shared/FooterHome";
import { SiFoodpanda } from "react-icons/si";
import { useGetUserID } from "../hooks/useGetUserID";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/shared/Footer";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const userID = useGetUserID();
  const auth = useAuth();
  const navigate = useNavigate();

  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleSaveRecipe = async (recipeID) => {
    try {
      if (auth?.userId && auth?.isLoggedIn) {
        toast.loading("Saving the Recipe...", { id: "saveingRecipe" });
        const response = await saveRecipe(recipeID);
        setSavedRecipes(response.savedRecipes);
        window.location.reload();
        toast.success("Saved the Recipe Successfully", { id: "saveingRecipe" });
      } else {
        navigate("/auth");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Saving the Recipe Failed", { id: "saveingRecipe" });
    }
  };

  const handleUnsavingRecipe = async (recipeID) => {
    try {
      if (auth?.userId && auth?.isLoggedIn) {
        toast.loading("Unsaving the Recipe...", { id: "unsavingRecipe" });
        const response = await deleteSavedRecipe(recipeID);
        window.location.reload();
        setSavedRecipes(response.savedRecipes);
        toast.success("Unsaved the Recipe Successfully", {
          id: "unsavingRecipe",
        });
      } else {
        navigate("/auth");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unsaving the Recipe Failed", { id: "unsavingRecipe" });
    }
  };

  const handleLikingRecipe = async (recipeID) => {
    try {
      if (auth?.user && auth?.isLoggedIn) {
        const response = await likeRecipe(recipeID);
        setLikedRecipes(response.likedRecipes);
        // Update the specific recipe in the state
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe._id === recipeID
              ? { ...recipe, likes: recipe.likes + 1 }
              : recipe
          )
        );
      } else {
        navigate("/auth");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to like the recipe", { id: "likingRecipe" });
    }
  };

  const handleUnlikingRecipe = async (recipeID) => {
    try {
      if (auth?.user && auth?.isLoggedIn) {
        const response = await unlikeRecipe(recipeID);
        setLikedRecipes(response.likedRecipes);
        // Update the specific recipe in the state
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe._id === recipeID
              ? { ...recipe, likes: recipe.likes - 1 }
              : recipe
          )
        );
      } else {
        navigate("/auth");
      }
    } catch (err) {
      console.log(err);
      toast.error("Unable to unlike the recipe", { id: "unlikeRecipe" });
    }
  };

  useLayoutEffect(() => {
    const fetchRecipe = async () => {
      try {
        toast.loading("Loading Recipes...", { id: "recipes" });
        const res = await getRecipes();
        setRecipes(res.response);
        toast.success("Loaded Recipes!", { id: "recipes" });
      } catch (err) {
        console.log(err);
        toast.error("Failed to Load Recipes", { id: "recipes" });
      }
    };

    const fetchSavedRecipes = async () => {
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

    const fetchLikedRecipes = async () => {
      try {
        toast.loading("Loading Liked Recipes...", { id: "likedRecipes" });
        const res = await getLikedRecipesID();
        setLikedRecipes(res.likedRecipes);
        toast.success("Loaded Liked Recipes Successfully", {
          id: "likedRecipes",
        });
      } catch (err) {
        console.log(err.message);
        toast.error("Loading Liked Recipes Failed", { id: "likedRecipes" });
      }
    };

    fetchRecipe();
    if (auth?.userId && auth?.isLoggedIn) {
      fetchSavedRecipes();
      fetchLikedRecipes();
    }
  }, [auth?.isLoggedIn, auth?.userId, userID]);

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
          position: "relative",
        }}
      >
        <Box
          // width={"50%"}
          height={"250px"}
          displapy="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          sx={{
            position: { md: "fixed" },
            top: "6%",
            left: 0,
            width: { md: "25%", sm: "80%", xs: "80%" },
            bgcolor: "#FEFBF6",
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
            sx={{
              borderRadius: "50%",
              m: "auto",
              bgcolor: "#7F5283",
              color: "#fff",
            }}
          >
            {auth?.isLoggedIn
              ? auth?.user?.name[0] + auth?.user?.name.split(" ")[1][0]
              : "U"}
          </Avatar>
          <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
            RECIPES
          </Typography>
          {recipes.map((recipe, index) => (
            <RecipeCard
              recipe={recipe}
              key={index}
              onSave={handleSaveRecipe}
              onUnSave={handleUnsavingRecipe}
              savedRecipes={savedRecipes}
              onLike={handleLikingRecipe}
              onUnlike={handleUnlikingRecipe}
              likedRecipes={likedRecipes}
              isSaved={savedRecipes.includes(recipe._id)}
              isLiked={likedRecipes.includes(recipe._id)}
            />
          ))}
        </Box>

        <Box
          width={"25%"}
          height={"600px"}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          sx={{
            position: "fixed",
            top: "6%",
            right: 0,
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
          <TypingAnimation />
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
              src="createrecipe.png"
              className="rotate"
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
