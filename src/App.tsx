import { Route, Routes } from "react-router";
import "./App.css";
import Category from "./components/Category";
import { FavoritesProvider } from "./components/context/FavoritesContext";
import Favorites from "./components/Favorites";
import RecipeList from "./components/RecipeList";
import Recopied from "./components/Recopied";
import SearchPage from "./components/SearchPage";
import ErrorBoundary from "./utils/ErrorBoundary";
import Navbar from "./utils/Navbar";

function App() {
  return (
    <FavoritesProvider>
      <ErrorBoundary
        fallback={(error, reset) => (
          <div>
            <h2>Failed to load recipes</h2>
            <p>{error.message}</p>
            <button onClick={reset}>Retry</button>
          </div>
        )}
      >
        <Navbar searchPath="/search" />
        <div className="pt-16 flex flex-col items-center overflow-y-auto">
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/recipe/:recipeId" element={<Recopied />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </FavoritesProvider>
  );
}

export default App;
