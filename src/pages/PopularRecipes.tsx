
import { useState, useEffect } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { MOCK_RECIPES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Filter, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Define diet types
type DietType = "all" | "vegetarian" | "non-vegetarian" | "dessert";

const PopularRecipes = () => {
  // For demonstration, we'll take the recipes as "popular" and filter them
  const allPopularRecipes = MOCK_RECIPES;
  const [dietFilter, setDietFilter] = useState<DietType>("all");
  const [popularRecipes, setPopularRecipes] = useState(allPopularRecipes);

  // Categorize recipes based on diet type
  useEffect(() => {
    if (dietFilter === "all") {
      setPopularRecipes(allPopularRecipes);
    } else if (dietFilter === "vegetarian") {
      setPopularRecipes(
        allPopularRecipes.filter(recipe => 
          recipe.category === "Indian" || 
          recipe.category === "Salads" || 
          recipe.category === "Italian" || 
          recipe.category === "Vegetarian"
        )
      );
    } else if (dietFilter === "non-vegetarian") {
      setPopularRecipes(
        allPopularRecipes.filter(recipe => 
          recipe.category === "Asian" || 
          (recipe.title && recipe.title.includes("Chicken"))
        )
      );
    } else if (dietFilter === "dessert") {
      setPopularRecipes(
        allPopularRecipes.filter(recipe => 
          recipe.category === "Desserts" || 
          recipe.category === "Baking"
        )
      );
    }
  }, [dietFilter]);

  return (
    <div className="container py-8 md:py-12 space-y-8">
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Popular Recipes</h1>
          <p className="text-muted-foreground">
            Our most loved and frequently cooked recipes
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter by diet:</span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                {dietFilter === "all" && "All Recipes"}
                {dietFilter === "vegetarian" && "Vegetarian"}
                {dietFilter === "non-vegetarian" && "Non-Vegetarian"}
                {dietFilter === "dessert" && "Desserts & Sweets"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuRadioGroup value={dietFilter} onValueChange={(value) => setDietFilter(value as DietType)}>
                <DropdownMenuRadioItem value="all">All Recipes</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="vegetarian">Vegetarian</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="non-vegetarian">Non-Vegetarian</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dessert">Desserts & Sweets</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {popularRecipes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No recipes found for this category.</p>
              <Button asChild className="mt-4">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          ) : (
            popularRecipes.map((recipe) => (
              <div key={recipe.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden rounded-md">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge>{recipe.category}</Badge>
                      {recipe.category === "Indian" || recipe.category === "Salads" || recipe.category === "Italian" || recipe.category === "Vegetarian" ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Vegetarian</Badge>
                      ) : recipe.category === "Desserts" || recipe.category === "Baking" ? (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Dessert</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Non-Vegetarian</Badge>
                      )}
                    </div>
                    <h2 className="text-2xl font-semibold">{recipe.title}</h2>
                    <p className="text-muted-foreground mt-2">{recipe.description}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span>⏰ {recipe.time}</span>
                    <span>👥 {recipe.servings} servings</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Ingredients:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {recipe.ingredients ? (
                        recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="text-sm">{ingredient}</li>
                        ))
                      ) : (
                        <>
                          {/* Default ingredients based on recipe category */}
                          {recipe.category === "Italian" && (
                            <>
                              <li className="text-sm">All-purpose flour</li>
                              <li className="text-sm">Fresh mozzarella</li>
                              <li className="text-sm">Tomato sauce</li>
                              <li className="text-sm">Olive oil</li>
                              <li className="text-sm">Basil leaves</li>
                            </>
                          )}
                          {recipe.category === "Desserts" && (
                            <>
                              <li className="text-sm">Flour</li>
                              <li className="text-sm">Sugar</li>
                              <li className="text-sm">Butter</li>
                              <li className="text-sm">Chocolate chips</li>
                              <li className="text-sm">Vanilla extract</li>
                            </>
                          )}
                          {recipe.category === "Salads" && (
                            <>
                              <li className="text-sm">Fresh vegetables</li>
                              <li className="text-sm">Feta cheese</li>
                              <li className="text-sm">Olive oil</li>
                              <li className="text-sm">Vinegar</li>
                              <li className="text-sm">Herbs</li>
                            </>
                          )}
                          {recipe.category === "Asian" && (
                            <>
                              <li className="text-sm">Beef strips</li>
                              <li className="text-sm">Soy sauce</li>
                              <li className="text-sm">Vegetables (bell peppers, broccoli)</li>
                              <li className="text-sm">Ginger and garlic</li>
                              <li className="text-sm">Sesame oil</li>
                            </>
                          )}
                          {recipe.category === "Baking" && (
                            <>
                              <li className="text-sm">Ripe bananas</li>
                              <li className="text-sm">Flour</li>
                              <li className="text-sm">Sugar</li>
                              <li className="text-sm">Eggs</li>
                              <li className="text-sm">Baking soda</li>
                            </>
                          )}
                          {recipe.category === "Indian" && (
                            <>
                              <li className="text-sm">Mixed vegetables</li>
                              <li className="text-sm">Spices (turmeric, cumin, coriander)</li>
                              <li className="text-sm">Coconut milk</li>
                              <li className="text-sm">Onion and tomatoes</li>
                              <li className="text-sm">Fresh cilantro</li>
                            </>
                          )}
                        </>
                      )}
                    </ul>
                  </div>
                  <Button asChild>
                    <Link to={`/recipe/${recipe.id}`}>View Full Recipe</Link>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default PopularRecipes;
