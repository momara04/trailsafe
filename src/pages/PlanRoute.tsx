import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mountain, Navigation, Clock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PlanRoute = () => {
  const [name, setName] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [elevation, setElevation] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePlanRoute = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Route planned!", description: "Your route has been saved." });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Plan Route</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto border-2 shadow-xl animate-fade-in">
          <CardHeader className="text-center">
            <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Mountain className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Plan Your Hike</CardTitle>
            <CardDescription>Create a route plan for your next adventure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePlanRoute} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-base flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Route Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g., Summit Trail Loop"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 border-2"
                />
              </div>

              <div>
                <Label htmlFor="distance" className="text-base flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  Distance (km)
                </Label>
                <Input
                  id="distance"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 5.2"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="mt-2 border-2"
                />
              </div>

              <div>
                <Label htmlFor="duration" className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Estimated Duration (minutes)
                </Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="e.g., 120"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="mt-2 border-2"
                />
              </div>

              <div>
                <Label htmlFor="elevation" className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Elevation Gain (m)
                </Label>
                <Input
                  id="elevation"
                  type="number"
                  placeholder="e.g., 450"
                  value={elevation}
                  onChange={(e) => setElevation(e.target.value)}
                  className="mt-2 border-2"
                />
              </div>

              <Button type="submit" size="lg" className="w-full shadow-lg">
                Save Route
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PlanRoute;
