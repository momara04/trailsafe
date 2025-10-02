import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PlanRoute = () => {
  const [name, setName] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [elevation, setElevation] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePlanRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('hikes')
        .insert({
          user_id: user.id,
          name: name || 'Unnamed Route',
          status: 'planned',
          distance: distance ? parseFloat(distance) : null,
          estimated_duration: duration ? parseInt(duration) : null,
          elevation_gain: elevation ? parseFloat(elevation) : null
        });

      if (error) throw error;

      toast({ title: "Route planned!", description: "Your route has been saved." });
      navigate("/");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Plan Route</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Plan Your Hike</CardTitle>
            <CardDescription>Create a route plan for your next adventure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePlanRoute} className="space-y-4">
              <div>
                <Label htmlFor="name">Route Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g., Summit Trail Loop"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="distance">Distance (km)</Label>
                <Input
                  id="distance"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 5.2"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="duration">Estimated Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="e.g., 120"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="elevation">Elevation Gain (m)</Label>
                <Input
                  id="elevation"
                  type="number"
                  placeholder="e.g., 450"
                  value={elevation}
                  onChange={(e) => setElevation(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving..." : "Save Route"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PlanRoute;
