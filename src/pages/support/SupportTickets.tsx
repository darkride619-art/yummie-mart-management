import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Ticket {
  id: string;
  customer: string;
  email: string;
  subject: string;
  category: "order" | "product" | "payment" | "delivery" | "other";
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  createdDate: string;
  lastUpdate: string;
  assignedTo?: string;
}

const SupportTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "TKT001",
      customer: "John Doe",
      email: "john@email.com",
      subject: "Order not received",
      category: "delivery",
      priority: "high",
      status: "in_progress",
      createdDate: "2024-11-14",
      lastUpdate: "2024-11-15",
      assignedTo: "Carol White"
    },
    {
      id: "TKT002",
      customer: "Jane Smith",
      email: "jane@email.com",
      subject: "Product damaged",
      category: "product",
      priority: "urgent",
      status: "open",
      createdDate: "2024-11-15",
      lastUpdate: "2024-11-15"
    },
    {
      id: "TKT003",
      customer: "Bob Johnson",
      email: "bob@email.com",
      subject: "Refund inquiry",
      category: "payment",
      priority: "medium",
      status: "resolved",
      createdDate: "2024-11-12",
      lastUpdate: "2024-11-14",
      assignedTo: "Carol White"
    },
    {
      id: "TKT004",
      customer: "Sarah Wilson",
      email: "sarah@email.com",
      subject: "Wrong item delivered",
      category: "order",
      priority: "high",
      status: "in_progress",
      createdDate: "2024-11-13",
      lastUpdate: "2024-11-15",
      assignedTo: "Carol White"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [response, setResponse] = useState("");

  const handleStatusChange = (ticketId: string, newStatus: Ticket["status"]) => {
    setTickets(tickets.map(t =>
      t.id === ticketId ? { ...t, status: newStatus, lastUpdate: new Date().toISOString().split('T')[0] } : t
    ));
    toast.success(`Ticket status updated to ${newStatus}`);
  };

  const handleAssign = (ticketId: string, agent: string) => {
    setTickets(tickets.map(t =>
      t.id === ticketId ? { ...t, assignedTo: agent } : t
    ));
    toast.success(`Ticket assigned to ${agent}`);
  };

  const handleSendResponse = (ticketId: string) => {
    toast.success("Response sent to customer");
    setResponse("");
    setSelectedTicket(null);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Support Tickets</h2>
        <p className="text-muted-foreground">Manage customer support requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange">
              {tickets.filter(t => t.status === "open").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue">
              {tickets.filter(t => t.status === "in_progress").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {tickets.filter(t => t.status === "resolved").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Urgent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {tickets.filter(t => t.priority === "urgent").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tickets..."
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
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{ticket.customer}</div>
                      <div className="text-muted-foreground">{ticket.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{ticket.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.priority === "urgent" ? "destructive" :
                        ticket.priority === "high" ? "destructive" :
                        ticket.priority === "medium" ? "secondary" : "outline"
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={ticket.status}
                      onValueChange={(value) => handleStatusChange(ticket.id, value as Ticket["status"])}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {ticket.assignedTo ? (
                      <span className="text-sm">{ticket.assignedTo}</span>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAssign(ticket.id, "Carol White")}
                      >
                        Assign
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{ticket.createdDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedTicket(ticket)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Ticket Details - {selectedTicket?.id}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Customer</Label>
                                <p className="font-medium">{selectedTicket?.customer}</p>
                              </div>
                              <div>
                                <Label>Email</Label>
                                <p className="font-medium">{selectedTicket?.email}</p>
                              </div>
                              <div>
                                <Label>Category</Label>
                                <Badge variant="outline">{selectedTicket?.category}</Badge>
                              </div>
                              <div>
                                <Label>Priority</Label>
                                <Badge
                                  variant={
                                    selectedTicket?.priority === "urgent" || selectedTicket?.priority === "high"
                                      ? "destructive"
                                      : "outline"
                                  }
                                >
                                  {selectedTicket?.priority}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <Label>Subject</Label>
                              <p className="font-medium">{selectedTicket?.subject}</p>
                            </div>
                            <div>
                              <Label>Your Response</Label>
                              <Textarea
                                placeholder="Type your response..."
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                rows={4}
                              />
                            </div>
                            <Button
                              className="w-full bg-blue hover:bg-blue-dark"
                              onClick={() => selectedTicket && handleSendResponse(selectedTicket.id)}
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send Response
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {ticket.status === "open" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusChange(ticket.id, "in_progress")}
                        >
                          <Clock className="w-4 h-4 text-blue" />
                        </Button>
                      )}
                      {(ticket.status === "in_progress" || ticket.status === "open") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleStatusChange(ticket.id, "resolved")}
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
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

export default SupportTickets;
