import PropTypes from "prop-types";
import { useState } from "react";
import { IoSave } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Collapse,
  Button,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";

const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const RecipeCard = ({
  recipe,
  onSave,
  onUnSave,
  // savedRecipes,
  onLike,
  onUnlike,
  // likedRecipes,
  isSaved,
  isLiked,
}) => {
  const [expanded, setExpanded] = useState(false);
  const capitalizeFisrtLetter = (str) => {
    if (str.length === 0) {
      return str;
    }
    const words = str.split(" ");
    const capitalizeWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizeWords.join(" ");
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // const handleSave = () => {
  //   if (isSaved) {
  //     onUnSave(recipe._id);
  //   } else {
  //     onSave(recipe._id);
  //   }
  // };

  // const handleLike = () => {
  //   if (isLiked) {
  //     onUnlike(recipe._id);
  //   } else {
  //     onLike(recipe._id);
  //   }
  // };

  // const isRecipeSaved = (id) => savedRecipes.includes(id);
  // const isRecipeLiked = (id) => likedRecipes.includes(id);

  return (
    <Card
      sx={{
        width: { md: 500, sm: "100%", xs: "100%" },
        maxWidth: 500,
        mt: 5,
        mb: 2,
        borderRadius: 2,
        boxShadow: "1px 1px 20px #000",
        bgcolor: "#FEFBF6",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#7F5283" }} aria-label="recipe">
            {capitalizeFisrtLetter(recipe.name[0])}
          </Avatar>
        }
        title={capitalizeFisrtLetter(recipe.name)}
        subheader={"By " + recipe.userOwnerName}
      />
      <CardMedia
        component="img"
        height="194"
        image={recipe.imageURL}
        alt={recipe.name + "-img"}
      />
      <CardContent>
        <Typography
          paragraph
          color="text.secondary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Description:{" "}
          <Typography
            component={"span"}
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton>
              <CommentIcon sx={{}} />
            </IconButton>
            <Typography component={"span"}>
              <IconButton
                onClick={() =>
                  !isLiked
                    ? onLike(recipe._id)
                    : onUnlike(recipe._id)
                }
              >
                <FavoriteIcon
                  // color="primary"
                  sx={{ color: isLiked ? "#C80036" : "primary" }}
                />
              </IconButton>
              {recipe.likesCount > 0 && recipe.likesCount}
            </Typography>
          </Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {!isSaved ? (
          <Button
            aria-label="add to favorites"
            variant="contained"
            onClick={() => onSave(recipe._id)}
            sx={{
              borderRadius: 2,
              bgcolor: "#7F5283",
              ":hover": {
                bgcolor: "#000",
                color: "#7F5283",
              },
            }}
            endIcon={<IoSave />}
          >
            Save
          </Button>
        ) : (
          <>
            <Button
              aria-label="add to favorites"
              variant="contained"
              onClick={() => onUnSave(recipe._id)}
              sx={{
                borderRadius: 2,
                bgcolor: "#000",
                color: "#7F5283",
                ":hover": {
                  bgcolor: "#7F5283",
                  color: "#000",
                },
              }}
              endIcon={<MdDelete />}
            >
              Unsave
            </Button>
          </>
        )}
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Instructions:</Typography>
          <Typography variant="body2">{recipe.instructions}</Typography>
          <Typography paragraph sx={{ mt: 2 }}>
            Ingredients:
          </Typography>
          {recipe.ingredients.map((ingredient, index) => (
            <Typography variant="body2" key={index}>
              {ingredient}
            </Typography>
          ))}

          <Typography paragraph sx={{ mt: 2 }}>
            Cooking Time: {recipe.cookingTime} (in minutes)
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    cookingTime: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    userOwnerName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    likesCount: PropTypes.number,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onUnSave: PropTypes.func.isRequired,
  savedRecipes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLike: PropTypes.func.isRequired,
  onUnlike: PropTypes.func.isRequired,
  likedRecipes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
