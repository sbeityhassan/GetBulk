import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Register from './pages/register.js';
import Login from './pages/login.js';
import Dashboard from './pages/dashboard.js';
import Products from './pages/products.js';
import ForgotPassword from './pages/ForgotPassword.js';
import ResetPassword from './pages/ResetPassword.js';
import Hero from './pages/Hero.jsx';
import MainLayout from './pages/MainLayout.jsx';


import Home from './pages/Home.js';
import ProductDetails from './pages/ProductDetails.js';
import { ProductProvider } from './pages/ProductContext.js'; 
import { CartProvider } from './pages/CartContext.js';
import SidebarProvider from './pages/SidebarContext.js';
import Sidebar from './pages/Sidebar.js';

function Layout() {
  return (
    
      <>
        
        
        <Outlet />
        
        <BrowserRouter>
           <ProductProvider> 
            <SidebarProvider>
             <CartProvider>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route index element={<Hero />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
            <Route path="/Hero" element={<Hero />} />
            
            <Route path="/produ" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
          </Routes>
          <Sidebar />
          </CartProvider>
          </SidebarProvider>

          </ProductProvider>

        </BrowserRouter>
        
      </>
      
  );
}

export default Layout;