import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { authService } from "./lib/api";
import { preloadCommonRecipeImages } from "./lib/imageUtils";
import AddRecipe from "./pages/AddRecipe";
import FoodVideos from "./pages/FoodVideos";
import ForgotPassword from "./pages/ForgotPassword";
import Index from "./pages/Index";
import IndianRecipes from "./pages/IndianRecipes";
import Login from "./pages/Login";
import NewRecipes from "./pages/NewRecipes";
import NotFound from "./pages/NotFound";
import PopularRecipes from "./pages/PopularRecipes";
import Profile from "./pages/Profile";
import RecipeDetail from "./pages/RecipeDetail";
import ResetPassword from "./pages/ResetPassword";
import SearchResults from "./pages/SearchResults";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!authService.isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check authentication status on initial load
    setIsAuthenticated(authService.isLoggedIn());

    // Preload common images
    preloadCommonRecipeImages();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 mt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/indian-recipes" element={<IndianRecipes />} />
              <Route path="/new-recipes" element={<NewRecipes />} />
              <Route path="/popular-recipes" element={<PopularRecipes />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/food-videos" element={<FoodVideos />} />
              <Route path="/search" element={<SearchResults />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-recipe"
                element={
                  <ProtectedRoute>
                    <AddRecipe />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" richColors />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
