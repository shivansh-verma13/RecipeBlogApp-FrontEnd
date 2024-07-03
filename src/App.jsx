import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { CreateRecipes } from "./pages/CreateRecipe";
import { SavedRecipes } from "./pages/SavedRecipes";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";

function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-recipe" element={<CreateRecipes />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
      </Routes>
    </main>
  );
}

export default App;
