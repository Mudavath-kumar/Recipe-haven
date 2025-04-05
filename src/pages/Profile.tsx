import { RecipeCard } from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import api, { authService } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Edit,
    FileText,
    Link as LinkIcon,
    Loader2,
    Mail,
    Save,
    UserCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  avatar_url: z.string().url().optional().or(z.literal('')),
  bio: z.string().max(500, { message: "Bio cannot exceed 500 characters" }).optional(),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userRecipes, setUserRecipes] = useState<any[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (!authService.isLoggedIn()) {
      navigate("/login");
      return;
    }

    // Load user profile data
    const loadUserData = async () => {
      try {
        const userData = await authService.getUserProfile();
        if (userData) {
          form.reset({
            name: userData.name,
            email: userData.email,
            avatar_url: userData.avatar_url || '',
            bio: userData.bio || '',
            website: userData.website || '',
          });
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
        toast.error("Failed to load your profile information");
      }
    };

    // Load user's recipes
    const loadUserRecipes = async () => {
      setIsLoadingRecipes(true);
      try {
        const response = await api.get('/recipes/user');
        setUserRecipes(response);
      } catch (error) {
        console.error("Failed to load user recipes:", error);
      } finally {
        setIsLoadingRecipes(false);
      }
    };

    loadUserData();
    loadUserRecipes();
  }, [navigate]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      avatar_url: '',
      bio: '',
      website: '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      await authService.updateProfile(data);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="recipes">My Recipes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    View and manage your personal details
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <div className="relative">
                            <UserCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                              <Input 
                                placeholder="John Doe" 
                                className="pl-10" 
                                {...field} 
                                disabled={!isEditing}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                              <Input 
                                placeholder="your.email@example.com" 
                                className="pl-10" 
                                {...field} 
                                disabled={true} // Email cannot be changed
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="avatar_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Picture URL</FormLabel>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/your-image.jpg" 
                              className="pl-10" 
                              {...field} 
                              disabled={!isEditing}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about yourself and your cooking interests..." 
                              className="pl-10 min-h-32" 
                              {...field} 
                              disabled={!isEditing}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input 
                              placeholder="https://your-website.com" 
                              className="pl-10" 
                              {...field} 
                              disabled={!isEditing}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {isEditing && (
                    <div className="flex justify-end">
                      <Button 
                        type="submit" 
                        className="bg-recipe-700 hover:bg-recipe-800"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </div>
                  )}
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recipes" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>My Recipes</CardTitle>
                  <CardDescription>
                    Recipes you've created
                  </CardDescription>
                </div>
                <Button 
                  variant="default" 
                  className="bg-recipe-700 hover:bg-recipe-800 flex items-center gap-2"
                  onClick={() => navigate('/add-recipe')}
                >
                  <Edit className="h-4 w-4" />
                  <span>Add New Recipe</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingRecipes ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-recipe-700" />
                </div>
              ) : userRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userRecipes.map((recipe) => (
                    <RecipeCard key={recipe._id} {...recipe} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No recipes yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't created any recipes yet. Start sharing your culinary creations!
                  </p>
                  <Button 
                    onClick={() => navigate('/add-recipe')}
                    className="bg-recipe-700 hover:bg-recipe-800"
                  >
                    Create Your First Recipe
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile; 