import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertTriangle, MapPin, Clock, Squirrel } from "lucide-react";

interface WildlifeAlert {
  id: string;
  animal: string;
  location: string;
  distance: string;
  time: string;
  severity: "low" | "medium" | "high";
  description: string;
}

const WildlifeAlerts = () => {
  const navigate = useNavigate();
  const [alerts] = useState<WildlifeAlert[]>([
    {
      id: "1",
      animal: "Black Bear",
      location: "Summit Trail, Mile 3.2",
      distance: "0.5 km away",
      time: "15 minutes ago",
      severity: "high",
      description: "Bear spotted near trail. Keep distance, make noise, carry bear spray.",
    },
    {
      id: "2",
      animal: "Mountain Lion",
      location: "Ridge Path, North Section",
      distance: "2.1 km away",
      time: "1 hour ago",
      severity: "high",
      description: "Tracks spotted. Avoid hiking alone, keep children close.",
    },
    {
      id: "3",
      animal: "Rattlesnake",
      location: "Canyon Loop Trail",
      distance: "1.3 km away",
      time: "2 hours ago",
      severity: "medium",
      description: "Snake spotted sunning on rocks. Watch your step, stay on trail.",
    },
    {
      id: "4",
      animal: "Elk Herd",
      location: "Meadow View Trail",
      distance: "3.5 km away",
      time: "3 hours ago",
      severity: "medium",
      description: "Large herd with calves. Maintain 25m distance, do not approach.",
    },
    {
      id: "5",
      animal: "Coyote Pack",
      location: "Valley Trail Junction",
      distance: "4.2 km away",
      time: "5 hours ago",
      severity: "low",
      description: "Pack heard in area. Keep pets leashed, store food properly.",
    },
    {
      id: "6",
      animal: "Deer",
      location: "Forest Loop",
      distance: "0.8 km away",
      time: "30 minutes ago",
      severity: "low",
      description: "Multiple deer spotted. Generally harmless but don't feed.",
    },
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getSeverityIcon = (severity: string) => {
    return severity === "high" ? AlertTriangle : Squirrel;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Wildlife Alerts</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-6 border-2 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-primary" />
              Recent Wildlife Sightings
            </CardTitle>
            <CardDescription>
              Real-time alerts from hikers in your area. Stay aware, stay safe.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-4 animate-fade-in">
          {alerts.map((alert) => {
            const SeverityIcon = getSeverityIcon(alert.severity);
            
            return (
              <Card key={alert.id} className="border-2 shadow-lg hover:shadow-xl transition-all hover-scale">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-full ${
                        alert.severity === "high" 
                          ? "bg-destructive/20" 
                          : alert.severity === "medium"
                          ? "bg-primary/20"
                          : "bg-secondary/50"
                      }`}>
                        <SeverityIcon className={`h-5 w-5 ${
                          alert.severity === "high"
                            ? "text-destructive"
                            : "text-primary"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{alert.animal}</CardTitle>
                          <Badge variant={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <CardDescription className="mt-2">
                          {alert.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{alert.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default WildlifeAlerts;
