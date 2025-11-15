import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, FileText, Send, Eye, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Invoice {
  id: string;
  seller: string;
  amount: number;
  tax: number;
  total: number;
  status: "paid" | "pending" | "overdue" | "cancelled";
  dueDate: string;
  paidDate?: string;
}

const PaymentsInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: "INV001",
      seller: "Tech Store",
      amount: 5000.00,
      tax: 500.00,
      total: 5500.00,
      status: "paid",
      dueDate: "2024-11-10",
      paidDate: "2024-11-08"
    },
    {
      id: "INV002",
      seller: "Fashion Hub",
      amount: 8000.00,
      tax: 800.00,
      total: 8800.00,
      status: "paid",
      dueDate: "2024-11-15",
      paidDate: "2024-11-14"
    },
    {
      id: "INV003",
      seller: "Home Goods",
      amount: 3500.00,
      tax: 350.00,
      total: 3850.00,
      status: "pending",
      dueDate: "2024-11-20"
    },
    {
      id: "INV004",
      seller: "Sports Store",
      amount: 2000.00,
      tax: 200.00,
      total: 2200.00,
      status: "overdue",
      dueDate: "2024-11-05"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSendReminder = (invoiceId: string) => {
    toast.success("Payment reminder sent");
  };

  const handleGeneratePDF = (invoiceId: string) => {
    toast.success("Invoice PDF generated");
  };

  const handleExport = () => {
    toast.success("Financial report exported");
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices
    .filter(i => i.status === "paid")
    .reduce((sum, i) => sum + i.total, 0);

  const pendingAmount = invoices
    .filter(i => i.status === "pending")
    .reduce((sum, i) => sum + i.total, 0);

  const overdueAmount = invoices
    .filter(i => i.status === "overdue")
    .reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Payments & Invoices</h2>
          <p className="text-muted-foreground">Manage financial transactions and invoices</p>
        </div>
        <Button onClick={handleExport} className="bg-orange hover:bg-orange-dark">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ${totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15.3%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange">
              ${pendingAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              ${overdueAmount.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue">
              {invoices.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.seller}</TableCell>
                  <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>${invoice.tax.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold">
                    ${invoice.total.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === "paid" ? "default" :
                        invoice.status === "overdue" ? "destructive" :
                        invoice.status === "cancelled" ? "destructive" : "secondary"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    {invoice.paidDate ? invoice.paidDate : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleGeneratePDF(invoice.id)}
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {(invoice.status === "pending" || invoice.status === "overdue") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleSendReminder(invoice.id)}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsInvoices;
