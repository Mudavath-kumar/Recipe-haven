import { RecipeCard } from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/api";
import { MOCK_RECIPES } from "@/lib/mock-data";
import { Cake, ChevronRight, Clock, Drumstick, PlayCircle, Salad, Search, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define a Recipe type
interface Recipe {
  _id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  cooking_time: number;
  difficulty: string;
  user?: {
    name: string;
    avatar_url?: string;
  };
  createdAt?: string;
  likes?: string[];
  [key: string]: unknown;
}

const Index = () => {
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ["all", ...new Set(MOCK_RECIPES.map(recipe => recipe.category))];
  
  const filteredRecipes = category === "all" 
    ? MOCK_RECIPES 
    : MOCK_RECIPES.filter(recipe => recipe.category === category);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const currentRecipes = filteredRecipes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Get vegetarian recipes
  const vegetarianRecipes = MOCK_RECIPES.filter(recipe => 
    recipe.category === "Indian" || 
    recipe.category === "Salads" || 
    recipe.category === "Italian" || 
    recipe.category === "Vegetarian"
  ).slice(0, 3);

  // Get non-vegetarian recipes
  const nonVegetarianRecipes = MOCK_RECIPES.filter(recipe => 
    recipe.category === "Asian" || 
    (recipe.title && recipe.title.includes("Chicken"))
  ).slice(0, 3);

  // Get dessert recipes
  const dessertRecipes = MOCK_RECIPES.filter(recipe => 
    recipe.category === "Desserts" || 
    recipe.category === "Baking"
  ).slice(0, 3);

  const videos = [
    {
      id: 1,
      title: "Quick & Easy Butter Chicken",
      thumbnail: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db",
      url: "/food-videos"
    },
    {
      id: 2,
      title: "Authentic Biryani Recipe",
      thumbnail: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
      url: "/food-videos"
    },
    {
      id: 3,
      title: "Homemade Naan Bread Recipe",
      thumbnail: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91",
      url: "/food-videos"
    },
    {
      id: 4,
      title: "Perfect Vegetable Curry",
      thumbnail: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd",
      url: "/food-videos"
    },
    {
      id: 5,
      title: "Chocolate Cake From Scratch",
      thumbnail: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      url: "/food-videos"
    },
    {
      id: 6,
      title: "Easy Homemade Pizza Dough",
      thumbnail: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
      url: "/food-videos"
    }
  ];

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewestRecipes = async () => {
      try {
        const data = await api.get('/recipes/newest?limit=3');
        setRecipes(data || []);
      } catch (error) {
        console.error('Error fetching newest recipes:', error);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewestRecipes();
  }, []);

  return (
    <div className="space-y-12">
      <section className="relative py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-recipe-100 via-recipe-200 to-recipe-300 rounded-3xl overflow-hidden shadow-lg mx-2 md:mx-4">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight font-playfair text-recipe-900 animate-in slide-in-from-bottom duration-500">
            Discover Your Next 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-recipe-700 to-recipe-900 px-2">
              Favorite
            </span>
            Recipe
          </h1>
          <p className="text-lg md:text-2xl text-recipe-700 font-poppins animate-in slide-in-from-bottom duration-500 delay-150">
            Explore our curated collection of delicious recipes from around the world
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-recipe-700 hover:bg-recipe-800">
              <Link to="/indian-recipes">
                Browse Indian Recipes
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/food-videos">
                Watch Cooking Videos
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link to="/add-recipe">
                <Utensils className="mr-2 h-4 w-4" />
                Add Your Recipe
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-recipe-900 mb-2">
                Newly Added Recipes
              </h2>
              <p className="text-gray-600">Check out the latest culinary creations from our community</p>
            </div>
            <Link 
              to="/new-recipes" 
              className="text-recipe-700 hover:text-recipe-800 font-medium flex items-center gap-1 transition-colors"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-12 h-12 rounded-full border-4 border-recipe-200 border-t-recipe-700 animate-spin"></div>
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div 
                  key={recipe._id} 
                  className="transform transition-all duration-300 hover:scale-[1.02]"
                >
                  <Link to={`/recipe/${recipe._id}`}>
                    <RecipeCard 
                      id={recipe._id}
                      title={recipe.title}
                      category={recipe.category}
                      description={recipe.description}
                      image={recipe.image_url}
                      time={String(recipe.cooking_time)}
                      servings={4} // Default value since API might not provide this
                    />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No recipes found. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Section */}
      <section className="container px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Utensils className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold">Create Recipes</h3>
              <p className="text-muted-foreground">Share your culinary masterpieces with our community. Add your own special recipes easily.</p>
              <Button asChild variant="outline">
                <Link to="/add-recipe">Start Creating</Link>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Find Recipes</h3>
              <p className="text-muted-foreground">Discover recipes from around the world. Use our search to find exactly what you're craving.</p>
              <Button asChild variant="outline">
                <Link to="/search">Search Recipes</Link>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-green-100 p-3 rounded-full">
                <PlayCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Watch Videos</h3>
              <p className="text-muted-foreground">Learn cooking techniques with our curated collection of instructional videos.</p>
              <Button asChild variant="outline">
                <Link to="/food-videos">Watch Now</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="space-y-6 px-4 md:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Videos</h2>
          <Button asChild variant="ghost">
            <Link to="/food-videos">View All</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Link key={video.id} to={video.url}>
              <Card className="overflow-hidden group cursor-pointer transition-all hover:shadow-lg">
                <div className="relative aspect-video">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to a generic food image if the thumbnail fails to load
                      e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{video.title}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Recipe Categories */}
      <section className="space-y-8 px-4 md:px-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <h2 className="text-3xl font-bold">Explore Recipes</h2>
            <TabsList className="w-full md:w-auto overflow-x-auto flex-wrap justify-start">
              <TabsTrigger value="all" className="px-4">All Recipes</TabsTrigger>
              <TabsTrigger value="vegetarian" className="px-4">
                <Salad className="mr-2 h-4 w-4 text-green-600" />
                Vegetarian
              </TabsTrigger>
              <TabsTrigger value="non-vegetarian" className="px-4">
                <Drumstick className="mr-2 h-4 w-4 text-red-600" />
                Non-Vegetarian
              </TabsTrigger>
              <TabsTrigger value="desserts" className="px-4">
                <Cake className="mr-2 h-4 w-4 text-purple-600" />
                Desserts & Sweets
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {currentRecipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="transform transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link to={`/recipe/${recipe.id}`}>
                    <RecipeCard {...recipe} />
                  </Link>
                </div>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="font-poppins hover:bg-recipe-100 transition-colors"
                >
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={page === i + 1 ? "default" : "outline"}
                    onClick={() => setPage(i + 1)}
                    className={`font-poppins transition-colors ${
                      page === i + 1 
                        ? "bg-recipe-700 hover:bg-recipe-800" 
                        : "hover:bg-recipe-100"
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="font-poppins hover:bg-recipe-100 transition-colors"
                >
                  Next
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="vegetarian" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {vegetarianRecipes.map((recipe, index) => (
                <div key={recipe.id} className="animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                  <Link to={`/recipe/${recipe.id}`}>
                    <RecipeCard {...recipe} />
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to="/popular-recipes?filter=vegetarian">View All Vegetarian Recipes</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="non-vegetarian" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {nonVegetarianRecipes.map((recipe, index) => (
                <div key={recipe.id} className="animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                  <Link to={`/recipe/${recipe.id}`}>
                    <RecipeCard {...recipe} />
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to="/popular-recipes?filter=non-vegetarian">View All Non-Vegetarian Recipes</Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="desserts" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {dessertRecipes.map((recipe, index) => (
                <div key={recipe.id} className="animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                  <Link to={`/recipe/${recipe.id}`}>
                    <RecipeCard {...recipe} />
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to="/popular-recipes?filter=dessert">View All Desserts & Sweets</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Featured categories quick links */}
      <section className="container py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/popular-recipes?filter=vegetarian" className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999" 
                alt="Vegetarian Recipes" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <div className="flex items-center mb-2">
                    <Salad className="h-5 w-5 text-green-400 mr-2" />
                    <span className="font-semibold">Vegetarian</span>
                  </div>
                  <p className="text-sm opacity-90">Explore delicious meat-free dishes</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/popular-recipes?filter=non-vegetarian" className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1512058564366-18510be2db19" 
                alt="Non-Vegetarian Recipes" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <div className="flex items-center mb-2">
                    <Drumstick className="h-5 w-5 text-red-400 mr-2" />
                    <span className="font-semibold">Non-Vegetarian</span>
                  </div>
                  <p className="text-sm opacity-90">Delicious meat-based recipes</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/popular-recipes?filter=dessert" className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1587314168485-3236d6710814" 
                alt="Desserts" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <div className="flex items-center mb-2">
                    <Cake className="h-5 w-5 text-purple-400 mr-2" />
                    <span className="font-semibold">Desserts</span>
                  </div>
                  <p className="text-sm opacity-90">Sweet treats and baked delights</p>
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/indian-recipes" className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc" 
                alt="Indian Cuisine" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-yellow-400 mr-2" />
                    <span className="font-semibold">Indian Cuisine</span>
                  </div>
                  <p className="text-sm opacity-90">Explore flavorful Indian dishes</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
