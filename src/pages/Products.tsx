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
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "../hooks/use-toast";
import api from "../utils/api";
import { useReduxCategories } from "../hooks/useReduxCategory";
import { useReduxProducts } from "../hooks/useReduxProduct";
import { useReduxAuth } from "../hooks/useReduxAuth";
import { Uploader } from "../components/ui/uploader";

const Products = () => {
  const { user } = useReduxAuth();
  const { categories, reload } = useReduxCategories();
  const { products } = useReduxProducts(); // Assuming you have a hook to fetch products
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    slug: "",
    categoryId: "",
    price: "",
    stock: "",
    description: "",
    images: "",
    status: "active",
  });

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoryId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImageUrl = (path: string) => {
    const baseUrl = import.meta.env.VITE_BASE_URL.replace(/\/api\/v1\/?$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${normalizedPath}`;
  };

  function generateUniqueSlug(title: string): string {
    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    return `${baseSlug}-${Date.now()}`; // or use nanoid() for randomness
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success text-white";
      case "low_stock":
        return "bg-secondary text-secondary-foreground";
      case "out_of_stock":
        return "bg-destructive text-white";
      default:
        return "bg-zinc-200 text-muted-foreground";
    }
  };

  const handleAddProduct = async () => {
    if (!user) {
      toast({ title: "User not authenticated", variant: "destructive" });
      return;
    }

    try {
      const payload = {
        title: newProduct.title,
        slug: generateUniqueSlug(newProduct.title),
        categoryId: newProduct.categoryId,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        description: newProduct.description,
        images: newProduct.images
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean),
        status: newProduct.status,
        createdById: user.id,
      };

      const res = await api.post("/products", payload);
      setDialogOpen(false);
      toast({ title: "Product added successfully", variant: "successful" });
      reload();
    } catch (err) {
      toast({ title: "Failed to add product", variant: "destructive" });
    }
  };

  return (
    <CMSLayout
      title="Product Management"
      description="Manage your grocery store inventory and products."
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Import CSV</Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-primary hover:bg-primary-hover"
                  onClick={() => setDialogOpen(true)}
                >
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Product Title *</Label>
                    <Input
                      id="title"
                      value={newProduct.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setNewProduct((prev) => ({
                          ...prev,
                          title,
                          slug: generateUniqueSlug(title),
                        }));
                      }}
                      placeholder="Enter product title"
                      className="bg-zinc-200"
                    />
                  </div>

                  {/* Category Select */}
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={newProduct.categoryId}
                      onValueChange={(value) =>
                        setNewProduct({ ...newProduct, categoryId: value })
                      }
                    >
                      <SelectTrigger className="bg-zinc-200">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name} {category.image}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price and Stock */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                        placeholder="UGX.0.00"
                        className="bg-zinc-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            stock: e.target.value,
                          })
                        }
                        placeholder="0"
                        className="bg-zinc-200"
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newProduct.status}
                      onValueChange={(value) =>
                        setNewProduct({ ...newProduct, status: value })
                      }
                    >
                      <SelectTrigger className="bg-zinc-200">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                        <SelectItem value="low_stock">Low Stock</SelectItem>
                        <SelectItem value="out_of_stock">
                          Out of Stock
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      placeholder="Product description..."
                      className="bg-zinc-200"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label htmlFor="image">Product Image *</Label>
                    <Uploader
                      onUploaded={(path) =>
                        setNewProduct({ ...newProduct, images: path })
                      }
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    onClick={handleAddProduct}
                    className="w-full bg-primary hover:bg-primary-hover"
                  >
                    Add Product
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="w-full h-40 overflow-hidden rounded-md">
                    <img
                      src={getImageUrl(product.images[0])}
                      alt={product.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                  <Badge className={getStatusColor(product.status)}>
                    {product.status.replace("_", " ")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{product.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {categories.find((cat) => cat.id === product.categoryId)
                      ?.name || "Unknown"}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">
                      UGX {product.price.toLocaleString()}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-2">
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

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                No products found matching your search.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </CMSLayout>
  );
};

export default Products;
