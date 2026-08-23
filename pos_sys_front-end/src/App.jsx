import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layouts/Layout.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";

import { CartProvider } from "./context/CartContext.jsx";

import { ToastProvider } from "./components/Common/Toast.jsx";

import ProtectedRoute from "./components/Common/ProtectedRoute.jsx";

import Dashboard from "./Pages/Dashboard/dashboard.jsx";

import POS from "./Pages/POS/pos.jsx";

import Products from "./Pages/products/Products.jsx";

import AddProduct from "./Pages/products/AddProduct.jsx";

import EditProduct from "./Pages/products/EdithProducts.jsx";

import Orders from "./Pages/Orders/Orders.jsx";

import OrderDetailsPage from "./Pages/Orders/OrderDetails.jsx";

import Reports from "./Pages/Reports/Reports.jsx";

import SalesReport from "./Pages/Reports/SalesReport.jsx";

import ProductReport from "./Pages/Reports/ProductReport.jsx";

import "./App.css";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Sell" element={<POS />} />
              <Route path="/products" element={<Products />} />
              <Route
                path="/products/add"
                element={
                  <ProtectedRoute>
                    <AddProduct />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/products/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditProduct />
                  </ProtectedRoute>
                }
              />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetailsPage />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/sales" element={<SalesReport />} />
              <Route path="/reports/products" element={<ProductReport />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
