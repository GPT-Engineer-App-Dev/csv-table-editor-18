import React from "react";
import { useShoppingCarts } from "@/integrations/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ShoppingCart = () => {
  const { data: shoppingCarts, error, isLoading } = useShoppingCarts();

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
    return <div className="container mx-auto p-4">Error loading shopping cart</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shoppingCarts.map((cartItem) => (
          <Card key={cartItem.id}>
            <CardHeader>
              <CardTitle>Product ID: {cartItem.product_id}</CardTitle>
              <CardDescription>Quantity: {cartItem.quantity}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">User ID: {cartItem.user_id}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;