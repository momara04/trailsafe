import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mountain, MapPin, TrendingUp, Clock, Users, Backpack, AlertTriangle, Map as MapIcon, ArrowLeft, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const InteractiveTrailMaps = () => {
  const navigate = useNavigate();
  const [selectedTrail, setSelectedTrail] = useState<string | null>(null);

  // Mock trail data
  const trails = [
    {
      id: "1",
      name: "Summit Peak Trail",
      difficulty: "Hard",
      distance: 12.5,
      elevation: 2840,
      duration: 360,
      rating: 4.8,
      reviews: 342,
      features: ["Scenic Views", "Wildlife", "Waterfall"],
      path: "Mountain ridge with steep inclines",
      difficultyColor: "text-red-500",
      difficultyBg: "bg-red-50 dark:bg-red-950/30"
    },
    {
      id: "2",
      name: "Forest Loop Trail",
      difficulty: "Easy",
      distance: 5.2,
      elevation: 420,
      duration: 120,
      rating: 4.6,
      reviews: 521,
      features: ["Family Friendly", "Shaded", "Flat Terrain"],
      path: "Gentle forest path with minimal elevation",
      difficultyColor: "text-green-500",
      difficultyBg: "bg-green-50 dark:bg-green-950/30"
    },
    {
      id: "3",
      name: "Canyon Ridge Trail",
      difficulty: "Moderate",
      distance: 8.7,
      elevation: 1250,
      duration: 240,
      rating: 4.7,
      reviews: 287,
      features: ["Rock Formations", "Canyon Views", "Photography"],
      path: "Mixed terrain with moderate climbs",
      difficultyColor: "text-orange-500",
      difficultyBg: "bg-orange-50 dark:bg-orange-950/30"
    },
    {
      id: "4",
      name: "Lakeside Vista Trail",
      difficulty: "Moderate",
      distance: 6.8,
      elevation: 890,
      duration: 180,
      rating: 4.9,
      reviews: 612,
      features: ["Lake Views", "Beach Access", "Picnic Areas"],
      path: "Rolling hills with lake shoreline",
      difficultyColor: "text-orange-500",
      difficultyBg: "bg-orange-50 dark:bg-orange-950/30"
    },
    {
      id: "5",
      name: "Alpine Challenge Trail",
      difficulty: "Hard",
      distance: 15.3,
      elevation: 3420,
      duration: 480,
      rating: 4.5,
      reviews: 189,
      features: ["Expert Only", "Alpine Terrain", "Summit Views"],
      path: "Challenging alpine route with technical sections",
      difficultyColor: "text-red-500",
      difficultyBg: "bg-red-50 dark:bg-red-950/30"
    }
  ];

  // Elevation profile data (mock)
  const elevationProfile = [
    { distance: 0, elevation: 0 },
    { distance: 2, elevation: 420 },
    { distance: 4, elevation: 650 },
    { distance: 6, elevation: 1200 },
    { distance: 8, elevation: 980 },
    { distance: 10, elevation: 1850 },
    { distance: 12, elevation: 2840 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <div className="bg-primary rounded-lg p-1.5 md:p-2">
              <MapIcon className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
            </div>
            <h1 className="text-lg md:text-2xl font-bold">Trail Maps</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4 md:mb-8 h-auto">
            <TabsTrigger value="all" className="gap-1 md:gap-2 py-2 md:py-2.5 text-xs md:text-sm">
              <MapIcon className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">All Trails</span>
              <span className="sm:hidden">All</span>
            </TabsTrigger>
            <TabsTrigger value="easy" className="gap-1 md:gap-2 py-2 md:py-2.5 text-xs md:text-sm">
              <Mountain className="h-3 w-3 md:h-4 md:w-4" />
              Easy
            </TabsTrigger>
            <TabsTrigger value="moderate" className="gap-1 md:gap-2 py-2 md:py-2.5 text-xs md:text-sm">
              <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Moderate</span>
              <span className="sm:hidden">Mod</span>
            </TabsTrigger>
            <TabsTrigger value="hard" className="gap-1 md:gap-2 py-2 md:py-2.5 text-xs md:text-sm">
              <AlertTriangle className="h-3 w-3 md:h-4 md:w-4" />
              Hard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 md:space-y-6">
            <div className="grid gap-4 md:gap-6">
              {trails.map((trail) => (
                <Card 
                  key={trail.id}
                  className="border-2 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTrail(trail.id)}
                >
                  <CardHeader className="pb-3 md:pb-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-lg md:text-2xl mb-1 md:mb-2">{trail.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                          <MapPin className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
                          <span className="line-clamp-1">{trail.path}</span>
                        </CardDescription>
                      </div>
                      <Badge className={`${trail.difficultyBg} ${trail.difficultyColor} border-0 text-xs shrink-0`}>
                        {trail.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4">
                    <div className="grid grid-cols-4 gap-2 md:gap-4">
                      <div className="text-center p-2 md:p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-0.5 md:mb-1">Distance</p>
                        <p className="text-sm md:text-lg font-bold">{trail.distance} km</p>
                      </div>
                      <div className="text-center p-2 md:p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-0.5 md:mb-1">Elevation</p>
                        <p className="text-sm md:text-lg font-bold">{trail.elevation} ft</p>
                      </div>
                      <div className="text-center p-2 md:p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-0.5 md:mb-1">Duration</p>
                        <p className="text-sm md:text-lg font-bold">{Math.floor(trail.duration / 60)}h {trail.duration % 60}m</p>
                      </div>
                      <div className="text-center p-2 md:p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-0.5 md:mb-1">Rating</p>
                        <p className="text-sm md:text-lg font-bold">★ {trail.rating}</p>
                      </div>
                    </div>

                    {/* Elevation Profile Visualization */}
                    <div className="p-3 md:p-4 border-2 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <p className="text-xs md:text-sm font-semibold">Elevation Profile</p>
                        <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                      </div>
                      <div className="relative h-20 md:h-24 flex items-end gap-0.5 md:gap-1">
                        {elevationProfile.map((point, idx) => {
                          const maxElevation = Math.max(...elevationProfile.map(p => p.elevation));
                          const heightPercent = (point.elevation / maxElevation) * 100;
                          return (
                            <div 
                              key={idx}
                              className="flex-1 bg-primary/60 rounded-t transition-all hover:bg-primary"
                              style={{ height: `${heightPercent}%` }}
                              title={`${point.distance}km: ${point.elevation}ft`}
                            />
                          );
                        })}
                      </div>
                      <div className="flex justify-between mt-1.5 md:mt-2 text-xs text-muted-foreground">
                        <span>Start</span>
                        <span>Mid</span>
                        <span>End</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {trail.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 md:pt-3 border-t gap-3">
                      <p className="text-xs md:text-sm text-muted-foreground">
                        <Users className="h-3 w-3 md:h-4 md:w-4 inline mr-1" />
                        {trail.reviews} hikers
                      </p>
                      <Button size="sm" className="gap-1 md:gap-2 text-xs md:text-sm">
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                        <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="easy" className="space-y-6">
            <div className="grid gap-6">
              {trails.filter(t => t.difficulty === "Easy").map((trail) => (
                <Card 
                  key={trail.id}
                  className="border-2 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTrail(trail.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{trail.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {trail.path}
                        </CardDescription>
                      </div>
                      <Badge className={`${trail.difficultyBg} ${trail.difficultyColor} border-0`}>
                        {trail.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Distance</p>
                        <p className="text-lg font-bold">{trail.distance} km</p>
                      </div>
                      <div className="text-center p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Elevation</p>
                        <p className="text-lg font-bold">{trail.elevation} ft</p>
                      </div>
                      <div className="text-center p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Duration</p>
                        <p className="text-lg font-bold">{Math.floor(trail.duration / 60)}h {trail.duration % 60}m</p>
                      </div>
                      <div className="text-center p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Rating</p>
                        <p className="text-lg font-bold">★ {trail.rating}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {trail.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full gap-2">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="moderate" className="space-y-6">
            <div className="grid gap-6">
              {trails.filter(t => t.difficulty === "Moderate").map((trail) => (
                <Card 
                  key={trail.id}
                  className="border-2 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTrail(trail.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{trail.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {trail.path}
                        </CardDescription>
                      </div>
                      <Badge className={`${trail.difficultyBg} ${trail.difficultyColor} border-0`}>
                        {trail.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Distance</p>
                        <p className="text-lg font-bold">{trail.distance} km</p>
                      </div>
                      <div className="text-center p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Elevation</p>
                        <p className="text-lg font-bold">{trail.elevation} ft</p>
                      </div>
                      <div className="text-center p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Duration</p>
                        <p className="text-lg font-bold">{Math.floor(trail.duration / 60)}h {trail.duration % 60}m</p>
                      </div>
                      <div className="text-center p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Rating</p>
                        <p className="text-lg font-bold">★ {trail.rating}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {trail.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full gap-2">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hard" className="space-y-6">
            <div className="grid gap-6">
              {trails.filter(t => t.difficulty === "Hard").map((trail) => (
                <Card 
                  key={trail.id}
                  className="border-2 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTrail(trail.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{trail.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {trail.path}
                        </CardDescription>
                      </div>
                      <Badge className={`${trail.difficultyBg} ${trail.difficultyColor} border-0`}>
                        {trail.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Distance</p>
                        <p className="text-lg font-bold">{trail.distance} km</p>
                      </div>
                      <div className="text-center p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Elevation</p>
                        <p className="text-lg font-bold">{trail.elevation} ft</p>
                      </div>
                      <div className="text-center p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Duration</p>
                        <p className="text-lg font-bold">{Math.floor(trail.duration / 60)}h {trail.duration % 60}m</p>
                      </div>
                      <div className="text-center p-3 border-2 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Rating</p>
                        <p className="text-lg font-bold">★ {trail.rating}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {trail.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full gap-2">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default InteractiveTrailMaps;
