import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mountain, Settings, Users, MapPin, Clock, TrendingUp, AlertCircle, Cloud, Droplets, Wind, Battery, Activity, Shield, Sun, CloudRain, Backpack, AlertTriangle, Map as MapIcon, Bell, Check, Waves, Snowflake, CloudDrizzle, UserPlus, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import * as React from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCheckInDialog, setShowCheckInDialog] = useState(false);
  const [showSafetyCheck, setShowSafetyCheck] = useState(false);
  const [safetyCheckTimer, setSafetyCheckTimer] = useState(20);

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

  // Mock trail conditions data based on weather
  const trailConditions = [
    {
      id: "1",
      type: "Flash Flood Warning",
      severity: "critical",
      icon: Waves,
      location: "Canyon Trail West",
      description: "Heavy rainfall detected. Flash flooding possible in low-lying areas.",
      time: "Updated 5 min ago",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/30"
    },
    {
      id: "2",
      type: "Snow Conditions",
      severity: "warning",
      icon: Snowflake,
      location: "Summit Ridge Trail",
      description: "6-8 inches of fresh snow. Ice patches on north-facing slopes.",
      time: "Updated 15 min ago",
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
      id: "3",
      type: "Heavy Rain Expected",
      severity: "moderate",
      icon: CloudDrizzle,
      location: "Forest Loop Trail",
      description: "Moderate to heavy rain forecasted. Trails may be muddy and slippery.",
      time: "Updated 25 min ago",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/30"
    }
  ];

  // Mock location sharing data
  const locationSharing = [
    {
      id: "1",
      name: "Sarah Miller",
      status: "active",
      avatar: "SM",
      lastUpdate: "Just now",
      distance: "2.3 km away"
    },
    {
      id: "2",
      name: "Mike Johnson",
      status: "active",
      avatar: "MJ",
      lastUpdate: "1 min ago",
      distance: "5.7 km away"
    },
    {
      id: "3",
      name: "Emily Davis",
      status: "inactive",
      avatar: "ED",
      lastUpdate: "Not sharing",
      distance: "-"
    }
  ];

  const handleSOS = () => {
    toast({ 
      title: "SOS Alert Sent!", 
      description: "Emergency contacts have been notified.",
      variant: "default" 
    });
  };

  // Safety check popup - appears every minute
  React.useEffect(() => {
    const interval = setInterval(() => {
      setShowSafetyCheck(true);
      setSafetyCheckTimer(20);
    }, 60000); // Every 60 seconds

    return () => clearInterval(interval);
  }, []);

  // Countdown timer for safety check
  React.useEffect(() => {
    if (!showSafetyCheck) return;

    const timer = setInterval(() => {
      setSafetyCheckTimer((prev) => {
        if (prev <= 1) {
          setShowSafetyCheck(false);
          toast({
            title: "Safety Check Missed",
            description: "Emergency contacts will be notified.",
            variant: "destructive"
          });
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showSafetyCheck, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-primary rounded-lg p-1.5 md:p-2">
              <Mountain className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TrailSafe
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10" onClick={() => navigate("/settings")}>
              <Settings className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 md:px-4 py-4 md:py-8 pb-24 md:pb-8">
        <div className="mb-6 md:mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">Your Safety Companion</h2>
          <p className="text-sm md:text-lg text-muted-foreground">Track your hikes, stay safe, explore confidently</p>
        </div>

        <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-4 mb-6 md:mb-8 animate-fade-in">
          <Card className="hover-scale border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Active Hikes</CardTitle>
              <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-primary">{activeHikes.length}</div>
              <p className="text-xs text-muted-foreground mt-0.5 md:mt-1">Currently tracking</p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total Hikes</CardTitle>
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold">{activeHikes.length + recentHikes.length}</div>
              <p className="text-xs text-muted-foreground mt-0.5 md:mt-1">All adventures</p>
            </CardContent>
          </Card>
          
          <Card className="hover-scale border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Battery</CardTitle>
              <Battery className="h-4 w-4 md:h-5 md:w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-success">{safetyStatus.battery}%</div>
              <p className="text-xs text-muted-foreground mt-0.5 md:mt-1">Device status</p>
            </CardContent>
          </Card>

          <Card className="hover-scale border-2 bg-success/5">
            <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Safety Status</CardTitle>
              <Shield className="h-4 w-4 md:h-5 md:w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-success">Safe</div>
              <p className="text-xs text-muted-foreground mt-0.5 md:mt-1">All systems active</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:gap-6 lg:grid-cols-2 mb-6 md:mb-8 animate-fade-in">
          <Card className="border-2">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-lg md:text-2xl flex items-center gap-2">
                <Cloud className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                Weather Conditions
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">Current conditions for your location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl md:text-5xl font-bold">{weather.temperature}°F</div>
                  <p className="text-sm md:text-lg text-muted-foreground">{weather.condition}</p>
                </div>
                <div className="bg-primary/10 rounded-full p-2 md:p-4">
                  <Sun className="h-8 w-8 md:h-12 md:w-12 text-primary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 border-2 rounded-lg">
                  <Droplets className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Humidity</p>
                    <p className="text-sm md:text-lg font-bold">{weather.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 border-2 rounded-lg">
                  <Wind className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Wind Speed</p>
                    <p className="text-sm md:text-lg font-bold">{weather.windSpeed} mph</p>
                  </div>
                </div>
              </div>

              <div className="p-3 md:p-4 bg-success/10 border-2 border-success/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-success" />
                  <p className="text-sm md:text-base font-semibold text-success">Safety Level: {weather.safetyLevel}</p>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Perfect conditions for hiking today</p>
              </div>

              <div>
                <p className="text-xs md:text-sm font-medium mb-2 md:mb-3">Hourly Forecast</p>
                <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-2">
                  {weather.hourlyForecast.map((hour, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 border-2 rounded-lg min-w-[60px] md:min-w-[80px]">
                      <p className="text-xs font-medium">{hour.time}</p>
                      {hour.condition === 'sunny' && <Sun className="h-4 w-4 md:h-5 md:w-5 text-primary" />}
                      {hour.condition === 'partly-cloudy' && <Cloud className="h-4 w-4 md:h-5 md:w-5 text-primary" />}
                      {hour.condition === 'cloudy' && <CloudRain className="h-4 w-4 md:h-5 md:w-5 text-primary" />}
                      <p className="text-sm font-bold">{hour.temp}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-lg md:text-2xl flex items-center gap-2">
                <Activity className="h-5 w-5 md:h-6 md:w-6 text-success" />
                Anomaly Detection
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">Real-time safety monitoring status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-4">
              <div className="p-3 md:p-4 bg-success/10 border-2 border-success/20 rounded-lg">
                <div className="flex items-center justify-between mb-1 md:mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-success animate-pulse" />
                    <p className="text-sm md:text-base font-semibold text-success">All Systems Normal</p>
                  </div>
                  <Badge variant="default" className="bg-success text-success-foreground text-xs">Active</Badge>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">No anomalies detected</p>
              </div>

              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between p-2 md:p-4 border-2 rounded-lg">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Battery className="h-4 w-4 md:h-5 md:w-5 text-success" />
                    <div>
                      <p className="text-sm md:text-base font-medium">Battery Level</p>
                      <p className="text-xs md:text-sm text-muted-foreground hidden md:block">Device power status</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg md:text-2xl font-bold text-success">{safetyStatus.battery}%</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 md:p-4 border-2 rounded-lg">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Activity className="h-4 w-4 md:h-5 md:w-5 text-success" />
                    <div>
                      <p className="text-sm md:text-base font-medium">Movement Status</p>
                      <p className="text-xs md:text-sm text-muted-foreground hidden md:block">Activity detection</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base md:text-lg font-bold text-success">{safetyStatus.movement}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 md:p-4 border-2 rounded-lg">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Activity className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    <div>
                      <p className="text-sm md:text-base font-medium">Heart Rate</p>
                      <p className="text-xs md:text-sm text-muted-foreground hidden md:block">Real-time monitoring</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg md:text-2xl font-bold">{safetyStatus.heartRate} <span className="text-xs md:text-sm text-muted-foreground">bpm</span></p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 md:p-4 border-2 rounded-lg">
                  <div className="flex items-center gap-2 md:gap-3">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-success" />
                    <div>
                      <p className="text-sm md:text-base font-medium">GPS Signal</p>
                      <p className="text-xs md:text-sm text-muted-foreground hidden md:block">Location tracking</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base md:text-lg font-bold text-success">{safetyStatus.gpsSignal}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 md:p-4 border-2 rounded-lg">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                    <div>
                      <p className="text-sm md:text-base font-medium">Last Check-in</p>
                      <p className="text-xs md:text-sm text-muted-foreground hidden md:block">Auto check-in status</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base md:text-lg font-bold">{safetyStatus.lastCheckIn}</p>
                  </div>
                </div>

                <div className="p-2 md:p-4 border-2 rounded-lg bg-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      <div>
                        <p className="text-sm md:text-base font-medium">Anomalies Detected</p>
                        <p className="text-xs md:text-sm text-muted-foreground hidden md:block">Last 24 hours</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl md:text-3xl font-bold text-success">{safetyStatus.anomaliesDetected}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4 mb-6 md:mb-8 animate-fade-in">
          <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow flex-col h-20 md:h-24 gap-1 md:gap-2 text-xs md:text-sm" onClick={() => navigate("/new-hike")}>
            <MapPin className="h-5 w-5 md:h-6 md:w-6" />
            <span>Start Hike</span>
          </Button>
          <Button size="lg" variant="outline" className="border-2 flex-col h-20 md:h-24 gap-1 md:gap-2 text-xs md:text-sm" onClick={() => navigate("/gear-checklist")}>
            <Backpack className="h-5 w-5 md:h-6 md:w-6" />
            <span>Gear Checklist</span>
          </Button>
          <Button size="lg" variant="outline" className="border-2 flex-col h-20 md:h-24 gap-1 md:gap-2 text-xs md:text-sm" onClick={() => navigate("/wildlife-alerts")}>
            <AlertTriangle className="h-5 w-5 md:h-6 md:w-6" />
            <span>Wildlife Alerts</span>
          </Button>
          <Button size="lg" variant="outline" className="border-2 flex-col h-20 md:h-24 gap-1 md:gap-2 text-xs md:text-sm" onClick={() => navigate("/offline-maps")}>
            <MapIcon className="h-5 w-5 md:h-6 md:w-6" />
            <span>Offline Maps</span>
          </Button>
          <Button size="lg" variant="outline" className="border-2 flex-col h-20 md:h-24 gap-1 md:gap-2 text-xs md:text-sm col-span-2 lg:col-span-1" onClick={() => navigate("/interactive-trail-maps")}>
            <Mountain className="h-5 w-5 md:h-6 md:w-6" />
            <span>Trail Maps</span>
          </Button>
        </div>

        <Card 
          className="mb-6 md:mb-8 border-2 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5 cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => setShowCheckInDialog(true)}
        >
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Bell className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              Check-in Reminder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm md:text-base font-medium">Next automatic check-in in:</p>
                <p className="text-xl md:text-2xl font-bold text-primary">15 minutes</p>
              </div>
              <Button variant="outline" size="sm" className="md:size-default text-xs md:text-sm" onClick={(e) => {
                e.stopPropagation();
                toast({
                  title: "Check-in Successful!",
                  description: "Your emergency contacts have been notified.",
                });
              }}>Check In Now</Button>
            </div>
          </CardContent>
        </Card>

        {/* Trail Conditions Section */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2 mb-6 md:mb-8 animate-fade-in">
          <Card className="border-2">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-lg md:text-2xl flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
                Trail Conditions
              </CardTitle>
              <CardDescription className="text-xs md:text-sm">Real-time weather-based trail alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-3">
              {trailConditions.map((condition) => {
                const IconComponent = condition.icon;
                return (
                  <div 
                    key={condition.id}
                    className={`p-3 md:p-4 rounded-lg border-2 ${condition.bgColor} border-${condition.severity === 'critical' ? 'red' : condition.severity === 'warning' ? 'blue' : 'orange'}-200 dark:border-${condition.severity === 'critical' ? 'red' : condition.severity === 'warning' ? 'blue' : 'orange'}-900`}
                  >
                    <div className="flex items-start gap-2 md:gap-3">
                      <div className={`rounded-full p-1.5 md:p-2 ${condition.severity === 'critical' ? 'bg-red-100 dark:bg-red-900/30' : condition.severity === 'warning' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-orange-100 dark:bg-orange-900/30'}`}>
                        <IconComponent className={`h-4 w-4 md:h-5 md:w-5 ${condition.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5 md:mb-1">
                          <h4 className={`text-sm md:text-base font-bold ${condition.color}`}>{condition.type}</h4>
                          <Badge variant={condition.severity === 'critical' ? 'destructive' : 'outline'} className="text-xs">
                            {condition.severity}
                          </Badge>
                        </div>
                        <p className="text-xs md:text-sm font-medium text-foreground mb-0.5 md:mb-1">{condition.location}</p>
                        <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">{condition.description}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {condition.time}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Live Location Sharing Section */}
          <Card className="border-2">
            <CardHeader className="pb-3 md:pb-6">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-lg md:text-2xl flex items-center gap-2">
                    <Share2 className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    Live Location Sharing
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">Share your location with friends & family</CardDescription>
                </div>
                <Button size="sm" className="gap-1 md:gap-2 text-xs md:text-sm h-8 md:h-9">
                  <UserPlus className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden md:inline">Add</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 md:space-y-3">
              <div className="p-3 md:p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-success animate-pulse" />
                  <p className="text-sm md:text-base font-semibold text-success">Location Sharing Active</p>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Your location is being shared with 2 contacts</p>
              </div>

              <div className="space-y-2">
                {locationSharing.map((person) => (
                  <div 
                    key={person.id}
                    className="flex items-center justify-between p-3 md:p-4 border-2 rounded-lg hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm ${
                        person.status === 'active' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {person.avatar}
                      </div>
                      <div>
                        <p className="text-sm md:text-base font-medium">{person.name}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{person.lastUpdate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {person.status === 'active' ? (
                        <>
                          <Badge variant="default" className="bg-success text-success-foreground mb-0.5 md:mb-1 text-xs">Active</Badge>
                          <p className="text-xs text-muted-foreground hidden md:block">{person.distance}</p>
                        </>
                      ) : (
                        <Badge variant="outline" className="text-xs">Offline</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full border-2 text-xs md:text-sm">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                View All on Map
              </Button>
            </CardContent>
          </Card>
        </div>

        {activeHikes.length > 0 && (
          <Card className="mb-6 md:mb-8 border-2 animate-fade-in">
            <CardHeader className="pb-3 md:pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg md:text-2xl">Active Hikes</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Your currently active hikes</CardDescription>
                </div>
                <Badge variant="default" className="bg-success text-success-foreground text-xs">Live</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {activeHikes.map((hike) => (
                  <div 
                    key={hike.id} 
                    className="flex items-center justify-between p-4 md:p-6 border-2 rounded-lg bg-card hover:bg-accent/5 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                      <div className="bg-success/10 rounded-full p-2 md:p-3">
                        <MapPin className="h-5 w-5 md:h-6 md:w-6 text-success" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base md:text-lg truncate">{hike.name}</h3>
                        <p className="text-xs md:text-sm text-muted-foreground flex items-center gap-1 md:gap-2">
                          <Clock className="h-3 w-3 shrink-0" />
                          <span className="truncate">Started: {new Date(hike.started_at).toLocaleString()}</span>
                        </p>
                      </div>
                    </div>
                    <Button size="sm" className="shadow-md text-xs md:text-sm shrink-0" onClick={() => navigate(`/hike/${hike.id}`)}>
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {recentHikes.length > 0 && (
          <Card className="border-2 animate-fade-in">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="text-lg md:text-2xl">Recent Activity</CardTitle>
              <CardDescription className="text-xs md:text-sm">Your recent and planned hikes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {recentHikes.map((hike) => (
                  <div 
                    key={hike.id} 
                    className="flex items-center justify-between p-4 md:p-6 border-2 rounded-lg bg-card hover:bg-accent/5 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                      <div className={`rounded-full p-2 md:p-3 ${
                        hike.status === 'completed' 
                          ? 'bg-success/10' 
                          : 'bg-primary/10'
                      }`}>
                        {hike.status === 'completed' ? (
                          <TrendingUp className={`h-5 w-5 md:h-6 md:w-6 ${
                            hike.status === 'completed' ? 'text-success' : 'text-primary'
                          }`} />
                        ) : (
                          <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-base md:text-lg truncate">{hike.name}</h3>
                          <Badge variant={hike.status === 'completed' ? 'default' : 'outline'} className="text-xs shrink-0">
                            {hike.status}
                          </Badge>
                        </div>
                        <p className="text-xs md:text-sm text-muted-foreground truncate">
                          {hike.distance && `${hike.distance} km`}
                          {hike.duration && ` • ${Math.floor(hike.duration / 60)}h ${hike.duration % 60}m`}
                          {` • ${new Date(hike.created_at).toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-2 text-xs md:text-sm shrink-0" onClick={() => navigate(`/hike/${hike.id}`)}>
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
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 shadow-2xl text-sm md:text-lg py-4 px-6 md:py-6 md:px-8 hover:scale-105 transition-transform z-50"
        onClick={handleSOS}
      >
        <AlertCircle className="h-5 w-5 md:h-6 md:w-6 mr-1.5 md:mr-2" />
        <span className="hidden sm:inline">SEND SOS ALERT</span>
        <span className="sm:hidden">SOS</span>
      </Button>

      <Dialog open={showCheckInDialog} onOpenChange={setShowCheckInDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-500" />
              Check-in Reminder
            </DialogTitle>
            <DialogDescription>
              Stay safe by checking in regularly during your hike
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Time until next check-in</p>
              <p className="text-4xl font-bold text-orange-600">12:00</p>
              <p className="text-sm text-muted-foreground mt-1">minutes</p>
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last check-in:</span>
                <span className="font-medium">18 minutes ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Check-in interval:</span>
                <span className="font-medium">30 minutes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Emergency contacts notified:</span>
                <span className="font-medium">3 contacts</span>
              </div>
            </div>
            <Button className="w-full" onClick={() => {
              toast({
                title: "Check-in Successful!",
                description: "Your emergency contacts have been notified.",
              });
              setShowCheckInDialog(false);
            }}>
              <Bell className="h-4 w-4 mr-2" />
              Check In Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Safety Check Notification */}
      <Dialog open={showSafetyCheck} onOpenChange={setShowSafetyCheck}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center space-y-6 py-6">
            <div className="rounded-full bg-red-50 dark:bg-red-950/30 p-6">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">SAFETY CHECK REQUIRED</h2>
              <p className="text-muted-foreground">
                Unusual movement detected. Are you okay?
              </p>
            </div>

            <Button 
              size="lg"
              className="w-full bg-red-500 hover:bg-red-600 text-white text-lg py-6"
              onClick={() => {
                setShowSafetyCheck(false);
                toast({
                  title: "Safety Check Confirmed",
                  description: "Thank you for responding. Stay safe!",
                });
              }}
            >
              <Check className="h-5 w-5 mr-2" />
              I'M HERE
            </Button>

            <div className="flex items-center gap-2 text-sm bg-muted px-4 py-3 rounded-lg w-full justify-center">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Time remaining:</span>
              <span className="font-semibold text-red-500">{safetyCheckTimer}s</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
