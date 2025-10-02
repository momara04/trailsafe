import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, Settings, Users, MapPin, Clock, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [activeHikes, setActiveHikes] = useState<any[]>([]);
  const [recentHikes, setRecentHikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) navigate("/auth");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) navigate("/auth");
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      loadHikes();
    }
  }, [user]);

  const loadHikes = async () => {
    setLoading(true);
    try {
      const { data: active, error: activeError } = await supabase
        .from('hikes')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('started_at', { ascending: false });

      if (activeError) throw activeError;
      setActiveHikes(active || []);

      const { data: recent, error: recentError } = await supabase
        .from('hikes')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['completed', 'planned'])
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentError) throw recentError;
      setRecentHikes(recent || []);
    } catch (error: any) {
      toast({ title: "Error loading hikes", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mountain className="h-6 w-6" />
            <h1 className="text-xl font-bold">TrailSafe</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" onClick={handleSignOut}>Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Safety Companion</h2>
          <p className="text-muted-foreground">Track your hikes, stay safe, explore confidently</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Hikes</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeHikes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Hikes</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeHikes.length + recentHikes.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Safety Status</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Safe</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 mb-8">
          <Button size="lg" onClick={() => navigate("/new-hike")}>
            Start New Hike
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/plan-route")}>
            Plan Route
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/emergency-contacts")}>
            <Users className="h-4 w-4 mr-2" />
            Emergency Contacts
          </Button>
        </div>

        {activeHikes.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Active Hikes</CardTitle>
              <CardDescription>Your currently active hikes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeHikes.map((hike) => (
                  <div key={hike.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{hike.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Started: {new Date(hike.started_at).toLocaleString()}
                      </p>
                    </div>
                    <Button onClick={() => navigate(`/hike/${hike.id}`)}>
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {recentHikes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Hikes</CardTitle>
              <CardDescription>Your recent and planned hikes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentHikes.map((hike) => (
                  <div key={hike.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{hike.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Status: {hike.status} | {new Date(hike.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => navigate(`/hike/${hike.id}`)}>
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
