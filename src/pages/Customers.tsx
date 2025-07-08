
import { useState } from "react";
import { CMSLayout } from "../components/CMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      orderCount: 15,
      totalSpent: "$456.78",
      status: "active",
      joinDate: "2023-08-15",
      lastOrder: "2024-01-15",
      address: "123 Main St, City, State 12345",
      recentOrders: [
        { id: "#ORD-001", date: "2024-01-15", amount: "$45.99", status: "delivered" },
        { id: "#ORD-012", date: "2024-01-10", amount: "$78.50", status: "delivered" },
        { id: "#ORD-008", date: "2024-01-05", amount: "$23.75", status: "delivered" },
      ],
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      phone: "+1234567891",
      orderCount: 8,
      totalSpent: "$234.50",
      status: "active",
      joinDate: "2023-11-20",
      lastOrder: "2024-01-12",
      address: "456 Oak Ave, City, State 12345",
      recentOrders: [
        { id: "#ORD-009", date: "2024-01-12", amount: "$67.25", status: "delivered" },
        { id: "#ORD-006", date: "2024-01-08", amount: "$45.30", status: "delivered" },
      ],
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1234567892",
      orderCount: 22,
      totalSpent: "$789.25",
      status: "vip",
      joinDate: "2023-05-10",
      lastOrder: "2024-01-14",
      address: "789 Pine St, City, State 12345",
      recentOrders: [
        { id: "#ORD-011", date: "2024-01-14", amount: "$156.20", status: "delivered" },
        { id: "#ORD-007", date: "2024-01-09", amount: "$89.75", status: "delivered" },
        { id: "#ORD-004", date: "2024-01-03", amount: "$124.50", status: "delivered" },
      ],
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1234567893",
      orderCount: 3,
      totalSpent: "$98.40",
      status: "inactive",
      joinDate: "2023-12-01",
      lastOrder: "2023-12-20",
      address: "321 Elm St, City, State 12345",
      recentOrders: [
        { id: "#ORD-002", date: "2023-12-20", amount: "$34.80", status: "delivered" },
        { id: "#ORD-001", date: "2023-12-15", amount: "$42.60", status: "cancelled" },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-white";
      case "vip":
        return "bg-secondary text-secondary-foreground";
      case "inactive":
        return "bg-zinc-200 text-muted-foreground";
      default:
        return "bg-zinc-200 text-muted-foreground";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-success text-white";
      case "cancelled":
        return "bg-destructive text-white";
      case "pending":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-info text-white";
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CMSLayout
      title="Customer Management"
      description="View and manage your customer database and order history."
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="max-w-md">
          <Input
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">247</div>
              <div className="text-sm text-muted-foreground">Total Customers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success">189</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-secondary">24</div>
              <div className="text-sm text-muted-foreground">VIP Customers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-info">$12.5K</div>
              <div className="text-sm text-muted-foreground">Avg. Customer Value</div>
            </CardContent>
          </Card>
        </div>

        {/* Customers List */}
        <div className="grid gap-4">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-white">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{customer.name}</h3>
                      <p className="text-muted-foreground">{customer.email}</p>
                      <p className="text-sm text-muted-foreground">{customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{customer.orderCount}</div>
                      <div className="text-xs text-muted-foreground">Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{customer.totalSpent}</div>
                      <div className="text-xs text-muted-foreground">Total Spent</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status.toUpperCase()}
                      </Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedCustomer(customer)}
                          >
                            View Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          {selectedCustomer && (
                            <>
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-primary text-white">
                                      {selectedCustomer.name.split(' ').map((n: string) => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  {selectedCustomer.name} - Customer Profile
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                {/* Customer Details */}
                                <div className="grid grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-semibold mb-3">Contact Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Email:</strong> {selectedCustomer.email}</p>
                                      <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                                      <p><strong>Address:</strong> {selectedCustomer.address}</p>
                                      <p><strong>Member Since:</strong> {selectedCustomer.joinDate}</p>
                                      <p><strong>Last Order:</strong> {selectedCustomer.lastOrder}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-3">Order Statistics</h4>
                                    <div className="space-y-3">
                                      <div className="flex justify-between">
                                        <span>Total Orders:</span>
                                        <span className="font-semibold">{selectedCustomer.orderCount}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Total Spent:</span>
                                        <span className="font-semibold text-success">{selectedCustomer.totalSpent}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Status:</span>
                                        <Badge className={getStatusColor(selectedCustomer.status)}>
                                          {selectedCustomer.status.toUpperCase()}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Recent Orders */}
                                <div>
                                  <h4 className="font-semibold mb-3">Recent Orders</h4>
                                  <div className="space-y-2">
                                    {selectedCustomer.recentOrders.map((order: any, index: number) => (
                                      <div key={index} className="flex justify-between items-center p-3 bg-zinc-200 rounded-lg">
                                        <div>
                                          <p className="font-medium">{order.id}</p>
                                          <p className="text-sm text-muted-foreground">{order.date}</p>
                                        </div>
                                        <div className="text-right">
                                          <p className="font-semibold">{order.amount}</p>
                                          <Badge className={getOrderStatusColor(order.status)} variant="secondary">
                                            {order.status}
                                          </Badge>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                  <Button variant="outline" className="flex-1">
                                    Send Message
                                  </Button>
                                  <Button variant="destructive">
                                    Disable Account
                                  </Button>
                                </div>
                              </div>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No customers found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </CMSLayout>
  );
};

export default Customers;
