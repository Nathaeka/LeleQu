import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Public Layout & Pages
import { PublicLayout } from './layouts/PublicLayout';
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ProductsPage } from './pages/public/ProductsPage';
import { OrderPage } from './pages/public/OrderPage';
import { ArticlesPage } from './pages/public/ArticlesPage';
import { ContactPage } from './pages/public/ContactPage';

// Admin Layout & Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './layouts/AdminLayout';
import { DashboardOverview } from './pages/admin/DashboardOverview';
import { ManageProducts } from './pages/admin/ManageProducts';
import { ManageArticles } from './pages/admin/ManageArticles';
import { ManageSettings } from './pages/admin/ManageSettings';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Dashboard Routes (Protected) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="articles" element={<ManageArticles />} />
            <Route path="settings" element={<ManageSettings />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
