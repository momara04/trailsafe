import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, User, Shield, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [profile, setProfile] = useState({
    full_name: "Alex Morgan",
    phone_number: "+1 (555) 987-6543"
  });
  const [settings, setSettings] = useState({
    auto_check_in_enabled: true,
    check_in_interval: 60,
    anomaly_detection_enabled: true
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const updateProfile = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
    toast({ title: "Profile updated!" });
  };

  const updateSettings = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value });
    toast({ title: "Settings updated!" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="full_name" className="text-base">Full Name</Label>
                <Input
                  id="full_name"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  onBlur={(e) => updateProfile('full_name', e.target.value)}
                  className="mt-2 border-2"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-base">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone_number}
                  onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                  onBlur={(e) => updateProfile('phone_number', e.target.value)}
                  className="mt-2 border-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Safety Settings
              </CardTitle>
              <CardDescription>Configure your safety and tracking preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-accent/5">
                <div className="space-y-1 flex-1">
                  <Label className="text-base flex items-center gap-2">
                    <Bell className="h-4 w-4 text-primary" />
                    Auto Check-in
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically send check-in alerts during hikes
                  </p>
                </div>
                <Switch
                  checked={settings.auto_check_in_enabled}
                  onCheckedChange={(checked) => updateSettings('auto_check_in_enabled', checked)}
                />
              </div>

              {settings.auto_check_in_enabled && (
                <div className="ml-6 animate-fade-in">
                  <Label htmlFor="interval" className="text-base">Check-in Interval (minutes)</Label>
                  <Input
                    id="interval"
                    type="number"
                    min="15"
                    max="240"
                    value={settings.check_in_interval}
                    onChange={(e) => updateSettings('check_in_interval', parseInt(e.target.value))}
                    className="mt-2 border-2"
                  />
                </div>
              )}

              <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-accent/5">
                <div className="space-y-1 flex-1">
                  <Label className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Anomaly Detection
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Detect unusual activity patterns and send alerts
                  </p>
                </div>
                <Switch
                  checked={settings.anomaly_detection_enabled}
                  onCheckedChange={(checked) => updateSettings('anomaly_detection_enabled', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
