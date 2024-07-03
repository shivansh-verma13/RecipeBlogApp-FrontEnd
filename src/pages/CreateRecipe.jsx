import { Box, Typography, Button, Fab, Zoom } from "@mui/material";
import { CustomizedInputRecipe } from "../components/shared/CustomizedInputRecipe";
import { Footer } from "../components/shared/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { createRecipe } from "../helpers/api-communicators";
import { useGetUserID } from "../hooks/useGetUserID";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CustomizedInputIngredient } from "../components/shared/CustomizedInputIngredient";
import { CustomizedInputInstructions } from "../components/shared/CustomizedInputInstructions";
import AddIcon from "@mui/icons-material/Add";
// import image from "../../public/juice.png";

export const CreateRecipes = () => {
  const auth = useAuth();
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    description: "",
    instructions: "",
    imageURL: "",
    cookingTime: 0,
    userOwnerId: userID,
    userOwnerName: auth?.user?.name,
  });
  const [button, setButton] = useState(false);

  useEffect(() => {
    if (!auth?.userId) {
      navigate("/auth");
    }
  });

  const handleRecipe = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Creating Your Recipe...", { id: "create-recipe" });
      await createRecipe(recipe);
      toast.success("Your Recipe has been created", { id: "create-recipe" });
    } catch (error) {
      console.log(error);
      toast.error("Recipe Creation Failed", { id: "create-recipe" });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleButton = () => {
    setButton(true);
  };

  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        width={"100%"}
        height={"100%"}
        display="flex"
        justifyContent={"space-evenly"}
        sx={{ bgcolor: "#EEF5FF" }}
      >
        <Box
          width={"100%"}
          height={"100%"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={7}
          p={2}
          sx={{
            width: { md: "100%", sm: "80%", xs: "80%" },
            margin: { md: 20, sm: "40px 0px", xs: "40px 0px" },
            borderRadius: 10,
            boxShadow: "1px 1px 20px #000",
            bgcolor: "#FEFBF6",
          }}
        >
          <Box
            width={"100%"}
            height={"100%"}
            display="flex"
            justifyContent="center"
            p={0}
          >
            <Typography
              sx={{ color: "#7F5283" }}
              variant="h4"
              textAlign="center"
              p={2}
              fontWeight={600}
            >
              Create Your Recipe!!!
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <form
              className="form-scrollings"
              onSubmit={handleRecipe}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomizedInputRecipe
                name="name"
                label="Name"
                type="text"
                value={recipe.name}
                onChange={handleChange}
              />
              <Box
                width={"100%"}
                height={"100%"}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  ml: { sm: "auto", xs: "auto" },
                }}
              >
                {recipe.ingredients.map((ingredient, index) => (
                  <CustomizedInputIngredient
                    key={index}
                    name="ingredient"
                    label="Ingredient"
                    type="text"
                    value={ingredient}
                    onClick={handleButton}
                    onChange={(event) => handleIngredientChange(event, index)}
                  />
                ))}

                <Zoom
                  in={button}
                  sx={{
                    position: "absolute",
                    bottom: "-20px",
                    left: { md: 280, sm: 230, xs: 230 },
                    backgroundColor: "#7F5283",
                    color: "#FEFBF6",
                    ":hover": {
                      bgcolor: "#272829",
                      color: "#7F5283",
                    },
                  }}
                >
                  <Fab onClick={handleAddIngredient}>
                    <AddIcon />
                  </Fab>
                </Zoom>
              </Box>
              <CustomizedInputInstructions
                name="description"
                label="Description"
                type="text"
                value={recipe.description}
                onChange={handleChange}
              />

              <CustomizedInputInstructions
                name="instructions"
                label="Instructions"
                type="text"
                value={recipe.instructions}
                onChange={handleChange}
              />

              <CustomizedInputRecipe
                name="imageURL"
                label="Image URL"
                type="text"
                value={recipe.imageURL}
                onChange={handleChange}
              />
              <CustomizedInputRecipe
                name="cookingTime"
                label="Cooking Time"
                type="number"
                value={recipe.cookingTime}
                onChange={handleChange}
              />
              <Button
                type="submit"
                sx={{
                  fontWeight: "bold",
                  width: { md: "350px", sm: "300px", xs: "300px" },
                  bgcolor: "#7F5283",
                  color: "#F3F8FF",
                  borderRadius: 10,
                  px: 2,
                  py: 1,
                  my: 1,
                  letterSpacing: 0.5,
                  fontSize: "1.1rem",
                  ":hover": {
                    bgcolor: "#272829",
                    color: "#7F5283",
                  },
                }}
              >
                Create
              </Button>
            </form>
          </Box>
        </Box>
        <Box
          width={"100%"}
          height={"100%"}
          sx={{
            display: { md: "flex", sm: "none", xs: "none" },
          }}
        >
          <img
            src="juice.png"
            alt="juice-img"
            className="juice-pic"
            style={{
              width: "50vw",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
