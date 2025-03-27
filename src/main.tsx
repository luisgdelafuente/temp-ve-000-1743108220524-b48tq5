import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import './i18n/config.ts';
import App from './App.tsx';
import About from './pages/About.tsx';
import Login from './pages/admin/Login.tsx';
import Leads from './pages/admin/Leads.tsx';
import Glossary from './pages/admin/Glossary.tsx';
import { AdminLayout } from './components/AdminLayout.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import GlossaryLayout from './pages/glosario/Layout.tsx';
import GlossaryIndex from './pages/glosario/Index.tsx';
import GlossaryTerm from './pages/glosario/GlossaryTerm.tsx';
import './index.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found. Failed to mount React application.');
}

createRoot(root).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/nosotros/" element={<About />} />
          <Route path="/admin/" element={<Navigate to="/admin/leads/" replace />} />
          <Route path="/admin/login/" element={<Login />} />
          <Route 
            path="/admin/leads/" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Leads />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/glossary/" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Glossary />
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          <Route path="/glosario/" element={<GlossaryLayout />}>
            <Route index element={<GlossaryIndex />} />
            <Route path=":slug/" element={<GlossaryTerm />} />
          </Route>
          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </HelmetProvider>
  </StrictMode>
);