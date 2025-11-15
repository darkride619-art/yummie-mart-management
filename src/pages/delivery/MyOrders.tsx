import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Phone, Package, Navigation, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: number;
  amount: number;
  status: "pending" | "picked_up" | "in_transit" | "delivered";
  distance: string;
  estimatedTime: string;
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "DEL001",
      customerName: "John Doe",
      customerPhone: "+1234567890",
      address: "123 Main St, Downtown",
      items: 3,
      amount: 299.99,
      status: "pending",
      distance: "2.5 km",
      estimatedTime: "15 mins"
    },
    {
      id: "DEL002",
      customerName: "Jane Smith",
      customerPhone: "+1234567891",
      address: "456 Oak Ave, Uptown",
      items: 2,
      amount: 159.99,
      status: "picked_up",
      distance: "4.2 km",
      estimatedTime: "25 mins"
    },
    {
      id: "DEL003",
      customerName: "Bob Johnson",
      customerPhone: "+1234567892",
      address: "789 Pine Rd, Midtown",
      items: 5,
      amount: 449.99,
      status: "in_transit",
      distance: "3.8 km",
      estimatedTime: "20 mins"
    },
  ]);

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ));
    toast.success(`Order status updated to ${newStatus.replace("_", " ")}`);
  };

  const getNextStatus = (currentStatus: Order["status"]): Order["status"] | null => {
    const statusFlow: Record<Order["status"], Order["status"] | null> = {
      "pending": "picked_up",
      "picked_up": "in_transit",
      "in_transit": "delivered",
      "delivered": null
    };
    return statusFlow[currentStatus];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">My Orders</h2>
        <p className="text-muted-foreground">Manage your delivery assignments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange">
              {orders.filter(o => o.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Picked Up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue">
              {orders.filter(o => o.status === "picked_up").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">In Transit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {orders.filter(o => o.status === "in_transit").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {orders.filter(o => o.status === "delivered").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <Badge
                    className="mt-2"
                    variant={
                      order.status === "delivered" ? "default" :
                      order.status === "in_transit" ? "secondary" : "outline"
                    }
                  >
                    {order.status.replace("_", " ")}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon">
                  <Navigation className="w-4 h-4 text-blue" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 text-orange" />
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue" />
                  <p className="text-sm">{order.customerPhone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-orange" />
                  <p className="text-sm">{order.items} items • ${order.amount}</p>
                </div>
              </div>

              <div className="flex gap-2 text-sm text-muted-foreground">
                <span>📍 {order.distance}</span>
                <span>•</span>
                <span>⏱️ {order.estimatedTime}</span>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Order Details - {order.id}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm">{order.customerPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Delivery Address</p>
                      <p className="font-medium">{order.address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Items</p>
                        <p className="font-medium">{order.items}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-medium">${order.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="font-medium">{order.distance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ETA</p>
                        <p className="font-medium">{order.estimatedTime}</p>
                      </div>
                    </div>
                    {getNextStatus(order.status) && (
                      <Button
                        className="w-full bg-orange hover:bg-orange-dark"
                        onClick={() => {
                          const next = getNextStatus(order.status);
                          if (next) handleStatusUpdate(order.id, next);
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as {getNextStatus(order.status)?.replace("_", " ")}
                      </Button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              {getNextStatus(order.status) && (
                <Button
                  className="w-full bg-blue hover:bg-blue-dark"
                  onClick={() => {
                    const next = getNextStatus(order.status);
                    if (next) handleStatusUpdate(order.id, next);
                  }}
                >
                  {order.status === "pending" && "Mark Picked Up"}
                  {order.status === "picked_up" && "Start Delivery"}
                  {order.status === "in_transit" && "Mark Delivered"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
