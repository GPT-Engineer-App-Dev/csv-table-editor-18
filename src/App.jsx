import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FileText, ShoppingCart } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/sidebar"; // Use sidebar layout
import Index from "./pages/Index.jsx";
import ShoppingCartPage from "./pages/ShoppingCart.jsx"; // Import the new ShoppingCart component
const queryClient = new QueryClient();

export const navItems = [
  {
    title: "CSV Tool",
    to: "/",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Shopping Cart",
    to: "/shopping-cart",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="shopping-cart" element={<ShoppingCartPage />} /> {/* Add the new route */}
              {/* Add more routes here as needed */}
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
