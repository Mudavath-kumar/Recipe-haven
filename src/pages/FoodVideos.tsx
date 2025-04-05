
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const FoodVideos = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeVideoLoading, setActiveVideoLoading] = useState(true);
  const [thumbnailsLoaded, setThumbnailsLoaded] = useState<Record<number, boolean>>({});
  
  // Simulate loading and then reveal content
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Reset loading state when changing videos
  useEffect(() => {
    setActiveVideoLoading(true);
  }, [activeVideo]);
  
  const handleIframeLoad = () => {
    setActiveVideoLoading(false);
  };
  
  const handleThumbnailLoad = (index: number) => {
    setThumbnailsLoaded(prev => ({...prev, [index]: true}));
  };
  
  const videos = [
    {
      id: 1,
      title: "Quick & Easy Butter Chicken",
      description: "Learn how to make delicious butter chicken in under 30 minutes",
      url: "https://www.youtube.com/embed/pqpDYRZ3pYQ",
      thumbnail: "https://img.youtube.com/vi/pqpDYRZ3pYQ/maxresdefault.jpg"
    },
    {
      id: 2,
      title: "Authentic Biryani Recipe",
      description: "Master the art of making authentic biryani at home",
      url: "https://www.youtube.com/embed/nC5IFSnluZY",
      thumbnail: "https://img.youtube.com/vi/nC5IFSnluZY/maxresdefault.jpg"
    },
    {
      id: 3,
      title: "Homemade Naan Bread Recipe",
      description: "Make soft and fluffy naan bread from scratch",
      url: "https://www.youtube.com/embed/0n47msSQllA",
      thumbnail: "https://img.youtube.com/vi/0n47msSQllA/maxresdefault.jpg"
    },
    {
      id: 4,
      title: "Perfect Pasta Carbonara",
      description: "Learn to make the classic Italian pasta carbonara with a creamy sauce",
      url: "https://www.youtube.com/embed/qoHnwOHLiMk",
      thumbnail: "https://img.youtube.com/vi/qoHnwOHLiMk/maxresdefault.jpg"
    },
    {
      id: 5,
      title: "Chocolate Soufflé Masterclass",
      description: "Create a restaurant-quality chocolate soufflé at home",
      url: "https://www.youtube.com/embed/vWGvZnb50eY",
      thumbnail: "https://img.youtube.com/vi/vWGvZnb50eY/maxresdefault.jpg"
    },
    {
      id: 6,
      title: "Ultimate Ice Cream Tutorial",
      description: "Learn how to make creamy homemade ice cream without an ice cream maker",
      url: "https://www.youtube.com/embed/rCGlQhxtqMw",
      thumbnail: "https://img.youtube.com/vi/rCGlQhxtqMw/maxresdefault.jpg"
    },
    {
      id: 7,
      title: "Artisan Chocolate Truffle Making",
      description: "Create professional-quality chocolate truffles at home with simple ingredients",
      url: "https://www.youtube.com/embed/L9PDKpkZ3II",
      thumbnail: "https://img.youtube.com/vi/L9PDKpkZ3II/maxresdefault.jpg"
    },
    {
      id: 8,
      title: "Homemade Pizza from Scratch",
      description: "Make restaurant-quality pizza dough and sauce for the perfect homemade pizza",
      url: "https://www.youtube.com/embed/sv3TXMSv6Lw",
      thumbnail: "https://img.youtube.com/vi/sv3TXMSv6Lw/maxresdefault.jpg"
    }
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Cooking Videos</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-xl relative">
            {activeVideoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/30 z-10">
                <div className="flex flex-col items-center gap-2">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary border-r-2 border-opacity-50"></div>
                  <p className="text-sm text-muted-foreground">Loading video...</p>
                </div>
              </div>
            )}
            <iframe
              width="100%"
              height="100%"
              src={videos[activeVideo].url}
              title={videos[activeVideo].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              onLoad={handleIframeLoad}
            ></iframe>
          </div>
          
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{videos[activeVideo].title}</h2>
            <p className="text-gray-600 mt-2">{videos[activeVideo].description}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">More Videos</h3>
          
          {loading ? (
            // Skeleton loaders for video list
            Array(videos.length).fill(0).map((_, index) => (
              <Card key={`skeleton-${index}`} className="cursor-pointer transition-all hover:shadow-md">
                <div className="flex flex-row items-center p-3">
                  <Skeleton className="w-24 h-16 mr-3 rounded-md" />
                  <div className="flex-grow">
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </Card>
            ))
          ) : (
            videos.map((video, index) => (
              <Card 
                key={video.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${activeVideo === index ? 'border-2 border-primary' : ''}`}
                onClick={() => setActiveVideo(index)}
              >
                <div className="flex flex-row items-center p-3">
                  <div className="relative w-24 h-16 mr-3 flex-shrink-0 rounded-md overflow-hidden">
                    {!thumbnailsLoaded[index] && (
                      <Skeleton className="absolute inset-0" />
                    )}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onLoad={() => handleThumbnailLoad(index)}
                      onError={(e) => {
                        // Fallback to a default image if YouTube thumbnail fails
                        e.currentTarget.src = `https://images.unsplash.com/photo-1495399396104-ea1a01be1a0d?auto=format&fit=crop&q=80&w=500`;
                      }}
                      style={{ opacity: thumbnailsLoaded[index] ? 1 : 0 }}
                    />
                    {activeVideo !== index && thumbnailsLoaded[index] && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <CardTitle className="text-md">{video.title}</CardTitle>
                    <CardDescription className="line-clamp-1 text-xs">{video.description}</CardDescription>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodVideos;
