import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Shield, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewHike = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartHike = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ 
      title: "Hike started!", 
      description: "Your hike tracking has begun." 
    });
    navigate(`/hike/demo-active`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Start New Hike</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto border-2 shadow-xl animate-fade-in">
          <CardHeader className="text-center">
            <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Start Tracking</CardTitle>
            <CardDescription>Begin tracking your hike for safety and records</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStartHike} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-base">Hike Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g., Morning Trail Run"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 border-2"
                />
              </div>

              <div className="bg-primary/5 p-6 rounded-lg border-2 border-primary/20 space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Safety Features Active
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm">
                    <div className="bg-success rounded-full p-1">
                      <MapPin className="h-3 w-3 text-success-foreground" />
                    </div>
                    <span>Real-time location tracking</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <div className="bg-success rounded-full p-1">
                      <Bell className="h-3 w-3 text-success-foreground" />
                    </div>
                    <span>Emergency contact notifications</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <div className="bg-success rounded-full p-1">
                      <Shield className="h-3 w-3 text-success-foreground" />
                    </div>
                    <span>Anomaly detection</span>
                  </li>
                </ul>
              </div>

              <Button type="submit" size="lg" className="w-full shadow-lg">
                Start Hike
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewHike;
