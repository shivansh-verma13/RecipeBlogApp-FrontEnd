import axios from "axios";

export const loginUser = async (userName, password) => {
  const res = await axios.post("/auth/login", {
    userName,
    password,
  });
  if (res.status !== 200) {
    throw new Error("Unable to Login!");
  }
  const data = await res.data;
  return data;
};

export const registerUser = async (userName, password, tagline, name) => {
  const res = await axios.post("/auth/register", {
    userName,
    password,
    tagline,
    name,
  });
  console.log(res);
  if (res.status !== 201) {
    throw new Error("Unable to Register!");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/auth/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to Authenticate!");
  }
  const data = await res.data;
  return data;
};

export const userLogout = async () => {
  const res = await axios.get("/auth/logout");
  if (res.status !== 200) {
    throw new Error("Unable to Logout!");
  }
  const data = await res.data;
  return data;
};

export const createRecipe = async (recipe) => {
  const res = await axios.post("/recipes/new-recipe", { recipe });
  if (res.status !== 200) {
    throw new Error("Unable to Create Recipe!");
  }
  const data = await res.data;
  return data;
};

export const getRecipes = async () => {
  const res = await axios.get("/recipes");
  if (res.status !== 200) {
    throw new Error("Unable to Fetch Recipes!");
  }
  const data = await res.data;
  return data;
};

export const saveRecipe = async (recipeID) => {
  const res = await axios.put("/recipes/save-recipe", { recipeID });
  if (res.status !== 200) {
    throw new Error("Unable to Save Recipe!");
  }
  const data = await res.data;
  return data;
};

export const likeRecipe = async (recipeID) => {
  const res = await axios.put("/recipes/like-recipe", { recipeID });
  if (res.status !== 200) {
    throw new Error("Unable to Like Recipe");
  }
  const data = await res.data;
  return data;
};

export const unlikeRecipe = async (recipeID) => {
  const res = await axios.delete(`/recipes/like-recipe/${recipeID}`);
  if(res.status !== 200) {
    throw new Error("Unable to unlike the recipe");
  }
  const data = await res.data;
  return data;
}

export const getLikedRecipesID = async () => {
  const res = await axios.get("/recipes/liked-recipes/ids");
  if (res.status !== 200) {
    throw new Error("Unable to fetch any liked recipes IDs");
  }
  const data = await res.data;
  return data;
};

export const getSavedRecipesID = async () => {
  const res = await axios.get("/recipes/saved-recipes/ids");
  if (res.status !== 200) {
    throw new Error("Unable to fetch any saved recipes IDs");
  }
  const data = await res.data;
  return data;
};

export const getSavedRecipes = async () => {
  const res = await axios.get("/recipes/saved-recipes");
  if (res.status !== 200) {
    throw new Error("Unable to fetch any saved recipes");
  }
  const data = await res.data;
  return data;
};

export const deleteSavedRecipe = async (recipeID) => {
  // console.log(recipeID);
  const res = await axios.delete(`/recipes/saved-recipes/${recipeID}`);
  if (res.status !== 200) {
    throw new Error("Unable to delete saved recipe");
  }
  const data = await res.data;
  return data;
};
