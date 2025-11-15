import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, TrendingUp, Download, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Earning {
  id: string;
  date: string;
  orders: number;
  distance: string;
  baseEarnings: number;
  tips: number;
  bonus: number;
  total: number;
  status: "paid" | "pending";
}

const Earnings = () => {
  const [earnings, setEarnings] = useState<Earning[]>([
    {
      id: "E001",
      date: "2024-11-15",
      orders: 12,
      distance: "45.2 km",
      baseEarnings: 120.00,
      tips: 25.50,
      bonus: 10.00,
      total: 155.50,
      status: "pending"
    },
    {
      id: "E002",
      date: "2024-11-14",
      orders: 15,
      distance: "52.8 km",
      baseEarnings: 150.00,
      tips: 32.00,
      bonus: 15.00,
      total: 197.00,
      status: "paid"
    },
    {
      id: "E003",
      date: "2024-11-13",
      orders: 10,
      distance: "38.5 km",
      baseEarnings: 100.00,
      tips: 18.50,
      bonus: 0,
      total: 118.50,
      status: "paid"
    },
    {
      id: "E004",
      date: "2024-11-12",
      orders: 13,
      distance: "48.3 km",
      baseEarnings: 130.00,
      tips: 28.00,
      bonus: 12.00,
      total: 170.00,
      status: "paid"
    },
  ]);

  const [periodFilter, setPeriodFilter] = useState("week");

  const handleExport = () => {
    toast.success("Earnings report exported");
  };

  const handleRequestPayout = () => {
    toast.success("Payout request submitted");
  };

  const totalEarnings = earnings.reduce((sum, e) => sum + e.total, 0);
  const pendingEarnings = earnings.filter(e => e.status === "pending").reduce((sum, e) => sum + e.total, 0);
  const paidEarnings = earnings.filter(e => e.status === "paid").reduce((sum, e) => sum + e.total, 0);
  const totalOrders = earnings.reduce((sum, e) => sum + e.orders, 0);
  const avgPerDelivery = totalEarnings / totalOrders;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Earnings</h2>
          <p className="text-muted-foreground">Track your income and payments</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleRequestPayout} className="bg-orange hover:bg-orange-dark">
            <DollarSign className="w-4 h-4 mr-2" />
            Request Payout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue">
              ${totalEarnings.toFixed(2)}
            </div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15.3%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange">
              ${pendingEarnings.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Paid Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ${paidEarnings.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg per Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue">
              ${avgPerDelivery.toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Earnings Breakdown</CardTitle>
          <div className="flex gap-4">
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Base</TableHead>
                <TableHead>Tips</TableHead>
                <TableHead>Bonus</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {earnings.map((earning) => (
                <TableRow key={earning.id}>
                  <TableCell className="font-medium">{earning.date}</TableCell>
                  <TableCell>{earning.orders}</TableCell>
                  <TableCell>{earning.distance}</TableCell>
                  <TableCell>${earning.baseEarnings.toFixed(2)}</TableCell>
                  <TableCell className="text-green-600">
                    +${earning.tips.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-blue">
                    {earning.bonus > 0 ? `+$${earning.bonus.toFixed(2)}` : "-"}
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${earning.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={earning.status === "paid" ? "default" : "secondary"}
                    >
                      {earning.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Earnings Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Base Earnings</span>
                <span className="font-semibold">
                  ${earnings.reduce((sum, e) => sum + e.baseEarnings, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tips</span>
                <span className="font-semibold text-green-600">
                  +${earnings.reduce((sum, e) => sum + e.tips, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Bonuses</span>
                <span className="font-semibold text-blue">
                  +${earnings.reduce((sum, e) => sum + e.bonus, 0).toFixed(2)}
                </span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="text-2xl font-bold text-orange">
                  ${totalEarnings.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Orders</span>
                <span className="font-semibold">{totalOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Distance</span>
                <span className="font-semibold">
                  {earnings.reduce((sum, e) => sum + parseFloat(e.distance), 0).toFixed(1)} km
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Avg Tip</span>
                <span className="font-semibold text-green-600">
                  ${(earnings.reduce((sum, e) => sum + e.tips, 0) / earnings.length).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Working Days</span>
                <span className="font-semibold">{earnings.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Earnings;
