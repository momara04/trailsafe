import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewHike = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartHike = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: hike, error } = await supabase
        .from('hikes')
        .insert({
          user_id: user.id,
          name: name || 'Unnamed Hike',
          status: 'active',
          started_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      toast({ title: "Hike started!", description: "Your hike tracking has begun." });
      navigate(`/hike/${hike.id}`);
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
          <h1 className="text-xl font-bold">Start New Hike</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Start Tracking</CardTitle>
            <CardDescription>Begin tracking your hike for safety and records</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStartHike} className="space-y-4">
              <div>
                <Label htmlFor="name">Hike Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g., Morning Trail Run"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Safety Features Active:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Real-time location tracking</li>
                  <li>• Emergency contact notifications</li>
                  <li>• Anomaly detection</li>
                </ul>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Starting..." : "Start Hike"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewHike;
