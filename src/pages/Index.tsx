import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Mountain, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState<any>(null);
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mountain className="h-6 w-6" />
            <h1 className="text-xl font-bold">TrailSafe</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Your Safety Companion</h2>
          <p className="text-muted-foreground">Track your hikes, stay safe, explore confidently</p>
          <div className="flex gap-4 justify-center mt-8">
            <Button size="lg" onClick={() => toast({ title: "Start New Hike", description: "Hike tracking feature coming soon!" })}>
              Start New Hike
            </Button>
            <Button size="lg" variant="outline" onClick={() => toast({ title: "Plan Route", description: "Route planning feature coming soon!" })}>
              Plan Route
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
