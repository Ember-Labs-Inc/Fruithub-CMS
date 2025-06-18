
import { useState } from "react";
import { CMSLayout } from "../components/CMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Separator } from "../components/ui/separator";
import { toast } from "../hooks/use-toast";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const orders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      total: "$45.99",
      status: "pending",
      date: "2024-01-15",
      time: "2 min ago",
      address: "123 Main St, City, State 12345",
      items: [
        { name: "Organic Milk", quantity: 2, price: "$3.99" },
        { name: "Fresh Bread", quantity: 1, price: "$2.49" },
        { name: "Bananas", quantity: 3, price: "$1.99" },
      ],
    },
    {
      id: "#ORD-002",
      customer: "Sarah Smith",
      email: "sarah@example.com",
      phone: "+1234567891",
      total: "$78.50",
      status: "processing",
      date: "2024-01-15",
      time: "15 min ago",
      address: "456 Oak Ave, City, State 12345",
      items: [
        { name: "Ground Beef", quantity: 1, price: "$8.99" },
        { name: "Chicken Breast", quantity: 2, price: "$12.99" },
        { name: "Mixed Vegetables", quantity: 1, price: "$4.99" },
      ],
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1234567892",
      total: "$23.75",
      status: "delivered",
      date: "2024-01-14",
      time: "1 hour ago",
      address: "789 Pine St, City, State 12345",
      items: [
        { name: "Apples", quantity: 2, price: "$2.99" },
        { name: "Orange Juice", quantity: 1, price: "$3.49" },
      ],
    },
    {
      id: "#ORD-004",
      customer: "Emily Davis",
      email: "emily@example.com",
      phone: "+1234567893",
      total: "$156.20",
      status: "cancelled",
      date: "2024-01-14",
      time: "2 hours ago",
      address: "321 Elm St, City, State 12345",
      items: [
        { name: "Salmon Fillet", quantity: 2, price: "$15.99" },
        { name: "Asparagus", quantity: 1, price: "$4.99" },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-secondary text-secondary-foreground";
      case "processing":
        return "bg-info text-white";
      case "delivered":
        return "bg-success text-white";
      case "cancelled":
        return "bg-destructive text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filterOrdersByStatus = (status: string) => {
    if (status === "all") return orders;
    return orders.filter(order => order.status === status);
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}.`,
    });
  };

  const OrderCard = ({ order }: { order: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{order.id}</h3>
            <p className="text-muted-foreground">{order.customer}</p>
            <p className="text-sm text-muted-foreground">{order.time}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary">{order.total}</p>
            <Badge className={getStatusColor(order.status)}>
              {order.status}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => setSelectedOrder(order)}
              >
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              {selectedOrder && (
                <>
                  <DialogHeader>
                    <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Customer Info */}
                    <div>
                      <h4 className="font-semibold mb-2">Customer Information</h4>
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <p><strong>Name:</strong> {selectedOrder.customer}</p>
                        <p><strong>Email:</strong> {selectedOrder.email}</p>
                        <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                        <p><strong>Address:</strong> {selectedOrder.address}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="font-semibold mb-2">Order Items</h4>
                      <div className="space-y-2">
                        {selectedOrder.items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">{item.price}</p>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Total:</span>
                        <span className="text-xl font-bold text-primary">{selectedOrder.total}</span>
                      </div>
                    </div>

                    {/* Status Update */}
                    <div>
                      <h4 className="font-semibold mb-2">Update Status</h4>
                      <Select onValueChange={(value) => handleStatusUpdate(selectedOrder.id, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={`Current: ${selectedOrder.status}`} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
          <Select onValueChange={(value) => handleStatusUpdate(order.id, value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Update" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <CMSLayout
      title="Order Management"
      description="Track and manage all customer orders in real-time."
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="max-w-md">
          <Input
            placeholder="Search orders by ID or customer name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Order Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4">
              {filterOrdersByStatus("pending").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="processing" className="space-y-4">
            <div className="grid gap-4">
              {filterOrdersByStatus("processing").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="delivered" className="space-y-4">
            <div className="grid gap-4">
              {filterOrdersByStatus("delivered").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            <div className="grid gap-4">
              {filterOrdersByStatus("cancelled").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CMSLayout>
  );
};

export default Orders;
