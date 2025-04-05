
import { RecipeCard } from "@/components/RecipeCard";
import { MOCK_RECIPES } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NewRecipes = () => {
  // For demonstration, we'll split recipes by category
  const categories = [...new Set(MOCK_RECIPES.map(recipe => recipe.category))];

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">New Recipes</h1>
          <p className="text-muted-foreground">
            Our latest additions to the recipe collection
          </p>
        </div>
        
        <Tabs defaultValue={categories[0]} className="space-y-4">
          <TabsList className="flex flex-wrap">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {MOCK_RECIPES.filter(recipe => recipe.category === category)
                  .map((recipe) => (
                    <RecipeCard key={recipe.id} {...recipe} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
};

export default NewRecipes;
