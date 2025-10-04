import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Map, Download, Check, Trash2, HardDrive } from "lucide-react";

interface OfflineMap {
  id: string;
  name: string;
  region: string;
  size: string;
  downloaded: boolean;
  downloadProgress?: number;
  lastUpdated?: string;
}

const OfflineMaps = () => {
  const navigate = useNavigate();
  const [maps, setMaps] = useState<OfflineMap[]>([
    {
      id: "1",
      name: "Rocky Mountain National Park",
      region: "Colorado",
      size: "245 MB",
      downloaded: true,
      lastUpdated: "2 days ago",
    },
    {
      id: "2",
      name: "Yosemite Valley Trails",
      region: "California",
      size: "312 MB",
      downloaded: true,
      lastUpdated: "1 week ago",
    },
    {
      id: "3",
      name: "Grand Canyon - North Rim",
      region: "Arizona",
      size: "189 MB",
      downloaded: false,
    },
    {
      id: "4",
      name: "Zion National Park",
      region: "Utah",
      size: "156 MB",
      downloaded: false,
    },
    {
      id: "5",
      name: "Great Smoky Mountains",
      region: "Tennessee/North Carolina",
      size: "278 MB",
      downloaded: false,
    },
    {
      id: "6",
      name: "Olympic Peninsula Trails",
      region: "Washington",
      size: "334 MB",
      downloaded: false,
    },
  ]);

  const downloadedMaps = maps.filter((m) => m.downloaded);
  const totalSize = downloadedMaps.reduce((acc, map) => {
    return acc + parseInt(map.size.replace(" MB", ""));
  }, 0);

  const handleDownload = (mapId: string) => {
    setMaps((prev) =>
      prev.map((map) =>
        map.id === mapId
          ? { ...map, downloaded: true, lastUpdated: "Just now", downloadProgress: 100 }
          : map
      )
    );
  };

  const handleDelete = (mapId: string) => {
    setMaps((prev) =>
      prev.map((map) =>
        map.id === mapId
          ? { ...map, downloaded: false, lastUpdated: undefined, downloadProgress: undefined }
          : map
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Offline Maps</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="mb-6 border-2 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-6 w-6 text-primary" />
              Storage Overview
            </CardTitle>
            <CardDescription>
              Download maps for offline access when hiking in areas with no signal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {downloadedMaps.length} maps downloaded
              </span>
              <span className="text-sm text-muted-foreground">
                {totalSize} MB used
              </span>
            </div>
            <Progress value={(totalSize / 2000) * 100} className="h-2" />
          </CardContent>
        </Card>

        <div className="space-y-4 animate-fade-in">
          {maps.map((map) => (
            <Card key={map.id} className="border-2 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Map className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{map.name}</CardTitle>
                        {map.downloaded && (
                          <Badge variant="secondary" className="gap-1">
                            <Check className="h-3 w-3" />
                            Downloaded
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{map.region}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Size: {map.size}</p>
                    {map.lastUpdated && (
                      <p className="text-xs text-muted-foreground">
                        Updated {map.lastUpdated}
                      </p>
                    )}
                  </div>
                  {map.downloaded ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(map.id)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleDownload(map.id)}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OfflineMaps;
