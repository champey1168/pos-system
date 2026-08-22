import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "@/layouts/MainLayout";

const Dashboard = lazy(() => import("@/views/Dashboard"));
const Contacts = lazy(() => import("@/views/Contacts"));
const Companies = lazy(() => import("@/views/Companies"));
const Deals = lazy(() => import("@/views/Deals"));
const Tasks = lazy(() => import("@/views/Tasks"));
const Reports = lazy(() => import("@/views/Reports"));
const Billing = lazy(() => import("@/views/Billing"));
const Settings = lazy(() => import("@/views/Settings"));

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
