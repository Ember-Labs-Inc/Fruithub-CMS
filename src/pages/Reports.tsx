import { CMSLayout } from "../components/CMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const Reports = () => {
  const salesData = [
    { period: "Today", revenue: "$2,847", orders: 142, avgOrder: "$20.05" },
    { period: "This Week", revenue: "$18,492", orders: 892, avgOrder: "$20.73" },
    { period: "This Month", revenue: "$89,234", orders: 4156, avgOrder: "$21.47" },
    { period: "This Year", revenue: "$892,340", orders: 41234, avgOrder: "$21.65" },
  ];

  const topProducts = [
    { name: "Organic Milk", category: "Dairy", sales: 234, revenue: "$934.66" },
    { name: "Fresh Bread", category: "Bakery", sales: 189, revenue: "$470.61" },
    { name: "Bananas", category: "Fruits", sales: 167, revenue: "$332.33" },
    { name: "Ground Beef", category: "Meat", sales: 145, revenue: "$1,303.55" },
    { name: "Chicken Breast", category: "Meat", sales: 134, revenue: "$1,740.66" },
  ];

  const categoryPerformance = [
    { category: "Fruits", revenue: "$12,456", percentage: 18.2, trend: "up" },
    { category: "Vegetables", revenue: "$10,892", percentage: 15.9, trend: "up" },
    { category: "Dairy", revenue: "$9,234", percentage: 13.5, trend: "down" },
    { category: "Meat", revenue: "$15,678", percentage: 22.9, trend: "up" },
    { category: "Bakery", revenue: "$6,789", percentage: 9.9, trend: "stable" },
    { category: "Beverages", revenue: "$8,456", percentage: 12.4, trend: "up" },
    { category: "Snacks", revenue: "$5,123", percentage: 7.5, trend: "down" },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "📈";
      case "down":
        return "📉";
      default:
        return "➡️";
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <CMSLayout
      title="Reports & Analytics"
      description="Comprehensive insights into your store's performance and trends."
    >
      <div className="space-y-6">
        {/* Export Controls */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Select defaultValue="this-month">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Export PDF</Button>
            <Button variant="outline">Export CSV</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Sales Overview */}
            <Card>
              <CardHeader>
                <CardTitle>📊 Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {salesData.map((data, index) => (
                    <div key={index} className="text-center p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">{data.period}</h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-2xl font-bold text-success">{data.revenue}</p>
                          <p className="text-xs text-muted-foreground">Revenue</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-primary">{data.orders}</p>
                          <p className="text-xs text-muted-foreground">Orders</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{data.avgOrder}</p>
                          <p className="text-xs text-muted-foreground">Avg Order</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>📈 Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <p className="text-muted-foreground">Revenue chart would be displayed here</p>
                    <p className="text-sm text-muted-foreground">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>🏆 Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-success">{product.revenue}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Product Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>📊 Product Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📈</div>
                    <p className="text-muted-foreground">Product performance chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            {/* Category Performance */}
            <Card>
              <CardHeader>
                <CardTitle>📂 Category Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryPerformance.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold">{category.category}</h3>
                          <p className="text-sm text-muted-foreground">{category.percentage}% of total sales</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-success">{category.revenue}</p>
                          <p className={`text-sm ${getTrendColor(category.trend)}`}>
                            {getTrendIcon(category.trend)} {category.trend}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>🥧 Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🥧</div>
                    <p className="text-muted-foreground">Category distribution pie chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            {/* Customer Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>👥 Customer Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">+24</div>
                    <p className="text-sm text-muted-foreground">New customers this month</p>
                    <div className="text-success text-sm mt-2">📈 +15% from last month</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🔄 Retention Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-success">78%</div>
                    <p className="text-sm text-muted-foreground">Customer retention rate</p>
                    <div className="text-success text-sm mt-2">📈 +3% from last month</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>💰 Avg Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-secondary">$21.65</div>
                    <p className="text-sm text-muted-foreground">Average order value</p>
                    <div className="text-success text-sm mt-2">📈 +$1.20 from last month</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Customer Behavior Chart */}
            <Card>
              <CardHeader>
                <CardTitle>📊 Customer Behavior Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">👥</div>
                    <p className="text-muted-foreground">Customer behavior analytics would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CMSLayout>
  );
};

export default Reports;
