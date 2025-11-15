import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Eye, CheckCircle, XCircle, FileText, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface KYCApplication {
  id: string;
  sellerName: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  taxId: string;
  status: "pending" | "approved" | "rejected" | "under_review";
  submittedDate: string;
  documents: {
    businessLicense: boolean;
    taxCertificate: boolean;
    identityProof: boolean;
    addressProof: boolean;
  };
}

const SellerKYC = () => {
  const [applications, setApplications] = useState<KYCApplication[]>([
    {
      id: "KYC001",
      sellerName: "John Smith",
      businessName: "Smith Electronics",
      email: "john@smithelectronics.com",
      phone: "+1234567890",
      businessType: "Retail",
      taxId: "TAX123456",
      status: "pending",
      submittedDate: "2024-11-14",
      documents: {
        businessLicense: true,
        taxCertificate: true,
        identityProof: true,
        addressProof: true
      }
    },
    {
      id: "KYC002",
      sellerName: "Maria Garcia",
      businessName: "Fashion Boutique",
      email: "maria@fashionboutique.com",
      phone: "+1234567891",
      businessType: "Fashion",
      taxId: "TAX789012",
      status: "under_review",
      submittedDate: "2024-11-13",
      documents: {
        businessLicense: true,
        taxCertificate: true,
        identityProof: true,
        addressProof: false
      }
    },
    {
      id: "KYC003",
      sellerName: "David Lee",
      businessName: "Home Essentials",
      email: "david@homeessentials.com",
      phone: "+1234567892",
      businessType: "Home & Garden",
      taxId: "TAX345678",
      status: "approved",
      submittedDate: "2024-11-10",
      documents: {
        businessLicense: true,
        taxCertificate: true,
        identityProof: true,
        addressProof: true
      }
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<KYCApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = (kycId: string) => {
    setApplications(applications.map(a =>
      a.id === kycId ? { ...a, status: "approved" as const } : a
    ));
    toast.success("KYC application approved");
  };

  const handleReject = (kycId: string, reason: string) => {
    setApplications(applications.map(a =>
      a.id === kycId ? { ...a, status: "rejected" as const } : a
    ));
    toast.success("KYC application rejected");
    setRejectionReason("");
    setSelectedApplication(null);
  };

  const handleUnderReview = (kycId: string) => {
    setApplications(applications.map(a =>
      a.id === kycId ? { ...a, status: "under_review" as const } : a
    ));
    toast.info("KYC application marked for review");
  };

  const filteredApplications = applications.filter(app =>
    app.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDocumentStatus = (docs: KYCApplication["documents"]) => {
    const total = Object.keys(docs).length;
    const submitted = Object.values(docs).filter(Boolean).length;
    return `${submitted}/${total}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Seller KYC</h2>
        <p className="text-muted-foreground">Review and verify seller applications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange">
              {applications.filter(a => a.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue">
              {applications.filter(a => a.status === "under_review").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {applications.filter(a => a.status === "approved").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {applications.filter(a => a.status === "rejected").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>KYC Applications</CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>KYC ID</TableHead>
                <TableHead>Seller Name</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Business Type</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.id}</TableCell>
                  <TableCell>{app.sellerName}</TableCell>
                  <TableCell>{app.businessName}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{app.email}</div>
                      <div className="text-muted-foreground">{app.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{app.businessType}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {getDocumentStatus(app.documents)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        app.status === "approved" ? "default" :
                        app.status === "rejected" ? "destructive" :
                        app.status === "under_review" ? "secondary" : "outline"
                      }
                    >
                      {app.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{app.submittedDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedApplication(app)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>KYC Application Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Seller Name</Label>
                                <p className="font-medium">{selectedApplication?.sellerName}</p>
                              </div>
                              <div>
                                <Label>Business Name</Label>
                                <p className="font-medium">{selectedApplication?.businessName}</p>
                              </div>
                              <div>
                                <Label>Email</Label>
                                <p className="font-medium">{selectedApplication?.email}</p>
                              </div>
                              <div>
                                <Label>Phone</Label>
                                <p className="font-medium">{selectedApplication?.phone}</p>
                              </div>
                              <div>
                                <Label>Business Type</Label>
                                <p className="font-medium">{selectedApplication?.businessType}</p>
                              </div>
                              <div>
                                <Label>Tax ID</Label>
                                <p className="font-medium">{selectedApplication?.taxId}</p>
                              </div>
                            </div>
                            
                            <div>
                              <Label>Submitted Documents</Label>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                {selectedApplication && Object.entries(selectedApplication.documents).map(([doc, status]) => (
                                  <div key={doc} className="flex items-center gap-2">
                                    {status ? (
                                      <CheckCircle className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <AlertCircle className="w-4 h-4 text-orange" />
                                    )}
                                    <span className="text-sm capitalize">
                                      {doc.replace(/([A-Z])/g, " $1").trim()}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {selectedApplication?.status === "pending" && (
                              <div className="space-y-2">
                                <Label>Rejection Reason (if rejecting)</Label>
                                <Textarea
                                  placeholder="Enter reason for rejection..."
                                  value={rejectionReason}
                                  onChange={(e) => setRejectionReason(e.target.value)}
                                />
                              </div>
                            )}

                            <div className="flex gap-2">
                              {selectedApplication?.status !== "approved" && (
                                <Button
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                  onClick={() => selectedApplication && handleApprove(selectedApplication.id)}
                                >
                                  Approve
                                </Button>
                              )}
                              {selectedApplication?.status === "pending" && (
                                <>
                                  <Button
                                    className="flex-1 bg-blue hover:bg-blue-dark"
                                    onClick={() => selectedApplication && handleUnderReview(selectedApplication.id)}
                                  >
                                    Mark for Review
                                  </Button>
                                  <Button
                                    className="flex-1 bg-red-600 hover:bg-red-700"
                                    onClick={() => selectedApplication && handleReject(selectedApplication.id, rejectionReason)}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      {app.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleApprove(app.id)}
                          >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUnderReview(app.id)}
                          >
                            <AlertCircle className="w-4 h-4 text-blue" />
                          </Button>
                        </>
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

export default SellerKYC;
