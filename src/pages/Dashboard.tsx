import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Settings, Users, MapPin, Clock, TrendingUp, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data for beautiful UI
  const activeHikes = [
    {
      id: "1",
      name: "Mount Wilson Trail",
      started_at: new Date(Date.now() - 3600000).toISOString(),
      status: "active"
    }
  ];

  const recentHikes = [
    {
      id: "2",
      name: "Angeles Forest Loop",
      status: "completed",
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      distance: 12.5,
      duration: 240
    },
    {
      id: "3",
      name: "Pacific Crest Trail - Section J",
      status: "planned",
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      distance: 24.8,
      duration: 480
    },
    {
      id: "4",
      name: "Morning Ridge Trail",
      status: "completed",
      created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
      distance: 8.2,
      duration: 150
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-2">
              <Mountain className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TrailSafe
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold mb-2">Your Safety Companion</h2>
          <p className="text-lg text-muted-foreground">Track your hikes, stay safe, explore confidently</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8 animate-fade-in">
          <Card className="hover-scale border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Hikes</CardTitle>
              <MapPin className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{activeHikes.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently tracking</p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Hikes</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeHikes.length + recentHikes.length}</div>
              <p className="text-xs text-muted-foreground mt-1">All adventures</p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale border-2 bg-success/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Safety Status</CardTitle>
              <Clock className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">Safe</div>
              <p className="text-xs text-muted-foreground mt-1">All systems active</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 animate-fade-in">
          <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow" onClick={() => navigate("/new-hike")}>
            <MapPin className="h-4 w-4 mr-2" />
            Start New Hike
          </Button>
          <Button size="lg" variant="outline" className="border-2" onClick={() => navigate("/plan-route")}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Plan Route
          </Button>
          <Button size="lg" variant="outline" className="border-2" onClick={() => navigate("/emergency-contacts")}>
            <Users className="h-4 w-4 mr-2" />
            Emergency Contacts
          </Button>
        </div>

        {activeHikes.length > 0 && (
          <Card className="mb-8 border-2 animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Active Hikes</CardTitle>
                  <CardDescription>Your currently active hikes</CardDescription>
                </div>
                <Badge variant="default" className="bg-success text-success-foreground">Live</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeHikes.map((hike) => (
                  <div 
                    key={hike.id} 
                    className="flex items-center justify-between p-6 border-2 rounded-lg bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-success/10 rounded-full p-3">
                        <MapPin className="h-6 w-6 text-success" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{hike.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          Started: {new Date(hike.started_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Button className="shadow-md" onClick={() => navigate(`/hike/${hike.id}`)}>
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {recentHikes.length > 0 && (
          <Card className="border-2 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">Recent Activity</CardTitle>
              <CardDescription>Your recent and planned hikes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentHikes.map((hike) => (
                  <div 
                    key={hike.id} 
                    className="flex items-center justify-between p-6 border-2 rounded-lg bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full p-3 ${
                        hike.status === 'completed' 
                          ? 'bg-success/10' 
                          : 'bg-primary/10'
                      }`}>
                        {hike.status === 'completed' ? (
                          <TrendingUp className={`h-6 w-6 ${
                            hike.status === 'completed' ? 'text-success' : 'text-primary'
                          }`} />
                        ) : (
                          <MapPin className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{hike.name}</h3>
                          <Badge variant={hike.status === 'completed' ? 'default' : 'outline'}>
                            {hike.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {hike.distance && `${hike.distance} km`}
                          {hike.duration && ` • ${Math.floor(hike.duration / 60)}h ${hike.duration % 60}m`}
                          {` • ${new Date(hike.created_at).toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-2" onClick={() => navigate(`/hike/${hike.id}`)}>
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
