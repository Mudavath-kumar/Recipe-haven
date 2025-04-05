import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/lib/api";
import {
  Award,
  Calendar,
  ChefHat,
  Coffee,
  Heart,
  LogOut, Menu,
  Pizza,
  PlusCircle,
  Search, User,
  Utensils,
  Video,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const isLoggedIn = authService.isLoggedIn();
      setIsAuthenticated(isLoggedIn);
      
      if (isLoggedIn) {
        setUser(authService.getCurrentUser());
      }
    };

    checkAuth();
    
    // Add event listener for storage events to handle login/logout in other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === 'token' || event.key === 'user') {
        checkAuth();
      }
    });

    return () => {
      window.removeEventListener('storage', () => {});
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowMobileSearch(false);
    } else {
      toast({
        title: "Search Error",
        description: "Please enter a search term",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    try {
      authService.logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      setIsAuthenticated(false);
      setUser(null);
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const cuisineCategories = [
    { to: "/popular-recipes?category=indian", label: "Indian", icon: <ChefHat className="h-4 w-4 mr-2 text-amber-500" /> },
    { to: "/popular-recipes?category=italian", label: "Italian", icon: <Pizza className="h-4 w-4 mr-2 text-red-500" /> },
    { to: "/popular-recipes?category=asian", label: "Asian", icon: <Utensils className="h-4 w-4 mr-2 text-emerald-500" /> },
    { to: "/popular-recipes?category=middle-eastern", label: "Middle Eastern", icon: <Coffee className="h-4 w-4 mr-2 text-amber-600" /> },
    { to: "/popular-recipes?category=french", label: "French", icon: <ChefHat className="h-4 w-4 mr-2 text-blue-500" /> },
  ];

  const dietaryCategories = [
    { to: "/popular-recipes?filter=vegetarian", label: "Vegetarian", icon: <Heart className="h-4 w-4 mr-2 text-green-500" /> },
    { to: "/popular-recipes?filter=non-vegetarian", label: "Non-Vegetarian", icon: <Utensils className="h-4 w-4 mr-2 text-red-500" /> },
    { to: "/popular-recipes?filter=dessert", label: "Desserts & Sweets", icon: <Coffee className="h-4 w-4 mr-2 text-pink-500" /> },
  ];

  const exploreCategories = [
    { to: "/popular-recipes", label: "Popular", icon: <Award className="h-4 w-4 mr-2 text-amber-500" /> },
    { to: "/new-recipes", label: "New", icon: <Calendar className="h-4 w-4 mr-2 text-blue-500" /> },
    { to: "/food-videos", label: "Videos", icon: <Video className="h-4 w-4 mr-2 text-purple-500" /> },
    isAuthenticated ? { to: "/add-recipe", label: "Add Recipe", icon: <PlusCircle className="h-4 w-4 mr-2 text-green-500" /> } : null,
  ].filter(Boolean);

  return (
    <nav className="border-b fixed top-0 left-0 right-0 bg-white z-10 shadow-sm">
      <div className="container px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-semibold tracking-tight mr-6 bg-gradient-to-r from-recipe-700 to-recipe-900 text-transparent bg-clip-text">
            RecipeHaven
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-slate-100 transition-colors">
                  Cuisines
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Explore Cuisines</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {cuisineCategories.map((item, idx) => (
                  <DropdownMenuItem key={idx} asChild>
                    <Link to={item.to} className="flex items-center cursor-pointer w-full">
                      {item.icon}
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-slate-100 transition-colors">
                  Dietary
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Dietary Preferences</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dietaryCategories.map((item, idx) => (
                  <DropdownMenuItem key={idx} asChild>
                    <Link to={item.to} className="flex items-center cursor-pointer w-full">
                      {item.icon}
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-slate-100 transition-colors">
                  Explore
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Discover More</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {exploreCategories.map((item, idx) => (
                  item && (
                    <DropdownMenuItem key={idx} asChild>
                      <Link to={item.to} className="flex items-center cursor-pointer w-full">
                        {item.icon}
                        {item.label}
                        {item.label === "New" && (
                          <Badge className="ml-2 bg-green-500 hover:bg-green-600" variant="secondary">New</Badge>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  )
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex items-center">
          <form onSubmit={handleSearch} className="hidden md:flex relative mr-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="pl-10 pr-4 w-[200px] lg:w-[260px] h-9 bg-gray-50 border-gray-200 focus-visible:ring-1 focus-visible:ring-offset-0"
              />
            </div>
          </form>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden mr-2"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-8 w-8 p-0 overflow-hidden border">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center cursor-pointer w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/add-recipe" className="flex items-center cursor-pointer w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Recipe
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-red-500 hover:text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" className="hover:bg-slate-100">
                <Link to="/login">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              
              <Button asChild className="bg-recipe-700 hover:bg-recipe-800">
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Link to="/" className="text-xl font-semibold bg-gradient-to-r from-recipe-700 to-recipe-900 text-transparent bg-clip-text">
                    RecipeHaven
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>
                
                {showMobileSearch && (
                  <form onSubmit={handleSearch} className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search recipes..."
                        className="pl-10 pr-4 w-full bg-gray-50 border-gray-200"
                      />
                    </div>
                  </form>
                )}
                
                <div className="space-y-1 flex-grow">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Cuisines</div>
                  {cuisineCategories.map((item, idx) => (
                    <SheetClose key={`cuisine-${idx}`} asChild>
                      <Link
                        to={item.to}
                        className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md text-sm font-medium w-full"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="mt-4 px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Dietary</div>
                  {dietaryCategories.map((item, idx) => (
                    <SheetClose key={`dietary-${idx}`} asChild>
                      <Link
                        to={item.to}
                        className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md text-sm font-medium w-full"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="mt-4 px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Explore</div>
                  {exploreCategories.map((item, idx) => (
                    item && (
                      <SheetClose key={`explore-${idx}`} asChild>
                        <Link
                          to={item.to}
                          className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-md text-sm font-medium w-full"
                        >
                          {item.icon}
                          {item.label}
                          {item.label === "New" && (
                            <Badge className="ml-2 bg-green-500 hover:bg-green-600 text-xs" variant="secondary">New</Badge>
                          )}
                        </Link>
                      </SheetClose>
                    )
                  ))}
                  
                  <div className="mt-6 pt-6 border-t">
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <SheetClose asChild>
                          <Button asChild variant="outline" className="w-full justify-start">
                            <Link to="/profile">
                              <User className="mr-2 h-4 w-4" />
                              My Profile
                            </Link>
                          </Button>
                        </SheetClose>
                        
                        <SheetClose asChild>
                          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                          </Button>
                        </SheetClose>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <SheetClose asChild>
                          <Button asChild variant="outline" className="w-full justify-start">
                            <Link to="/login">
                              <User className="mr-2 h-4 w-4" />
                              Login
                            </Link>
                          </Button>
                        </SheetClose>
                        
                        <SheetClose asChild>
                          <Button asChild className="w-full bg-recipe-700 hover:bg-recipe-800">
                            <Link to="/signup">Sign up</Link>
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {showMobileSearch && (
        <div className="p-3 bg-white shadow-md md:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="pl-10 pr-4 w-full bg-gray-50 border-gray-200"
              />
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};
