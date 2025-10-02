import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ActiveHike = () => {
  const { id } = useParams();
  const [hike, setHike] = useState<any>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadHike();
    startLocationTracking();

    const interval = setInterval(() => {
      if (hike?.started_at) {
        const elapsed = Math.floor((Date.now() - new Date(hike.started_at).getTime()) / 1000);
        setDuration(elapsed);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      stopLocationTracking();
    };
  }, [id]);

  const loadHike = async () => {
    try {
      const { data, error } = await supabase
        .from('hikes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setHike(data);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const startLocationTracking = () => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setLocation(newLocation);

          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase.from('location_tracking').insert({
              hike_id: id,
              user_id: user.id,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              altitude: position.coords.altitude,
              accuracy: position.coords.accuracy,
              speed: position.coords.speed,
              heading: position.coords.heading
            });
          }
        },
        (error) => {
          toast({ 
            title: "Location Error", 
            description: "Unable to track location. Please enable location services.", 
            variant: "destructive" 
          });
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      (window as any).locationWatchId = watchId;
    }
  };

  const stopLocationTracking = () => {
    if ((window as any).locationWatchId) {
      navigator.geolocation.clearWatch((window as any).locationWatchId);
    }
  };

  const handleEndHike = async () => {
    try {
      const { error } = await supabase
        .from('hikes')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      toast({ title: "Hike completed!", description: "Your hike has been saved." });
      navigate("/");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleSOS = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      await supabase.from('alerts').insert({
        user_id: user.id,
        hike_id: id,
        alert_type: 'manual_sos',
        status: 'pending',
        location: location
      });

      toast({ 
        title: "SOS Alert Sent!", 
        description: "Emergency contacts have been notified.", 
        variant: "default" 
      });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">{hike?.name || 'Active Hike'}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{formatDuration(duration)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Current Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              {location ? (
                <div className="space-y-1">
                  <p>Latitude: {location.latitude.toFixed(6)}</p>
                  <p>Longitude: {location.longitude.toFixed(6)}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">Waiting for location...</p>
              )}
            </CardContent>
          </Card>

          <Button 
            size="lg" 
            variant="destructive" 
            className="w-full"
            onClick={handleSOS}
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            SEND SOS ALERT
          </Button>

          <Button 
            size="lg" 
            variant="outline" 
            className="w-full"
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
