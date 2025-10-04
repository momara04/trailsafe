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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="bg-primary rounded-lg p-2">
              <MapIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Interactive Trail Maps</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all" className="gap-2">
              <MapIcon className="h-4 w-4" />
              All Trails
            </TabsTrigger>
            <TabsTrigger value="easy" className="gap-2">
              <Mountain className="h-4 w-4" />
              Easy
            </TabsTrigger>
            <TabsTrigger value="moderate" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Moderate
            </TabsTrigger>
            <TabsTrigger value="hard" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Hard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6">
              {trails.map((trail) => (
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

                    {/* Elevation Profile Visualization */}
                    <div className="p-4 border-2 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold">Elevation Profile</p>
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div className="relative h-24 flex items-end gap-1">
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
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Start</span>
                        <span>Mid</span>
                        <span>End</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {trail.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <p className="text-sm text-muted-foreground">
                        <Users className="h-4 w-4 inline mr-1" />
                        {trail.reviews} hikers reviewed
                      </p>
                      <Button className="gap-2">
                        View Details
                        <ChevronRight className="h-4 w-4" />
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
