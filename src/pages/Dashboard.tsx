
import { CMSLayout } from "../components/CMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Orders Today",
      value: "142",
      change: "+12%",
      changeType: "increase",
      icon: "🧾",
    },
    {
      title: "Revenue Today",
      value: "$2,847",
      change: "+8%",
      changeType: "increase",
      icon: "💰",
    },
    {
      title: "New Customers",
      value: "24",
      change: "+3%",
      changeType: "increase",
      icon: "👥",
    },
    {
      title: "Low Stock Items",
      value: "8",
      change: "2 critical",
      changeType: "warning",
      icon: "⚠️",
    },
  ];

  const topProducts = [
    { name: "Organic Milk", sales: 89, stock: 12 },
    { name: "Fresh Bread", sales: 76, stock: 25 },
    { name: "Bananas", sales: 65, stock: 8 },
    { name: "Eggs (12ct)", sales: 54, stock: 18 },
    { name: "Apples", sales: 42, stock: 15 },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      amount: "$45.99",
      status: "pending",
      time: "2 min ago",
    },
    {
      id: "#ORD-002",
      customer: "Sarah Smith",
      amount: "$78.50",
      status: "delivered",
      time: "15 min ago",
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      amount: "$23.75",
      status: "processing",
      time: "1 hour ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-success text-white";
      case "pending":
        return "bg-secondary text-secondary-foreground";
      case "processing":
        return "bg-info text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <CMSLayout
      title="Dashboard"
      description="Welcome back! Here's what's happening with your grocery store today."
    >
      <div className="space-y-6 animate-fade-in">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <span className="text-2xl">{stat.icon}</span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.changeType === "increase"
                      ? "text-success"
                      : stat.changeType === "warning"
                      ? "text-secondary"
                      : "text-muted-foreground"
                  }`}
                >
                  {stat.change} from yesterday
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Selling Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🔥 Top Selling Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.sales} sold today
                      </p>
                    </div>
                    <Badge
                      variant={product.stock <= 10 ? "destructive" : "secondary"}
                    >
                      {product.stock} left
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📦 Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer} • {order.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.amount}</p>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Order Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-secondary">45</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center p-4 bg-info/10 rounded-lg">
                <div className="text-2xl font-bold text-info">32</div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">89</div>
                <div className="text-sm text-muted-foreground">Delivered</div>
              </div>
              <div className="text-center p-4 bg-destructive/10 rounded-lg">
                <div className="text-2xl font-bold text-destructive">3</div>
                <div className="text-sm text-muted-foreground">Cancelled</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
};

export default Dashboard;
