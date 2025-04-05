
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, Users, Salad, Drumstick, Cake } from "lucide-react";
import { getRecipeImage } from "@/lib/imageUtils";

interface RecipeCardProps {
  id: string | number;
  title: string;
  description: string;
  image: string;
  time: string;
  servings: number;
  category: string;
}

// Helper function to determine diet type based on category
const getDietType = (category: string) => {
  const vegetarianCategories = ['Indian', 'Salads', 'Italian', 'Vegetarian'];
  const dessertCategories = ['Desserts', 'Baking'];
  
  // For Indian recipes, check the title to determine if it's vegetarian
  if (category === 'Indian') {
    const nonVegIndianDishes = [
      'Butter Chicken', 'Chicken Biryani', 'Tandoori Chicken', 'Biryani', 
      'Chicken Curry', 'Chicken Tikka', 'Fish Curry', 'Mutton'
    ];
    return (title: string) => {
      if (nonVegIndianDishes.some(dish => title.includes(dish))) {
        return {
          type: 'non-vegetarian',
          icon: <Drumstick className="h-4 w-4 text-red-600" />,
          label: 'Non-Vegetarian'
        };
      } else {
        return {
          type: 'vegetarian',
          icon: <Salad className="h-4 w-4 text-green-600" />,
          label: 'Vegetarian'
        };
      }
    };
  }
  
  if (vegetarianCategories.includes(category)) {
    return () => ({
      type: 'vegetarian',
      icon: <Salad className="h-4 w-4 text-green-600" />,
      label: 'Vegetarian'
    });
  } else if (dessertCategories.includes(category)) {
    return () => ({
      type: 'dessert',
      icon: <Cake className="h-4 w-4 text-purple-600" />,
      label: 'Dessert'
    });
  } else {
    return () => ({
      type: 'non-vegetarian',
      icon: <Drumstick className="h-4 w-4 text-red-600" />,
      label: 'Non-Vegetarian'
    });
  }
};

export const RecipeCard = ({
  id,
  title,
  description,
  image,
  time,
  servings,
  category,
}: RecipeCardProps) => {
  // Get diet type function based on category
  const getDietTypeForTitle = getDietType(category);
  // Get diet info for this specific recipe
  const dietInfo = getDietTypeForTitle(title);
  
  // Attempt to get the correct image or fallback to a category image
  const displayImage = getRecipeImage(title, category, image);
  
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={displayImage}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // If the image fails to load, try with a category default
            e.currentTarget.src = getRecipeImage("", category, "");
          }}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Badge className="bg-white/90 text-xs">{category}</Badge>
          <Badge 
            variant="outline" 
            className={`
              text-xs
              ${dietInfo.type === 'vegetarian' ? 'bg-green-50 text-green-700 border-green-200' : 
                dietInfo.type === 'dessert' ? 'bg-purple-50 text-purple-700 border-purple-200' : 
                'bg-red-50 text-red-700 border-red-200'}
            `}
          >
            <span className="flex items-center gap-1">
              {dietInfo.icon}
              {dietInfo.label}
            </span>
          </Badge>
        </div>
      </div>
      <CardHeader className="flex-grow p-3 md:p-4 lg:p-6">
        <CardTitle className="line-clamp-1 text-base md:text-lg lg:text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2 text-xs md:text-sm mt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0 md:p-4 md:pt-0 lg:p-6 lg:pt-0">
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 text-xs text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 md:h-4 md:w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 md:h-4 md:w-4" />
            <span>{servings} {servings === 1 ? 'serving' : 'servings'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 md:p-4 md:pt-0 lg:p-6 lg:pt-0 mt-auto">
        <Button asChild className="w-full text-xs md:text-sm h-8 md:h-9 lg:h-10">
          <Link to={`/recipe/${id}`}>View Recipe</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
