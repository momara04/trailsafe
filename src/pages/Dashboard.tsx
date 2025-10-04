import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Settings, Users, MapPin, Clock, TrendingUp, AlertCircle, Cloud, Droplets, Wind, Battery, Activity, Shield, Sun, CloudRain, Backpack, AlertTriangle, Map as MapIcon, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  // Mock weather data
  const weather = {
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 45,
    windSpeed: 8,
    safetyLevel: "Excellent",
    hourlyForecast: [
      { time: "Now", temp: 72, condition: "partly-cloudy" },
      { time: "1PM", temp: 74, condition: "sunny" },
      { time: "2PM", temp: 76, condition: "sunny" },
      { time: "3PM", temp: 75, condition: "partly-cloudy" },
      { time: "4PM", temp: 73, condition: "cloudy" },
      { time: "5PM", temp: 70, condition: "cloudy" },
    ]
  };

  // Mock safety status data
  const safetyStatus = {
    battery: 87,
    movement: "Normal",
    heartRate: 72,
    lastCheckIn: "2 min ago",
    gpsSignal: "Strong",
    anomaliesDetected: 0
  };

  const handleSOS = () => {
    toast({ 
      title: "SOS Alert Sent!", 
      description: "Emergency contacts have been notified.",
      variant: "default" 
    });
  };

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8 animate-fade-in">
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
          
          <Card className="hover-scale border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Battery</CardTitle>
              <Battery className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">{safetyStatus.battery}%</div>
              <p className="text-xs text-muted-foreground mt-1">Device status</p>
            </CardContent>
          </Card>

          <Card className="hover-scale border-2 bg-success/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Safety Status</CardTitle>
              <Shield className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">Safe</div>
              <p className="text-xs text-muted-foreground mt-1">All systems active</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-8 animate-fade-in">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Cloud className="h-6 w-6 text-primary" />
                Weather Conditions
              </CardTitle>
              <CardDescription>Current conditions for your location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-5xl font-bold">{weather.temperature}°F</div>
                  <p className="text-lg text-muted-foreground">{weather.condition}</p>
                </div>
                <div className="bg-primary/10 rounded-full p-4">
                  <Sun className="h-12 w-12 text-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 border-2 rounded-lg">
                  <Droplets className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Humidity</p>
                    <p className="text-lg font-bold">{weather.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 border-2 rounded-lg">
                  <Wind className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Wind Speed</p>
                    <p className="text-lg font-bold">{weather.windSpeed} mph</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-success/10 border-2 border-success/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-success" />
                  <p className="font-semibold text-success">Safety Level: {weather.safetyLevel}</p>
                </div>
                <p className="text-sm text-muted-foreground">Perfect conditions for hiking today</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-3">Hourly Forecast</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {weather.hourlyForecast.map((hour, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 p-3 border-2 rounded-lg min-w-[80px]">
                      <p className="text-xs font-medium">{hour.time}</p>
                      {hour.condition === 'sunny' && <Sun className="h-5 w-5 text-primary" />}
                      {hour.condition === 'partly-cloudy' && <Cloud className="h-5 w-5 text-primary" />}
                      {hour.condition === 'cloudy' && <CloudRain className="h-5 w-5 text-primary" />}
                      <p className="text-sm font-bold">{hour.temp}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-success" />
                Anomaly Detection
              </CardTitle>
              <CardDescription>Real-time safety monitoring status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-success/10 border-2 border-success/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
                    <p className="font-semibold text-success">All Systems Normal</p>
                  </div>
                  <Badge variant="default" className="bg-success text-success-foreground">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">No anomalies detected</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Battery className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">Battery Level</p>
                      <p className="text-sm text-muted-foreground">Device power status</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-success">{safetyStatus.battery}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">Movement Status</p>
                      <p className="text-sm text-muted-foreground">Activity detection</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-success">{safetyStatus.movement}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Heart Rate</p>
                      <p className="text-sm text-muted-foreground">Real-time monitoring</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{safetyStatus.heartRate} <span className="text-sm text-muted-foreground">bpm</span></p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium">GPS Signal</p>
                      <p className="text-sm text-muted-foreground">Location tracking</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-success">{safetyStatus.gpsSignal}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border-2 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Last Check-in</p>
                      <p className="text-sm text-muted-foreground">Auto check-in status</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{safetyStatus.lastCheckIn}</p>
                  </div>
                </div>

                <div className="p-4 border-2 rounded-lg bg-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Anomalies Detected</p>
                        <p className="text-sm text-muted-foreground">Last 24 hours</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-success">{safetyStatus.anomaliesDetected}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in">
          <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow flex-col h-24 gap-2" onClick={() => navigate("/new-hike")}>
            <MapPin className="h-6 w-6" />
            <span>Start Hike</span>
          </Button>
          <Button size="lg" variant="outline" className="border-2 flex-col h-24 gap-2" onClick={() => navigate("/gear-checklist")}>
            <Backpack className="h-6 w-6" />
            <span>Gear Checklist</span>
          </Button>
          <Button size="lg" variant="outline" className="border-2 flex-col h-24 gap-2" onClick={() => navigate("/wildlife-alerts")}>
            <AlertTriangle className="h-6 w-6" />
            <span>Wildlife Alerts</span>
          </Button>
          <Button size="lg" variant="outline" className="border-2 flex-col h-24 gap-2" onClick={() => navigate("/offline-maps")}>
            <MapIcon className="h-6 w-6" />
            <span>Offline Maps</span>
          </Button>
        </div>

        <Card className="mb-8 border-2 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Check-in Reminder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Next automatic check-in in:</p>
                <p className="text-2xl font-bold text-primary">15 minutes</p>
              </div>
              <Button variant="outline">Check In Now</Button>
            </div>
          </CardContent>
        </Card>

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

      <Button
        size="lg"
        variant="destructive"
        className="fixed bottom-8 right-8 shadow-2xl text-lg py-6 px-8 hover:scale-105 transition-transform z-50"
        onClick={handleSOS}
      >
        <AlertCircle className="h-6 w-6 mr-2" />
        SEND SOS ALERT
      </Button>
    </div>
  );
};

export default Dashboard;
