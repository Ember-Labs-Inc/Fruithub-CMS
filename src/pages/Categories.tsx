
import { useState } from "react";
import { CMSLayout } from "../components/CMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { toast } from "../hooks/use-toast";

const Categories = () => {
  const [newCategory, setNewCategory] = useState({ name: "", icon: "" });

  const categories = [
    { id: 1, name: "Fruits", productCount: 45, icon: "🍎" },
    { id: 2, name: "Vegetables", productCount: 62, icon: "🥕" },
    { id: 3, name: "Dairy", productCount: 28, icon: "🥛" },
    { id: 4, name: "Meat", productCount: 34, icon: "🥩" },
    { id: 5, name: "Bakery", productCount: 19, icon: "🍞" },
    { id: 6, name: "Snacks", productCount: 87, icon: "🍪" },
    { id: 7, name: "Beverages", productCount: 52, icon: "🥤" },
    { id: 8, name: "Frozen", productCount: 31, icon: "🧊" },
  ];

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast({
        title: "Error",
        description: "Please enter a category name.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Category Added",
      description: `${newCategory.name} category has been created successfully.`,
    });

    setNewCategory({ name: "", icon: "" });
  };

  return (
    <CMSLayout
      title="Category Management"
      description="Organize your products into categories for better navigation."
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-hover">
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="categoryName">Category Name *</Label>
                  <Input
                    id="categoryName"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <Label htmlFor="categoryIcon">Icon (Emoji)</Label>
                  <Input
                    id="categoryIcon"
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                    placeholder="🍎"
                  />
                </div>
                <Button onClick={handleAddCategory} className="w-full bg-primary hover:bg-primary-hover">
                  Add Category
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-2">{category.icon}</div>
                <CardTitle className="text-xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">{category.productCount}</p>
                    <p className="text-sm text-muted-foreground">Products</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Category Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Total Categories</div>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">358</div>
                <div className="text-sm text-muted-foreground">Total Products</div>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-secondary">87</div>
                <div className="text-sm text-muted-foreground">Largest Category</div>
              </div>
              <div className="text-center p-4 bg-info/10 rounded-lg">
                <div className="text-2xl font-bold text-info">45</div>
                <div className="text-sm text-muted-foreground">Average per Category</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
};

export default Categories;
