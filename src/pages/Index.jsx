import React from "react";
import { useProducts, useAddShoppingCart } from "@/integrations/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Index = () => {
  const addShoppingCart = useAddShoppingCart();

  const handleAddToCart = (productId) => {
    addShoppingCart.mutate(
      { product_id: productId, quantity: 1, user_id: "user-id-placeholder" }, // Replace with actual user ID
      {
        onSuccess: () => {
          toast("Product added to cart");
        },
        onError: () => {
          toast("Failed to add product to cart");
        },
      }
    );
  };
  const { data: products, error, isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="w-full h-10 mb-4" />
        <Skeleton className="w-full h-10 mb-4" />
        <Skeleton className="w-full h-10 mb-4" />
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto p-4">Error loading products</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-4" />
              <p className="text-lg font-semibold">${product.price}</p>
              <Button onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;