import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Clock, Package } from "lucide-react";
import { toast } from "sonner";

interface RouteStop {
  id: string;
  orderNumber: string;
  customerName: string;
  address: string;
  status: "pending" | "completed";
  estimatedTime: string;
  sequence: number;
}

const RouteView = () => {
  const routeStops: RouteStop[] = [
    {
      id: "1",
      orderNumber: "DEL001",
      customerName: "John Doe",
      address: "123 Main St, Downtown",
      status: "completed",
      estimatedTime: "10:00 AM",
      sequence: 1
    },
    {
      id: "2",
      orderNumber: "DEL002",
      customerName: "Jane Smith",
      address: "456 Oak Ave, Uptown",
      status: "pending",
      estimatedTime: "10:30 AM",
      sequence: 2
    },
    {
      id: "3",
      orderNumber: "DEL003",
      customerName: "Bob Johnson",
      address: "789 Pine Rd, Midtown",
      status: "pending",
      estimatedTime: "11:00 AM",
      sequence: 3
    },
  ];

  const handleOptimizeRoute = () => {
    toast.success("Route optimized successfully");
  };

  const handleNavigate = (address: string) => {
    toast.info(`Opening navigation to ${address}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Route View</h2>
          <p className="text-muted-foreground">Optimized delivery route</p>
        </div>
        <Button onClick={handleOptimizeRoute} className="bg-blue hover:bg-blue-dark">
          <Navigation className="w-4 h-4 mr-2" />
          Optimize Route
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Stops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange">{routeStops.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {routeStops.filter(s => s.status === "completed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue">
              {routeStops.filter(s => s.status === "pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Stops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {routeStops.map((stop, index) => (
                <div key={stop.id} className="relative">
                  {index !== routeStops.length - 1 && (
                    <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-border" />
                  )}
                  <div className="flex gap-4">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center font-medium z-10
                      ${stop.status === "completed" ? "bg-green-600 text-white" : "bg-orange text-white"}
                    `}>
                      {stop.sequence}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{stop.orderNumber}</p>
                          <p className="text-sm text-muted-foreground">{stop.customerName}</p>
                        </div>
                        <Badge
                          variant={stop.status === "completed" ? "default" : "secondary"}
                        >
                          {stop.status}
                        </Badge>
                      </div>
                      <div className="flex items-start gap-2 text-sm mb-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-orange" />
                        <span className="text-muted-foreground">{stop.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Clock className="w-4 h-4" />
                        <span>ETA: {stop.estimatedTime}</span>
                      </div>
                      {stop.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleNavigate(stop.address)}
                          className="mt-2"
                        >
                          <Navigation className="w-3 h-3 mr-2" />
                          Navigate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Route Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Interactive map view</p>
                <p className="text-sm">Route visualization would appear here</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Distance</span>
                <span className="font-medium">10.5 km</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimated Time</span>
                <span className="font-medium">45 minutes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Deliveries</span>
                <span className="font-medium">{routeStops.length} stops</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RouteView;
