
import { useState } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Database } from "@/integrations/supabase/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check, Clock, Users } from "lucide-react";

type DbRecipe = Database['public']['Tables']['recipes']['Row'];

type Ingredient = {
  name: string;
  amount: string;
  unit: string | null;
};

export type DetailedRecipe = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  cooking_time: number;
  category: string;
  instructions: string;
  ingredients: Ingredient[];
  servings?: number; // Added servings property
};

// Mock data for the Indian recipes
export const INDIAN_RECIPES: DetailedRecipe[] = [
  {
    id: "ind-1",
    title: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce with butter and aromatic spices. This beloved dish originated in Delhi and has become a worldwide favorite for its rich flavors and velvety texture.",
    image_url: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&auto=format&fit=crop&w=896&q=80",
    cooking_time: 45,
    category: "Indian",
    servings: 4,
    instructions: "1. Mix chicken with yogurt, ginger-garlic paste, and spices. Marinate for at least 2 hours.\n2. Grill or bake chicken until partially cooked.\n3. In a pan, heat butter and add onions, ginger-garlic paste, and tomato paste.\n4. Add spices and cook until fragrant.\n5. Add tomato puree and simmer for 10 minutes.\n6. Add cream, honey, and fenugreek leaves.\n7. Add the grilled chicken and simmer for 15 minutes.\n8. Finish with a dollop of butter and garnish with cream.",
    ingredients: [
      { name: "Chicken", amount: "500", unit: "grams" },
      { name: "Butter", amount: "50", unit: "grams" },
      { name: "Tomato paste", amount: "2", unit: "tablespoons" },
      { name: "Heavy cream", amount: "1/2", unit: "cup" },
      { name: "Garam masala", amount: "1", unit: "tablespoon" },
      { name: "Garlic", amount: "4", unit: "cloves" },
      { name: "Ginger", amount: "1", unit: "inch" },
      { name: "Fenugreek leaves", amount: "1", unit: "teaspoon" },
      { name: "Honey", amount: "1", unit: "tablespoon" },
      { name: "Yogurt", amount: "1/4", unit: "cup" }
    ]
  },
  {
    id: "ind-2",
    title: "Chicken Biryani",
    description: "Fragrant basmati rice with spiced chicken, caramelized onions, and aromatic spices. This royal dish has its origins in the Mughal era and is known for its layered cooking technique that infuses the rice with complex flavors.",
    image_url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1297&q=80",
    cooking_time: 60,
    category: "Indian",
    servings: 6,
    instructions: "1. Wash and soak basmati rice for 30 minutes.\n2. Marinate chicken with yogurt, ginger-garlic paste, red chili powder, and garam masala for at least 2 hours.\n3. In a large pot, heat ghee and add whole spices (bay leaves, cinnamon, cardamom, cloves).\n4. Add sliced onions and cook until golden brown.\n5. Add marinated chicken and cook for 5 minutes.\n6. In another pot, cook rice with whole spices until 70% done.\n7. Layer the partially cooked rice over the chicken.\n8. Add saffron-soaked milk, fresh mint, and coriander leaves.\n9. Cover and cook on low heat for 20-25 minutes.\n10. Let it rest for 5 minutes before serving.",
    ingredients: [
      { name: "Basmati rice", amount: "2", unit: "cups" },
      { name: "Chicken", amount: "500", unit: "grams" },
      { name: "Yogurt", amount: "1/2", unit: "cup" },
      { name: "Onions", amount: "2", unit: "large" },
      { name: "Saffron", amount: "1", unit: "pinch" },
      { name: "Garam masala", amount: "1", unit: "tablespoon" },
      { name: "Mint leaves", amount: "1/4", unit: "cup" },
      { name: "Coriander leaves", amount: "1/4", unit: "cup" },
      { name: "Ghee", amount: "3", unit: "tablespoons" },
      { name: "Bay leaves", amount: "2", unit: "" },
      { name: "Cinnamon stick", amount: "1", unit: "" },
      { name: "Cardamom pods", amount: "4", unit: "" },
      { name: "Cloves", amount: "4", unit: "" }
    ]
  },
  {
    id: "ind-3",
    title: "Palak Paneer",
    description: "Cottage cheese cubes in a smooth, creamy spinach sauce spiced to perfection. This vegetarian North Indian dish is not only delicious but also nutritious, combining protein-rich paneer with iron-rich spinach.",
    image_url: "https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=896&q=80",
    cooking_time: 40,
    category: "Indian",
    instructions: "1. Blanch spinach in boiling water for 3 minutes, then transfer to ice water.\n2. Blend the blanched spinach into a smooth puree.\n3. Pan-fry paneer cubes until golden and set aside.\n4. In a pan, heat oil and add cumin seeds, chopped onions, and green chilies.\n5. Add ginger-garlic paste and sauté until fragrant.\n6. Add the spinach puree, salt, and spices.\n7. Simmer for 5 minutes, then add cream.\n8. Add fried paneer cubes and garam masala.\n9. Simmer for another 5 minutes.\n10. Finish with a dollop of butter before serving.",
    ingredients: [
      { name: "Spinach", amount: "500", unit: "grams" },
      { name: "Paneer", amount: "200", unit: "grams" },
      { name: "Onion", amount: "1", unit: "medium" },
      { name: "Ginger-garlic paste", amount: "2", unit: "tablespoons" },
      { name: "Green chilies", amount: "2", unit: "" },
      { name: "Cream", amount: "2", unit: "tablespoons" },
      { name: "Garam masala", amount: "1", unit: "teaspoon" },
      { name: "Cumin seeds", amount: "1", unit: "teaspoon" },
      { name: "Butter", amount: "1", unit: "tablespoon" },
      { name: "Salt", amount: "to taste", unit: "" }
    ]
  },
  {
    id: "ind-4",
    title: "Chole Bhature",
    description: "Spicy chickpea curry served with deep-fried bread, a popular Punjabi delicacy. This combination is a staple breakfast in North India, particularly in Punjab and Delhi, offering a perfect balance of protein and carbohydrates.",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    cooking_time: 50,
    category: "Indian",
    instructions: "1. Soak chickpeas overnight in water with baking soda.\n2. Pressure cook chickpeas with salt, bay leaf, and tea bags for flavor.\n3. In a pan, heat oil and add cumin seeds, bay leaf, and cinnamon stick.\n4. Add chopped onions and cook until golden brown.\n5. Add ginger-garlic paste and sauté until fragrant.\n6. Add chopped tomatoes, spices, and cook until oil separates.\n7. Add boiled chickpeas and some cooking water.\n8. Mash some chickpeas to thicken the gravy.\n9. For bhature, mix flour, yogurt, baking soda, and knead into a soft dough.\n10. Let the dough ferment for 2-3 hours.\n11. Roll into oval shapes and deep fry until golden and fluffy.",
    ingredients: [
      { name: "Chickpeas", amount: "2", unit: "cups" },
      { name: "All-purpose flour", amount: "2", unit: "cups" },
      { name: "Onion", amount: "1", unit: "large" },
      { name: "Tomatoes", amount: "2", unit: "medium" },
      { name: "Ginger", amount: "1", unit: "inch" },
      { name: "Garlic", amount: "4", unit: "cloves" },
      { name: "Chole masala", amount: "2", unit: "tablespoons" },
      { name: "Oil", amount: "for frying", unit: "" },
      { name: "Yogurt", amount: "1/4", unit: "cup" },
      { name: "Baking soda", amount: "1/4", unit: "teaspoon" },
      { name: "Bay leaf", amount: "1", unit: "" },
      { name: "Tea bags", amount: "2", unit: "" },
      { name: "Cinnamon stick", amount: "1", unit: "small" }
    ]
  },
  {
    id: "ind-5",
    title: "Masala Dosa",
    description: "Crispy fermented rice crepe filled with spiced potato filling, a South Indian favorite. Masala dosa originated in Karnataka and has become one of India's most popular breakfast items, often served with coconut chutney and sambar.",
    image_url: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1297&q=80",
    cooking_time: 40,
    category: "Indian",
    instructions: "1. Soak rice and urad dal separately for 4-6 hours.\n2. Grind them separately, then mix the batters together with salt.\n3. Ferment the batter for 8-12 hours or overnight.\n4. For the potato filling, heat oil in a pan and add mustard seeds.\n5. When they splutter, add curry leaves, chopped onions, and green chilies.\n6. Add turmeric powder and boiled, mashed potatoes.\n7. Mix well and season with salt.\n8. Heat a cast iron griddle, pour a ladleful of batter and spread in a circular motion.\n9. Drizzle oil around the edges and cook until golden brown.\n10. Place some potato filling in the center and fold the dosa.\n11. Serve hot with coconut chutney and sambar.",
    ingredients: [
      { name: "Rice", amount: "3", unit: "cups" },
      { name: "Urad dal", amount: "1", unit: "cup" },
      { name: "Potatoes", amount: "4", unit: "medium" },
      { name: "Onion", amount: "1", unit: "large" },
      { name: "Mustard seeds", amount: "1", unit: "teaspoon" },
      { name: "Turmeric powder", amount: "1/2", unit: "teaspoon" },
      { name: "Curry leaves", amount: "10", unit: "" },
      { name: "Green chilies", amount: "3", unit: "" },
      { name: "Salt", amount: "to taste", unit: "" },
      { name: "Oil", amount: "as needed", unit: "" }
    ]
  },
  {
    id: "ind-6",
    title: "Tandoori Chicken",
    description: "Chicken marinated in yogurt and spices, then roasted to perfection in a tandoor. This iconic dish gets its name from the clay oven (tandoor) in which it is traditionally cooked, giving it a distinctive smoky flavor and char.",
    image_url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    cooking_time: 50,
    category: "Indian",
    instructions: "1. Make deep cuts in chicken pieces to allow marinade to penetrate.\n2. Prepare first marinade with lemon juice, salt, and red chili powder. Apply to chicken and let sit for 30 minutes.\n3. Prepare second marinade with yogurt, ginger-garlic paste, tandoori masala, garam masala, and oil.\n4. Apply second marinade to chicken and refrigerate for at least 4 hours, preferably overnight.\n5. Preheat oven to 430°F (220°C).\n6. Place marinated chicken on a baking tray and bake for 35-40 minutes, turning once.\n7. Baste with butter or oil halfway through cooking.\n8. If possible, finish with 2 minutes under a broiler for char marks.\n9. Serve hot with mint chutney, sliced onions, and lemon wedges.",
    ingredients: [
      { name: "Chicken", amount: "1", unit: "whole" },
      { name: "Yogurt", amount: "1", unit: "cup" },
      { name: "Lemon juice", amount: "2", unit: "tablespoons" },
      { name: "Ginger-garlic paste", amount: "3", unit: "tablespoons" },
      { name: "Red chili powder", amount: "1", unit: "tablespoon" },
      { name: "Garam masala", amount: "1", unit: "teaspoon" },
      { name: "Tandoori masala", amount: "2", unit: "tablespoons" },
      { name: "Oil", amount: "2", unit: "tablespoons" },
      { name: "Butter", amount: "2", unit: "tablespoons" },
      { name: "Salt", amount: "to taste", unit: "" }
    ]
  },
  {
    id: "ind-7",
    title: "Malai Kofta",
    description: "Soft paneer and potato dumplings served in a rich, creamy tomato-based gravy. This vegetarian delicacy is a restaurant favorite, known for its luxurious texture and complex flavors that develop from the blend of spices and cream.",
    image_url: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&auto=format&fit=crop&w=1297&q=80",
    cooking_time: 60,
    category: "Indian",
    instructions: "1. Mix crumbled paneer, boiled and mashed potatoes, cornflour, and spices.\n2. Shape the mixture into round balls and stuff each with a mixture of chopped nuts and raisins.\n3. Deep fry the koftas until golden brown.\n4. For the gravy, soak cashews in hot water for 15 minutes and blend into a paste.\n5. In a pan, heat oil and add cumin seeds.\n6. Add ginger-garlic paste and sauté until fragrant.\n7. Add pureed tomatoes and cook until oil separates.\n8. Add spices, cashew paste, and cream.\n9. Simmer for 10 minutes, then add water to adjust consistency.\n10. Add kasuri methi and garam masala.\n11. Add koftas just before serving to prevent them from breaking.",
    ingredients: [
      { name: "Paneer", amount: "200", unit: "grams" },
      { name: "Potatoes", amount: "2", unit: "medium" },
      { name: "Cashew nuts", amount: "15", unit: "" },
      { name: "Cream", amount: "1/4", unit: "cup" },
      { name: "Tomatoes", amount: "3", unit: "medium" },
      { name: "Onion", amount: "1", unit: "large" },
      { name: "Kasuri methi", amount: "1", unit: "tablespoon" },
      { name: "Garam masala", amount: "1", unit: "teaspoon" },
      { name: "Cornflour", amount: "2", unit: "tablespoons" },
      { name: "Raisins", amount: "2", unit: "tablespoons" },
      { name: "Ginger-garlic paste", amount: "1", unit: "tablespoon" },
      { name: "Red chili powder", amount: "1", unit: "teaspoon" }
    ]
  },
  {
    id: "ind-8",
    title: "Aloo Gobi",
    description: "A dry curry dish made with potatoes, cauliflower, and Indian spices. This humble yet flavorful dish is a staple in North Indian households, showcasing how simple ingredients can create a satisfying meal when seasoned with the right spices.",
    image_url: "https://images.unsplash.com/photo-1577859714523-5f0b6c98afa5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1297&q=80",
    cooking_time: 30,
    category: "Indian",
    instructions: "1. Heat oil in a pan and add cumin seeds.\n2. When they splutter, add chopped onions and sauté until translucent.\n3. Add ginger-garlic paste and cook until fragrant.\n4. Add diced potatoes and cauliflower florets.\n5. Add turmeric powder, red chili powder, coriander powder, and salt.\n6. Mix well and cover and cook on medium-low heat for 15-20 minutes, stirring occasionally.\n7. Add garam masala and mix well.\n8. Garnish with fresh coriander leaves before serving.",
    ingredients: [
      { name: "Potatoes", amount: "3", unit: "medium" },
      { name: "Cauliflower", amount: "1", unit: "medium" },
      { name: "Cumin seeds", amount: "1", unit: "teaspoon" },
      { name: "Turmeric powder", amount: "1/2", unit: "teaspoon" },
      { name: "Red chili powder", amount: "1", unit: "teaspoon" },
      { name: "Garam masala", amount: "1/2", unit: "teaspoon" },
      { name: "Coriander leaves", amount: "2", unit: "tablespoons" },
      { name: "Oil", amount: "2", unit: "tablespoons" },
      { name: "Onion", amount: "1", unit: "medium" },
      { name: "Ginger-garlic paste", amount: "1", unit: "tablespoon" },
      { name: "Coriander powder", amount: "1", unit: "teaspoon" },
      { name: "Salt", amount: "to taste", unit: "" }
    ]
  },
  {
    id: "ind-9",
    title: "Rogan Josh",
    description: "A Kashmiri curry dish made with aromatic spices and tender pieces of lamb or mutton. Rogan Josh is known for its vibrant red color from Kashmiri chilies and complex flavors from the slow-cooking process with yogurt and spices.",
    image_url: "https://images.unsplash.com/photo-1545247181-516773cae754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    cooking_time: 90,
    category: "Indian",
    instructions: "1. Heat oil in a heavy-bottomed pot and add whole spices (bay leaves, cardamom, cinnamon, cloves).\n2. Add chopped onions and sauté until golden brown.\n3. Add ginger and garlic paste and cook until fragrant.\n4. Add meat pieces and brown on all sides.\n5. Add Kashmiri red chili powder mixed with a little water to prevent burning.\n6. Add yogurt one spoon at a time, stirring continuously.\n7. Add salt, fennel powder, and garam masala.\n8. Add water, cover, and simmer on low heat for 1-1.5 hours until meat is tender.\n9. The gravy should thicken naturally.\n10. Finish with a sprinkling of garam masala and fresh coriander leaves.",
    ingredients: [
      { name: "Lamb/Mutton", amount: "500", unit: "grams" },
      { name: "Yogurt", amount: "1", unit: "cup" },
      { name: "Kashmiri red chili", amount: "4", unit: "tablespoons" },
      { name: "Fennel powder", amount: "1", unit: "tablespoon" },
      { name: "Ginger", amount: "2", unit: "inches" },
      { name: "Garlic", amount: "8", unit: "cloves" },
      { name: "Bay leaves", amount: "2", unit: "" },
      { name: "Cardamom pods", amount: "5", unit: "" },
      { name: "Cinnamon stick", amount: "1", unit: "inch" },
      { name: "Cloves", amount: "4", unit: "" },
      { name: "Onions", amount: "2", unit: "large" },
      { name: "Garam masala", amount: "1", unit: "teaspoon" },
      { name: "Salt", amount: "to taste", unit: "" }
    ]
  },
  {
    id: "ind-10",
    title: "Samosas",
    description: "Crispy pastry filled with spiced potatoes, peas, and sometimes meat, a popular snack. These triangular treats are enjoyed throughout India and beyond, often served with mint or tamarind chutney as a tea-time snack or appetizer.",
    image_url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=896&q=80",
    cooking_time: 60,
    category: "Indian",
    instructions: "1. For the dough, mix flour, salt, and ajwain seeds.\n2. Add oil and rub into the flour until it resembles breadcrumbs.\n3. Gradually add water and knead into a firm dough. Cover and rest for 30 minutes.\n4. For the filling, heat oil and add cumin seeds.\n5. Add chopped ginger, green chilies, and cook for a minute.\n6. Add boiled and mashed potatoes, green peas, and spices.\n7. Cook for 2-3 minutes, then add coriander leaves and lemon juice.\n8. Divide the dough into balls and roll each into an oval.\n9. Cut each oval in half to get two semicircles.\n10. Fold each semicircle into a cone, fill with potato mixture, and seal the edges.\n11. Deep fry in hot oil until golden brown and crispy.\n12. Serve hot with mint chutney or tamarind sauce.",
    ingredients: [
      { name: "All-purpose flour", amount: "2", unit: "cups" },
      { name: "Potatoes", amount: "4", unit: "medium" },
      { name: "Green peas", amount: "1/2", unit: "cup" },
      { name: "Cumin seeds", amount: "1", unit: "teaspoon" },
      { name: "Garam masala", amount: "1", unit: "teaspoon" },
      { name: "Coriander powder", amount: "1", unit: "tablespoon" },
      { name: "Green chilies", amount: "2", unit: "" },
      { name: "Oil", amount: "for frying", unit: "" },
      { name: "Ajwain seeds", amount: "1", unit: "teaspoon" },
      { name: "Ginger", amount: "1", unit: "inch" },
      { name: "Coriander leaves", amount: "2", unit: "tablespoons" },
      { name: "Lemon juice", amount: "1", unit: "tablespoon" },
      { name: "Salt", amount: "to taste", unit: "" }
    ]
  }
];

const fetchIndianRecipes = async (): Promise<DbRecipe[]> => {
  try {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('category', 'Indian');
    
    if (error) {
      console.error('Error fetching Indian recipes from Supabase:', error);
      throw error;
    }
    
    // If no data returned from Supabase, use mock data
    return data && data.length > 0 ? data : INDIAN_RECIPES as unknown as DbRecipe[];
  } catch (error) {
    console.error('Error in fetchIndianRecipes:', error);
    // Return mock data as fallback
    return INDIAN_RECIPES as unknown as DbRecipe[];
  }
};

const IndianRecipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<DetailedRecipe | null>(null);
  const { data: indianRecipes, isLoading } = useQuery<DbRecipe[], Error>({
    queryKey: ['recipes', 'indian'],
    queryFn: fetchIndianRecipes
  });

  const handleViewRecipe = (id: string | number) => {
    const recipe = INDIAN_RECIPES.find(r => r.id === id);
    if (recipe) {
      setSelectedRecipe(recipe);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <section className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Indian Cuisine</h1>
          <p className="text-muted-foreground">
            Explore the rich flavors and spices of traditional Indian recipes
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDIAN_RECIPES.map((recipe) => (
            <div key={recipe.id} className="group relative">
              <RecipeCard 
                id={recipe.id}
                title={recipe.title}
                description={recipe.description}
                image={recipe.image_url}
                time={`${recipe.cooking_time} mins`}
                servings={recipe.servings || 4}
                category={recipe.category}
              />
              <Button 
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleViewRecipe(recipe.id)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </section>

      <Dialog open={selectedRecipe !== null} onOpenChange={(open) => !open && setSelectedRecipe(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedRecipe?.title}</DialogTitle>
            <DialogDescription className="text-base">{selectedRecipe?.description}</DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
            <div className="md:w-1/2">
              <div className="rounded-md overflow-hidden mb-4">
                <img 
                  src={selectedRecipe?.image_url} 
                  alt={selectedRecipe?.title} 
                  className="w-full h-[250px] object-cover"
                />
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{selectedRecipe?.cooking_time} mins</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{selectedRecipe?.servings || 4} servings</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                <ul className="space-y-2">
                  {selectedRecipe?.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h3 className="text-lg font-semibold mb-2">Instructions</h3>
              <ScrollArea className="h-[400px] pr-4">
                <p className="whitespace-pre-line">{selectedRecipe?.instructions}</p>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IndianRecipes;
