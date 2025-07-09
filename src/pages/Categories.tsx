import { useState } from "react";
import { CMSLayout } from "../components/CMSLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { toast } from "../hooks/use-toast";
import api from "../utils/api";
import { Textarea } from "../components/ui/textarea";
import { useReduxCategories } from "../hooks/useReduxCategory";
import { useReduxStats } from "../hooks/useReduxStats";
import { Skeleton } from "../components/ui/skeleton";

const Categories = () => {
  const { categoryStats } = useReduxStats();
  const { categories, loading, reload } = useReduxCategories();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [newCategory, setNewCategory] = useState({
    name: "",
    image: "", // if you enable image later
    description: "", // if you add description later
  });

  // const categories = [
  //   { id: 1, name: "Fruits", productCount: 45, icon: "🍎" },
  //   { id: 2, name: "Vegetables", productCount: 62, icon: "🥕" },
  //   { id: 3, name: "Dairy", productCount: 28, icon: "🥛" },
  //   { id: 4, name: "Meat", productCount: 34, icon: "🥩" },
  //   { id: 5, name: "Bakery", productCount: 19, icon: "🍞" },
  //   { id: 6, name: "Snacks", productCount: 87, icon: "🍪" },
  //   { id: 7, name: "Beverages", productCount: 52, icon: "🥤" },
  //   { id: 8, name: "Frozen", productCount: 31, icon: "🧊" },
  // ];

  const handleAddCategory = async () => {
    try {
      const res = await api.post("/categories", {
        name: newCategory.name,
        image: newCategory.image,
        description: newCategory.description,
      });
      setDialogOpen(false);
      toast({ title: "Category added successfully", variant: "successful" });
      reload();
    } catch (error) {
      toast({ title: "Error adding category", variant: "destructive" });
    }
  };

  return (
    <CMSLayout
      title="Category Management"
      description="Organize your products into categories for better navigation."
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-primary hover:bg-primary-hover"
                onClick={() => setDialogOpen(true)}
              >
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <Label htmlFor="categoryName">Category Name *</Label>
                  <Input
                    id="categoryName"
                    value={newCategory.name}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, name: e.target.value })
                    }
                    placeholder="Enter category name"
                    className="bg-zinc-200"
                  />
                </div>

                {/* Image (emoji or string icon) */}
                <div>
                  <Label htmlFor="categoryImage">
                    Image (Emoji or Shortcode)
                  </Label>
                  <Input
                    id="categoryImage"
                    value={newCategory.image}
                    onChange={(e) =>
                      setNewCategory({ ...newCategory, image: e.target.value })
                    }
                    placeholder="🍎 or 'fruit-icon'"
                    className="bg-zinc-200"
                  />
                </div>

                {/* Optional: Category description */}
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCategory.description}
                    onChange={(e) =>
                      setNewCategory({
                        ...newCategory,
                        description: e.target.value,
                      })
                    }
                    placeholder="Category description..."
                    className="bg-zinc-200"
                  />
                </div>

                <Button
                  onClick={handleAddCategory}
                  className="w-full bg-primary hover:bg-primary-hover"
                >
                  Add Category
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-4 space-y-4">
                <Skeleton className="h-16 w-16 mx-auto rounded-full" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
                <div className="space-y-2 pt-4">
                  <Skeleton className="h-6 w-1/2 mx-auto" />
                  <Skeleton className="h-3 w-1/3 mx-auto" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 flex-1" />
                    <Skeleton className="h-8 flex-1" />
                  </div>
                </div>
              </Card>
            ))
          ) : categories.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground text-sm">
              There are no categories.
            </div>
          ) : (
            categories.map((category) => (
              <Card
                key={category.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-2">{category.image}</div>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        {category.productCount}
                      </p>
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
            ))
          )}
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Category Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {categoryStats.totalCategories}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Categories
                </div>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">
                  {categoryStats.totalProducts}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Products
                </div>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-lg">
                <div className="text-2xl font-bold text-secondary">
                  {categoryStats.largestCategory.productCount}
                </div>
                <div className="text-sm text-muted-foreground">
                  Largest Category
                </div>
              </div>
              <div className="text-center p-4 bg-info/10 rounded-lg">
                <div className="text-2xl font-bold text-info">
                  {categoryStats.averagePerCategory}
                </div>
                <div className="text-sm text-muted-foreground">
                  Average per Category
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CMSLayout>
  );
};

export default Categories;
