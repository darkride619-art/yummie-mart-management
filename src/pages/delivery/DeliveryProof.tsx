import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera, Upload, Eye, CheckCircle, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface DeliveryProof {
  id: string;
  orderNumber: string;
  customerName: string;
  address: string;
  deliveredDate: string;
  deliveredTime: string;
  signature: boolean;
  photo: boolean;
  notes: string;
}

const DeliveryProof = () => {
  const [proofs, setProofs] = useState<DeliveryProof[]>([
    {
      id: "DP001",
      orderNumber: "DEL001",
      customerName: "John Doe",
      address: "123 Main St, Downtown",
      deliveredDate: "2024-11-15",
      deliveredTime: "10:30 AM",
      signature: true,
      photo: true,
      notes: "Package left at front door as requested"
    },
    {
      id: "DP002",
      orderNumber: "DEL002",
      customerName: "Jane Smith",
      address: "456 Oak Ave, Uptown",
      deliveredDate: "2024-11-15",
      deliveredTime: "11:15 AM",
      signature: true,
      photo: true,
      notes: "Delivered to recipient in person"
    },
    {
      id: "DP003",
      orderNumber: "DEL003",
      customerName: "Bob Johnson",
      address: "789 Pine Rd, Midtown",
      deliveredDate: "2024-11-14",
      deliveredTime: "02:45 PM",
      signature: false,
      photo: true,
      notes: "Left with building security"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleUploadPhoto = (proofId: string) => {
    toast.success("Photo uploaded successfully");
  };

  const handleCaptureSignature = (proofId: string) => {
    toast.success("Signature captured");
  };

  const filteredProofs = proofs.filter(proof =>
    proof.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proof.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Delivery Proof</h2>
        <p className="text-muted-foreground">Manage delivery confirmations and documentation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange">{proofs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">With Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue">
              {proofs.filter(p => p.photo).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">With Signatures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {proofs.filter(p => p.signature).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Records</CardTitle>
          <Input
            placeholder="Search by order or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProofs.map((proof) => (
              <Card key={proof.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{proof.orderNumber}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {proof.customerName}
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Address</p>
                    <p className="font-medium">{proof.address}</p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-medium">{proof.deliveredDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-medium">{proof.deliveredTime}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {proof.photo && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <ImageIcon className="w-3 h-3" />
                        Photo
                      </Badge>
                    )}
                    {proof.signature && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        ✍️ Signature
                      </Badge>
                    )}
                  </div>
                  {proof.notes && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Notes</p>
                      <p className="text-sm">{proof.notes}</p>
                    </div>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delivery Proof - {proof.orderNumber}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Customer</Label>
                            <p className="font-medium">{proof.customerName}</p>
                          </div>
                          <div>
                            <Label>Order Number</Label>
                            <p className="font-medium">{proof.orderNumber}</p>
                          </div>
                        </div>
                        <div>
                          <Label>Delivery Address</Label>
                          <p className="font-medium">{proof.address}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Delivered Date</Label>
                            <p className="font-medium">{proof.deliveredDate}</p>
                          </div>
                          <div>
                            <Label>Time</Label>
                            <p className="font-medium">{proof.deliveredTime}</p>
                          </div>
                        </div>
                        <div>
                          <Label>Delivery Notes</Label>
                          <p className="text-sm">{proof.notes}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4 text-center">
                            {proof.photo ? (
                              <div>
                                <Camera className="w-8 h-8 mx-auto mb-2 text-blue" />
                                <p className="text-sm font-medium">Photo Captured</p>
                              </div>
                            ) : (
                              <div>
                                <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">No photo</p>
                              </div>
                            )}
                          </div>
                          <div className="border rounded-lg p-4 text-center">
                            {proof.signature ? (
                              <div>
                                <div className="text-3xl mb-2">✍️</div>
                                <p className="text-sm font-medium">Signature Received</p>
                              </div>
                            ) : (
                              <div>
                                <div className="text-3xl mb-2 opacity-30">✍️</div>
                                <p className="text-sm text-muted-foreground">No signature</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Proof</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-24 bg-orange hover:bg-orange-dark">
              <div className="text-center">
                <Camera className="w-8 h-8 mx-auto mb-2" />
                <p>Take Photo</p>
              </div>
            </Button>
            <Button className="h-24 bg-blue hover:bg-blue-dark">
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <p>Upload Photo</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryProof;
