
/**
 * Utility functions for handling recipe images
 */

// Cache for previously loaded images to improve performance
const imageCache: Record<string, string> = {};

/**
 * Get the appropriate image URL for a recipe based on its title and category
 * Uses a specific matching algorithm and includes a caching mechanism for performance
 * 
 * @param title Recipe title
 * @param category Recipe category
 * @param providedImageUrl Optional image URL provided directly
 * @returns The best matching image URL
 */
export const getRecipeImage = (
  title: string, 
  category: string, 
  providedImageUrl?: string
): string => {
  // Create a cache key for this request
  const cacheKey = `${title}-${category}-${providedImageUrl || ''}`;
  
  // Return cached result if available
  if (imageCache[cacheKey]) {
    return imageCache[cacheKey];
  }

  // If a specific image URL is provided and it's valid, use it
  if (
    providedImageUrl && 
    providedImageUrl.trim() !== '' && 
    !providedImageUrl.includes("undefined") && 
    providedImageUrl.startsWith("http")
  ) {
    imageCache[cacheKey] = providedImageUrl;
    return providedImageUrl;
  }
  
  // Map specific dishes to specific images for accuracy
  const dishSpecificImages: Record<string, string> = {
    // Indian dishes
    "Butter Chicken": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&auto=format&fit=crop&q=80",
    "Chicken Biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
    "Tandoori Chicken": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop&q=80",
    "Paneer Tikka": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80",
    "Palak Paneer": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80",
    "Chole Bhature": "https://images.unsplash.com/photo-1626132647957-5659d0bc9222?w=800&auto=format&fit=crop&q=80",
    "Dal Makhani": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80",
    "Masala Dosa": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80",
    "Biryani": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80",
    
    // Italian dishes
    "Classic Margherita Pizza": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80",
    "Mushroom Risotto": "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop&q=80",
    "Vegetable Lasagna": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=800&auto=format&fit=crop&q=80",
    "Chicken Alfredo Pasta": "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&auto=format&fit=crop&q=80",
    "Spaghetti Carbonara": "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&auto=format&fit=crop&q=80",
    "Lasagna": "https://images.unsplash.com/photo-1619895092538-128341789043?w=800&auto=format&fit=crop&q=80",
    
    // Desserts
    "Chocolate Chip Cookies": "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&auto=format&fit=crop&q=80",
    "Banana Bread": "https://images.unsplash.com/photo-1584736286279-4a5f6e2b0858?w=800&auto=format&fit=crop&q=80",
    "Tiramisu": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&auto=format&fit=crop&q=80",
    "Red Velvet Cake": "https://images.unsplash.com/photo-1586788680434-30d324626f14?w=800&auto=format&fit=crop&q=80",
    "Mango Sticky Rice": "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&auto=format&fit=crop&q=80",
    "Chocolate Mousse": "https://images.unsplash.com/photo-1551529834-525807d6b4f3?w=800&auto=format&fit=crop&q=80",
    "Strawberry Cheesecake": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&auto=format&fit=crop&q=80",
    "Mint Chocolate Chip Ice Cream": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80",
    
    // Salads
    "Greek Salad": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&auto=format&fit=crop&q=80",
    "Caesar Salad": "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=80",
    
    // Math-inspired names (special theme for the app)
    "Pi(e) Day Special": "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=800&auto=format&fit=crop&q=80", // Apple pie
    "Fibonacci Spiral Cinnamon Rolls": "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800&auto=format&fit=crop&q=80",
    "Golden Ratio Honey Cake": "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=800&auto=format&fit=crop&q=80",
    "Pythagorean Theorem Pizza": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80",
    "Fractal Broccoli Salad": "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&auto=format&fit=crop&q=80",
    "Calculus Chocolate Layer Cake": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",
    "Probability Distribution Parfait": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&auto=format&fit=crop&q=80",
    "Algebraic Avocado Toast": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
    "Geometry Berry Tart": "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=800&auto=format&fit=crop&q=80",
    "Prime Number Pasta": "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&auto=format&fit=crop&q=80",
  };

  // Try to find an exact match for the recipe title
  if (dishSpecificImages[title]) {
    imageCache[cacheKey] = dishSpecificImages[title];
    return dishSpecificImages[title];
  }
  
  // Try to find a partial match by checking if any key is a substring of the recipe title
  for (const [dish, imageUrl] of Object.entries(dishSpecificImages)) {
    if (title.toLowerCase().includes(dish.toLowerCase()) || 
        dish.toLowerCase().includes(title.toLowerCase())) {
      imageCache[cacheKey] = imageUrl;
      return imageUrl;
    }
  }
  
  // Fallback to category-based images if no specific match found
  const categoryImages: Record<string, string> = {
    'Indian': 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop&q=80',
    'Italian': 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop&q=80',
    'Chinese': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    'Desserts': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80',
    'Baking': 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=800&auto=format&fit=crop&q=80',
    'Salads': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    'Asian': 'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=800&auto=format&fit=crop&q=80',
    'Vegetarian': 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&auto=format&fit=crop&q=80',
    'Non-Vegetarian': 'https://images.unsplash.com/photo-1607116667981-27b1f21c5c04?w=800&auto=format&fit=crop&q=80',
    'Mexican': 'https://images.unsplash.com/photo-1564767609342-620cb19b2357?w=800&auto=format&fit=crop&q=80',
    'American': 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
    'Thai': 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&auto=format&fit=crop&q=80',
    'Japanese': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop&q=80',
    'Other': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80',
    'default': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80',
  };

  // Use category-specific image or default if nothing else matches
  const resultImage = categoryImages[category] || categoryImages.default;
  imageCache[cacheKey] = resultImage;
  return resultImage;
};

/**
 * Preload common recipe images to improve user experience
 */
export const preloadCommonRecipeImages = (): void => {
  const imagesToPreload = [
    'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&auto=format&fit=crop&q=80', // Indian
    'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop&q=80', // Italian
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&auto=format&fit=crop&q=80', // Desserts
  ];
  
  // Create hidden image elements to trigger browser caching
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};
