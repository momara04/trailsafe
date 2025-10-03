import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, AlertCircle, Navigation } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ActiveHike = () => {
  const [duration, setDuration] = useState(3245); // Mock duration in seconds
  const [location] = useState({ latitude: 34.0522, longitude: -118.2437 }); // Mock location
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEndHike = () => {
    toast({ title: "Hike completed!", description: "Your hike has been saved." });
    navigate("/");
  };

  const handleSOS = () => {
    toast({ 
      title: "SOS Alert Sent!", 
      description: "Emergency contacts have been notified.",
      variant: "default" 
    });
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Mount Wilson Trail</h1>
          </div>
          <Badge variant="default" className="bg-success text-success-foreground animate-pulse">
            Live Tracking
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          <Card className="border-2 shadow-xl bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Clock className="h-6 w-6 text-primary" />
                Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-primary">{formatDuration(duration)}</div>
              <p className="text-sm text-muted-foreground mt-2">Elapsed time</p>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <MapPin className="h-6 w-6 text-primary" />
                Current Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Latitude</p>
                    <p className="font-mono font-bold">{location.latitude.toFixed(6)}</p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground mb-1">Longitude</p>
                    <p className="font-mono font-bold">{location.longitude.toFixed(6)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Navigation className="h-4 w-4 text-success" />
                  <span>GPS signal: Strong • Accuracy: ±5m</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-muted/50">
            <CardHeader>
              <CardTitle className="text-xl">Hiking Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">4.2</p>
                  <p className="text-xs text-muted-foreground">km traveled</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">324</p>
                  <p className="text-xs text-muted-foreground">meters elevation</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">3.8</p>
                  <p className="text-xs text-muted-foreground">km/h avg speed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            size="lg" 
            variant="destructive" 
            className="w-full shadow-xl text-lg py-6 hover:scale-105 transition-transform"
            onClick={handleSOS}
          >
            <AlertCircle className="h-6 w-6 mr-2" />
            SEND SOS ALERT
          </Button>

          <Button 
            size="lg" 
            variant="outline" 
            className="w-full border-2"
            onClick={handleEndHike}
          >
            End Hike
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ActiveHike;
