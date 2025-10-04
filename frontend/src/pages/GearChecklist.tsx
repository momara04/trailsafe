import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Backpack, Mountain, Utensils, Shield, Heart } from "lucide-react";

interface GearItem {
  id: string;
  name: string;
  checked: boolean;
}

interface GearCategory {
  name: string;
  icon: any;
  items: GearItem[];
}

const GearChecklist = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<GearCategory[]>([
    {
      name: "Essential Gear",
      icon: Backpack,
      items: [
        { id: "map", name: "Map & Compass", checked: false },
        { id: "flashlight", name: "Flashlight/Headlamp", checked: false },
        { id: "whistle", name: "Emergency Whistle", checked: false },
        { id: "knife", name: "Multi-tool/Knife", checked: false },
        { id: "fire", name: "Fire Starter", checked: false },
      ],
    },
    {
      name: "Clothing",
      icon: Mountain,
      items: [
        { id: "jacket", name: "Rain Jacket", checked: false },
        { id: "layers", name: "Extra Layers", checked: false },
        { id: "hat", name: "Hat/Beanie", checked: false },
        { id: "gloves", name: "Gloves", checked: false },
        { id: "boots", name: "Hiking Boots", checked: true },
      ],
    },
    {
      name: "Food & Water",
      icon: Utensils,
      items: [
        { id: "water", name: "Water (2L minimum)", checked: false },
        { id: "filter", name: "Water Filter/Purifier", checked: false },
        { id: "snacks", name: "High-Energy Snacks", checked: false },
        { id: "lunch", name: "Packed Lunch", checked: false },
        { id: "electrolytes", name: "Electrolyte Tablets", checked: false },
      ],
    },
    {
      name: "Safety & First Aid",
      icon: Shield,
      items: [
        { id: "firstaid", name: "First Aid Kit", checked: false },
        { id: "sunscreen", name: "Sunscreen", checked: false },
        { id: "insect", name: "Insect Repellent", checked: false },
        { id: "meds", name: "Personal Medications", checked: false },
        { id: "blanket", name: "Emergency Blanket", checked: false },
      ],
    },
    {
      name: "Navigation & Communication",
      icon: Heart,
      items: [
        { id: "phone", name: "Fully Charged Phone", checked: true },
        { id: "battery", name: "Portable Charger", checked: false },
        { id: "gps", name: "GPS Device", checked: false },
        { id: "contacts", name: "Emergency Contact Info", checked: false },
      ],
    },
  ]);

  const toggleItem = (categoryIndex: number, itemId: string) => {
    setCategories((prev) =>
      prev.map((cat, idx) =>
        idx === categoryIndex
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : cat
      )
    );
  };

  const getProgress = (category: GearCategory) => {
    const checked = category.items.filter((item) => item.checked).length;
    return Math.round((checked / category.items.length) * 100);
  };

  const getTotalProgress = () => {
    const allItems = categories.flatMap((cat) => cat.items);
    const checked = allItems.filter((item) => item.checked).length;
    return Math.round((checked / allItems.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Smart Gear Checklist</h1>
          </div>
          <div className="text-sm font-semibold">
            {getTotalProgress()}% Complete
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-6 border-2 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Backpack className="h-6 w-6 text-primary" />
              Pack Smart, Hike Safe
            </CardTitle>
            <CardDescription>
              Check off items as you pack. Never forget the essentials!
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-6 animate-fade-in">
          {categories.map((category, catIndex) => {
            const Icon = category.icon;
            const progress = getProgress(category);
            
            return (
              <Card key={category.name} className="border-2 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-secondary/30 to-secondary/10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon className="h-5 w-5 text-primary" />
                      {category.name}
                    </CardTitle>
                    <span className="text-sm font-semibold text-primary">
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary/50 rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors"
                      >
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(catIndex, item.id)}
                          className="h-5 w-5"
                        />
                        <label
                          htmlFor={item.id}
                          className={`flex-1 cursor-pointer transition-all ${
                            item.checked
                              ? "line-through text-muted-foreground"
                              : "font-medium"
                          }`}
                        >
                          {item.name}
                        </label>
                      </div>
                    ))}
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

export default GearChecklist;
