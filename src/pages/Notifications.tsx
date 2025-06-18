
import { useState } from "react";
import { CMSLayout } from "../components/CMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "../hooks/use-toast";

const Notifications = () => {
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    audience: "",
    schedule: "now",
  });

  const notificationHistory = [
    {
      id: 1,
      title: "New Year Sale - 20% Off!",
      message: "Celebrate the New Year with amazing discounts on all products...",
      audience: "All Users",
      sent: "2024-01-15 10:30 AM",
      delivered: 1247,
      opened: 892,
      status: "delivered",
    },
    {
      id: 2,
      title: "Fresh Organic Produce Available",
      message: "Check out our new collection of organic fruits and vegetables...",
      audience: "VIP Customers",
      sent: "2024-01-14 02:15 PM",
      delivered: 156,
      opened: 98,
      status: "delivered",
    },
    {
      id: 3,
      title: "Order Confirmation",
      message: "Your order #ORD-001 has been confirmed and is being prepared...",
      audience: "John Doe",
      sent: "2024-01-14 09:45 AM",
      delivered: 1,
      opened: 1,
      status: "delivered",
    },
    {
      id: 4,
      title: "Weekend Special Offers",
      message: "Don't miss our weekend special offers on dairy products...",
      audience: "All Users",
      sent: "Scheduled for 2024-01-16 08:00 AM",
      delivered: 0,
      opened: 0,
      status: "scheduled",
    },
  ];

  const templates = [
    {
      id: 1,
      name: "Order Confirmation",
      title: "Order Confirmed!",
      message: "Your order has been confirmed and is being prepared for delivery.",
    },
    {
      id: 2,
      name: "Delivery Update",
      title: "Your order is on the way!",
      message: "Your order is out for delivery and will arrive within 30 minutes.",
    },
    {
      id: 3,
      name: "Promotional Sale",
      title: "Special Offer Just for You!",
      message: "Enjoy exclusive discounts on your favorite products. Limited time offer!",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-success text-white";
      case "scheduled":
        return "bg-info text-white";
      case "failed":
        return "bg-destructive text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleSendNotification = () => {
    if (!newNotification.title || !newNotification.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Notification Sent",
      description: `Your notification "${newNotification.title}" has been sent successfully.`,
    });

    setNewNotification({
      title: "",
      message: "",
      audience: "",
      schedule: "now",
    });
  };

  const useTemplate = (template: any) => {
    setNewNotification({
      ...newNotification,
      title: template.title,
      message: template.message,
    });
  };

  return (
    <CMSLayout
      title="Push Notifications"
      description="Send targeted notifications to your customers and track delivery performance."
    >
      <div className="space-y-6">
        <Tabs defaultValue="send" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="send">Send Notification</TabsTrigger>
            <TabsTrigger value="history">Notification History</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-6">
            {/* Send New Notification */}
            <Card>
              <CardHeader>
                <CardTitle>📱 Send New Notification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Notification Title *</Label>
                      <Input
                        id="title"
                        value={newNotification.title}
                        onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                        placeholder="Enter notification title"
                        maxLength={50}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {newNotification.title.length}/50 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={newNotification.message}
                        onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                        placeholder="Enter your message"
                        maxLength={150}
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {newNotification.message.length}/150 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="audience">Target Audience</Label>
                      <Select 
                        value={newNotification.audience}
                        onValueChange={(value) => setNewNotification({...newNotification, audience: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="vip">VIP Customers</SelectItem>
                          <SelectItem value="new">New Customers</SelectItem>
                          <SelectItem value="inactive">Inactive Users</SelectItem>
                          <SelectItem value="city">Specific City</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="schedule">Schedule</Label>
                      <Select 
                        value={newNotification.schedule}
                        onValueChange={(value) => setNewNotification({...newNotification, schedule: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now">Send Now</SelectItem>
                          <SelectItem value="later">Schedule for Later</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={handleSendNotification} 
                      className="w-full bg-primary hover:bg-primary-hover"
                    >
                      {newNotification.schedule === "now" ? "Send Notification" : "Schedule Notification"}
                    </Button>
                  </div>

                  {/* Preview */}
                  <div>
                    <Label>Preview</Label>
                    <div className="mt-2 p-4 border rounded-lg bg-muted">
                      <div className="bg-white p-4 rounded-lg shadow-sm max-w-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">🛒</span>
                          </div>
                          <span className="text-sm font-medium">GroceryCMS</span>
                        </div>
                        <h4 className="font-semibold text-sm mb-1">
                          {newNotification.title || "Notification Title"}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {newNotification.message || "Your notification message will appear here..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            {/* Notification Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground">Total Sent</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-success">892</div>
                  <div className="text-sm text-muted-foreground">Opened</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-secondary">71.5%</div>
                  <div className="text-sm text-muted-foreground">Open Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-info">24</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </CardContent>
              </Card>
            </div>

            {/* Notification History */}
            <Card>
              <CardHeader>
                <CardTitle>📋 Notification History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationHistory.map((notification) => (
                    <div key={notification.id} className="p-4 bg-muted rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message.substring(0, 80)}...
                          </p>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>To: {notification.audience}</span>
                            <span>Sent: {notification.sent}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(notification.status)}>
                          {notification.status}
                        </Badge>
                      </div>
                      {notification.status === "delivered" && (
                        <div className="flex gap-6 text-sm">
                          <span>📤 Delivered: {notification.delivered}</span>
                          <span>👁️ Opened: {notification.opened}</span>
                          <span className="text-success">
                            📊 Open Rate: {((notification.opened / notification.delivered) * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            {/* Notification Templates */}
            <Card>
              <CardHeader>
                <CardTitle>📝 Notification Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div>
                            <p className="text-sm font-medium">Title:</p>
                            <p className="text-sm text-muted-foreground">{template.title}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Message:</p>
                            <p className="text-sm text-muted-foreground">{template.message}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => useTemplate(template)}
                          >
                            Use Template
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add Template Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-4 bg-primary hover:bg-primary-hover">
                      Create New Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Template</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="templateName">Template Name</Label>
                        <Input id="templateName" placeholder="Enter template name" />
                      </div>
                      <div>
                        <Label htmlFor="templateTitle">Title</Label>
                        <Input id="templateTitle" placeholder="Notification title" />
                      </div>
                      <div>
                        <Label htmlFor="templateMessage">Message</Label>
                        <Textarea id="templateMessage" placeholder="Notification message" />
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary-hover">
                        Save Template
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CMSLayout>
  );
};

export default Notifications;
