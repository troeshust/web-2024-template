import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RestaurantIcon from "@mui/icons-material/Restaurant";

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
  servings: number;
}

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  min-height: 100vh;
  color: #fff;
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 1rem;
    background-color: #45B649;
    &:hover {
      background-color: #39A83C;
    }
  }
`;

const StyledList = styled(List)`
  && {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 1rem;
    margin-top: 2rem;
  }
`;

const StyledListItem = styled(ListItem)`
  && {
    background-color: rgba(255, 255, 255, 0.2);
    margin-bottom: 1rem;
    border-radius: 5px;
  }
`;

const RecipeDialog = styled(Dialog)`
  .MuiPaper-root {
    background-color: #FFD93D;
    color: #333;
  }
`;

function App() {
  const [recipes, setRecipes] = useLocalStorageState<Recipe[]>("recipes", {
    defaultValue: [],
  });
  const [newRecipeName, setNewRecipeName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRecipe, setEditRecipe] = useState<Recipe | null>(null);
  const [servingsMultiplier, setServingsMultiplier] = useState(1);

  useEffect(() => {
    if (recipes.length === 0) {
      const boilerplateRecipes: Recipe[] = [
        {
          id: 1,
          name: "Spaghetti Carbonara",
          ingredients: [
            { name: "Spaghetti", amount: 400, unit: "g" },
            { name: "Pancetta", amount: 150, unit: "g" },
            { name: "Eggs", amount: 4, unit: "" },
            { name: "Parmesan cheese", amount: 100, unit: "g" },
          ],
          instructions: "1. Cook pasta. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all ingredients.",
          servings: 4,
        },
        {
          id: 2,
          name: "Chicken Curry",
          ingredients: [
            { name: "Chicken breast", amount: 500, unit: "g" },
            { name: "Curry powder", amount: 2, unit: "tbsp" },
            { name: "Coconut milk", amount: 400, unit: "ml" },
            { name: "Onion", amount: 1, unit: "" },
          ],
          instructions: "1. Dice chicken. 2. Fry onion. 3. Add curry powder. 4. Add chicken and coconut milk. 5. Simmer for 20 minutes.",
          servings: 4,
        },
        {
          id: 3,
          name: "Greek Salad",
          ingredients: [
            { name: "Cucumber", amount: 1, unit: "" },
            { name: "Tomatoes", amount: 4, unit: "" },
            { name: "Feta cheese", amount: 200, unit: "g" },
            { name: "Olives", amount: 100, unit: "g" },
          ],
          instructions: "1. Chop vegetables. 2. Crumble feta. 3. Mix all ingredients. 4. Drizzle with olive oil and oregano.",
          servings: 2,
        },
        {
          id: 4,
          name: "Banana Smoothie",
          ingredients: [
            { name: "Banana", amount: 2, unit: "" },
            { name: "Milk", amount: 250, unit: "ml" },
            { name: "Honey", amount: 1, unit: "tbsp" },
            { name: "Ice cubes", amount: 5, unit: "" },
          ],
          instructions: "1. Peel bananas. 2. Blend all ingredients until smooth.",
          servings: 1,
        },
        {
          id: 5,
          name: "Vegetable Stir Fry",
          ingredients: [
            { name: "Mixed vegetables", amount: 500, unit: "g" },
            { name: "Soy sauce", amount: 2, unit: "tbsp" },
            { name: "Garlic", amount: 2, unit: "cloves" },
            { name: "Vegetable oil", amount: 1, unit: "tbsp" },
          ],
          instructions: "1. Heat oil in a wok. 2. Add garlic. 3. Add vegetables and stir fry. 4. Add soy sauce. 5. Cook until vegetables are tender-crisp.",
          servings: 3,
        },
      ];
      setRecipes(boilerplateRecipes);
    }
  }, [recipes, setRecipes]);

  const handleAddRecipe = () => {
    if (newRecipeName.trim() !== "") {
      const newRecipe: Recipe = {
        id: Date.now(),
        name: newRecipeName.trim(),
        ingredients: [],
        instructions: "",
        servings: 1,
      };
      setRecipes([...recipes, newRecipe]);
      setNewRecipeName("");
      setEditingId(newRecipe.id);
      setEditRecipe(newRecipe);
    }
  };

  const handleDeleteRecipe = (id: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const handleEditRecipe = (id: number) => {
    const recipeToEdit = recipes.find((recipe) => recipe.id === id);
    if (recipeToEdit) {
      setEditingId(id);
      setEditRecipe({ ...recipeToEdit });
      setServingsMultiplier(1);
    }
  };

  const handleUpdateRecipe = () => {
    if (editRecipe) {
      setRecipes(
        recipes.map((recipe) =>
          recipe.id === editRecipe.id ? { ...editRecipe } : recipe
        )
      );
    }
    setEditingId(null);
    setEditRecipe(null);
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
    if (editRecipe) {
      const updatedIngredients = [...editRecipe.ingredients];
      updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
      setEditRecipe({ ...editRecipe, ingredients: updatedIngredients });
    }
  };

  const handleAddIngredient = () => {
    if (editRecipe) {
      setEditRecipe({
        ...editRecipe,
        ingredients: [...editRecipe.ingredients, { name: "", amount: 0, unit: "" }],
      });
    }
  };

  const handleRemoveIngredient = (index: number) => {
    if (editRecipe) {
      const updatedIngredients = editRecipe.ingredients.filter((_, i) => i !== index);
      setEditRecipe({ ...editRecipe, ingredients: updatedIngredients });
    }
  };

  const handleServingsChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setServingsMultiplier(newValue);
    }
  };

  return (
    <AppContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Funky Recipe Book
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="New Recipe Name"
        value={newRecipeName}
        onChange={(e) => setNewRecipeName(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddRecipe()}
        InputProps={{
          style: { backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#fff" },
        }}
        InputLabelProps={{
          style: { color: "#fff" },
        }}
      />
      <StyledButton
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddRecipe}
        startIcon={<RestaurantIcon />}
      >
        Add Recipe
      </StyledButton>
      <StyledList>
        {recipes.map((recipe) => (
          <StyledListItem key={recipe.id}>
            <ListItemText primary={recipe.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditRecipe(recipe.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteRecipe(recipe.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </StyledListItem>
        ))}
      </StyledList>
      <RecipeDialog open={editingId !== null} onClose={handleUpdateRecipe} maxWidth="md" fullWidth>
        <DialogTitle>{editRecipe?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Ingredients</Typography>
          {editRecipe?.ingredients.map((ingredient, index) => (
            <div key={index}>
              <TextField
                label="Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
              />
              <TextField
                label="Amount"
                type="number"
                value={ingredient.amount * servingsMultiplier}
                onChange={(e) => handleIngredientChange(index, "amount", parseFloat(e.target.value) / servingsMultiplier)}
              />
              <TextField
                label="Unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
              />
              <IconButton onClick={() => handleRemoveIngredient(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button onClick={handleAddIngredient}>Add Ingredient</Button>
          <Typography variant="h6">Instructions</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={editRecipe?.instructions}
            onChange={(e) => setEditRecipe(editRecipe ? { ...editRecipe, instructions: e.target.value } : null)}
          />
          <Typography variant="h6">Servings</Typography>
          <TextField
            type="number"
            value={editRecipe?.servings}
            onChange={(e) => setEditRecipe(editRecipe ? { ...editRecipe, servings: parseInt(e.target.value) } : null)}
          />
          <Typography variant="h6">Adjust Servings</Typography>
          <Slider
            value={servingsMultiplier}
            onChange={handleServingsChange}
            min={0.5}
            max={5}
            step={0.5}
            marks
            valueLabelDisplay="auto"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateRecipe} color="primary">
            Save
          </Button>
        </DialogActions>
      </RecipeDialog>
    </AppContainer>
  );
}

export default App;
