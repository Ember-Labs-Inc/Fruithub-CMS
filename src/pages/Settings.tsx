import { useState } from "react";
import { CMSLayout } from "../components/CMSLayout";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Switch } from "../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { toast } from "../hooks/use-toast";
import { useReduxAdmin } from "../hooks/useReduxAdmin";
import { useAppDispatch } from "../redux/hooks";
import { addAdmin } from "../redux/slices/adminSlice";

const Settings = () => {
  const dispatch = useAppDispatch();
  const { admins, loading, reload } = useReduxAdmin();

  const [businessInfo, setBusinessInfo] = useState({
    name: "FreshMart Grocery",
    email: "admin@freshmart.com",
    phone: "+1 (555) 123-4567",
    address: "123 Market Street, Food City, FC 12345",
    description:
      "Your neighborhood grocery store for fresh, quality products delivered to your doorstep.",
  });

  const [appConfig, setAppConfig] = useState({
    currency: "UGX",
    deliveryFee: "2000",
    freeDeliveryThreshold: "50000",
    taxRate: "8.5",
    operatingHours: "8:00 AM - 10:00 PM",
    orderCutoffTime: "9:30 PM",
  });

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    gender: "",
    role: "",
  });

  const notificationSettings = [
    {
      id: "orderNotifications",
      label: "Order Notifications",
      description: "Receive notifications for new orders",
      enabled: true,
    },
    {
      id: "lowStockAlerts",
      label: "Low Stock Alerts",
      description: "Get alerted when products are running low",
      enabled: true,
    },
    {
      id: "customerSignups",
      label: "Customer Signups",
      description: "Notifications for new customer registrations",
      enabled: false,
    },
    {
      id: "salesReports",
      label: "Daily Sales Reports",
      description: "Automated daily sales summary emails",
      enabled: true,
    },
  ];

  const handleBusinessInfoSave = () => {
    toast({
      title: "Business Information Updated",
      description: "Your business information has been saved successfully.",
    });
  };

  const handleAppConfigSave = () => {
    toast({
      title: "App Configuration Updated",
      description: "Application settings have been updated successfully.",
    });
  };

  const handleAddAdmin = async () => {
    if (
      !newAdmin.name ||
      !newAdmin.email ||
      !newAdmin.gender ||
      !newAdmin.role
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const password = newAdmin.name.toLowerCase().replace(/\s+/g, ""); // e.g. John Doe -> johndoe

    try {
      await dispatch(addAdmin({ ...newAdmin, password })).unwrap();

      toast({
        title: "Admin User Added",
        description: `${newAdmin.name} has been added as ${newAdmin.role}. Default password: ${password}`,
      });

      setNewAdmin({ name: "", email: "", gender: "", role: "" });
      reload();
    } catch (error) {
      toast({
        title: "Error Adding Admin",
        description: (error as string) || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-success text-white"
      : "bg-zinc-200 text-muted-foreground";
  };

  return (
    <CMSLayout
      title="Settings"
      description="Configure your store settings, manage admin users, and customize app behavior."
    >
      <div className="space-y-6">
        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="business">Business Info</TabsTrigger>
            <TabsTrigger value="app">App Config</TabsTrigger>
            <TabsTrigger value="users">Admin Users</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="space-y-6">
            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>🏪 Business Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        value={businessInfo.name}
                        onChange={(e) =>
                          setBusinessInfo({
                            ...businessInfo,
                            name: e.target.value,
                          })
                        }
                        className="bg-zinc-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessEmail">Contact Email</Label>
                      <Input
                        id="businessEmail"
                        type="email"
                        value={businessInfo.email}
                        onChange={(e) =>
                          setBusinessInfo({
                            ...businessInfo,
                            email: e.target.value,
                          })
                        }
                        className="bg-zinc-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessPhone">Phone Number</Label>
                      <Input
                        id="businessPhone"
                        value={businessInfo.phone}
                        onChange={(e) =>
                          setBusinessInfo({
                            ...businessInfo,
                            phone: e.target.value,
                          })
                        }
                        className="bg-zinc-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessAddress">Business Address</Label>
                      <Textarea
                        id="businessAddress"
                        value={businessInfo.address}
                        onChange={(e) =>
                          setBusinessInfo({
                            ...businessInfo,
                            address: e.target.value,
                          })
                        }
                        rows={3}
                        className="bg-zinc-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="businessDescription">
                        Business Description
                      </Label>
                      <Textarea
                        id="businessDescription"
                        value={businessInfo.description}
                        onChange={(e) =>
                          setBusinessInfo({
                            ...businessInfo,
                            description: e.target.value,
                          })
                        }
                        rows={6}
                        className="bg-zinc-200"
                      />
                    </div>

                    <div>
                      <Label>Logo Upload</Label>
                      <div className="mt-2 p-8 border-2 border-dashed rounded-lg text-center">
                        <div className="text-4xl mb-2">🛒</div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload your business logo
                        </p>
                        <Button variant="outline" size="sm">
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    onClick={handleBusinessInfoSave}
                    className="bg-primary hover:bg-primary-hover"
                  >
                    Save Business Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="app" className="space-y-6">
            {/* App Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>⚙️ Application Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={appConfig.currency}
                        onValueChange={(value) =>
                          setAppConfig({ ...appConfig, currency: value })
                        }
                      >
                        <SelectTrigger className="bg-zinc-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD ($)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="deliveryFee">Delivery Fee</Label>
                      <Input
                        id="deliveryFee"
                        value={appConfig.deliveryFee}
                        onChange={(e) =>
                          setAppConfig({
                            ...appConfig,
                            deliveryFee: e.target.value,
                          })
                        }
                        placeholder="5.99"
                        className="bg-zinc-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="freeDeliveryThreshold">
                        Free Delivery Threshold
                      </Label>
                      <Input
                        id="freeDeliveryThreshold"
                        value={appConfig.freeDeliveryThreshold}
                        onChange={(e) =>
                          setAppConfig({
                            ...appConfig,
                            freeDeliveryThreshold: e.target.value,
                          })
                        }
                        placeholder="50.00"
                        className="bg-zinc-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        value={appConfig.taxRate}
                        onChange={(e) =>
                          setAppConfig({
                            ...appConfig,
                            taxRate: e.target.value,
                          })
                        }
                        placeholder="8.5"
                        className="bg-zinc-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="operatingHours">Operating Hours</Label>
                      <Input
                        id="operatingHours"
                        value={appConfig.operatingHours}
                        onChange={(e) =>
                          setAppConfig({
                            ...appConfig,
                            operatingHours: e.target.value,
                          })
                        }
                        placeholder="8:00 AM - 10:00 PM"
                        className="bg-zinc-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="orderCutoffTime">Order Cutoff Time</Label>
                      <Input
                        id="orderCutoffTime"
                        value={appConfig.orderCutoffTime}
                        onChange={(e) =>
                          setAppConfig({
                            ...appConfig,
                            orderCutoffTime: e.target.value,
                          })
                        }
                        placeholder="9:30 PM"
                        className="bg-zinc-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    onClick={handleAppConfigSave}
                    className="bg-primary hover:bg-primary-hover"
                  >
                    Save Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* Admin Users Management */}
            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary-hover">
                    Add Admin User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Admin User</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="adminName">Full Name</Label>
                      <Input
                        id="adminName"
                        value={newAdmin.name}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, name: e.target.value })
                        }
                        placeholder="Enter full name"
                        className="bg-zinc-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="adminEmail">Email Address</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={newAdmin.email}
                        onChange={(e) =>
                          setNewAdmin({ ...newAdmin, email: e.target.value })
                        }
                        placeholder="Enter email address"
                        className="bg-zinc-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="adminGender">Gender</Label>
                      <Select
                        value={newAdmin.gender}
                        onValueChange={(value) =>
                          setNewAdmin({ ...newAdmin, gender: value })
                        }
                      >
                        <SelectTrigger className="bg-zinc-200">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MALE">Male</SelectItem>
                          <SelectItem value="FEMALE">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="adminRole">Role</Label>
                      <Select
                        value={newAdmin.role}
                        onValueChange={(value) =>
                          setNewAdmin({ ...newAdmin, role: value })
                        }
                      >
                        <SelectTrigger className="bg-zinc-200">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="STORE_MANAGER">
                            Store Manager
                          </SelectItem>
                          <SelectItem value="SUPPORT_AGENT">
                            Support Agent
                          </SelectItem>
                          <SelectItem value="INVENTORY_MANAGER">
                            Inventory Manager
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={handleAddAdmin}
                      className="w-full bg-primary hover:bg-primary-hover"
                    >
                      Add Admin User
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>👥 Admin Users & Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    <div className="flex justify-center py-10">
                      <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
                    </div>
                  ) : admins.length === 0 ? (
                    <div className="text-center py-10 text-muted-foreground font-medium">
                      No admins added yet.
                    </div>
                  ) : (
                    admins.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 bg-zinc-200 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h3 className="font-semibold">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Last login: {user.lastLogin || "N/A"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge variant="outline" className="mb-2">
                              {user.role}
                            </Badge>
                            <div>
                              <Badge className={getStatusColor(user.status)}>
                                {user.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle>🔔 Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {notificationSettings.map((setting) => (
                    <div
                      key={setting.id}
                      className="flex items-center justify-between p-4 bg-zinc-200 rounded-lg"
                    >
                      <div className="space-y-1">
                        <h3 className="font-semibold">{setting.label}</h3>
                        <p className="text-sm text-muted-foreground">
                          {setting.description}
                        </p>
                      </div>
                      <Switch checked={setting.enabled} />
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-4">
                    📧 Email Template Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="senderName">Sender Name</Label>
                      <Input
                        id="senderName"
                        defaultValue="FreshMart Grocery"
                        className="bg-zinc-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="senderEmail">Sender Email</Label>
                      <Input
                        id="senderEmail"
                        defaultValue="noreply@freshmart.com"
                        className="bg-zinc-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button className="bg-primary hover:bg-primary-hover">
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CMSLayout>
  );
};

export default Settings;
