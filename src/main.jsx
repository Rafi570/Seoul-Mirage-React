import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from './routes/Router.js';
import { RouterProvider } from "react-router/dom";
import AuthProvider from './contexts/AuthProvider.jsx';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
      </AuthProvider>
  </StrictMode>
)
