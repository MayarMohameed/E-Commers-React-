import './App.css';
import Home from './components/Home/Home.jsx';
import Brands from './components/Brands/Brands.jsx';
import Register from './components/Register/Register.jsx';
import Layout from './components/Layout/Layout.jsx';
import Login from './components/LogIn/LogIn.jsx';
import Catogary from './components/Catogary/Catogary.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import Cart from './components/Cart/Cart.jsx';
import Products from './components/Products/Products.jsx';
import ProductDetailes from './components/ProductDetailes/ProductDetailes.jsx';
import { CounterContextProvider } from './Context/CounterContext.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { CartContextProvider } from './Context/CartContext.jsx';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'productdetailes/:id',
        element: <ProductDetailes />,
      },
      {
        path: 'catogary',
        element: <Catogary />,
      },
      {
        path: 'brands',
        element: <Brands />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <CartContextProvider>
      <QueryClientProvider client={queryClient}>
        <CounterContextProvider>
          <RouterProvider router={router} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#0f172a',
                color: '#fff',
                fontSize: '13px',
                fontWeight: '600',
                borderRadius: '12px',
                padding: '12px 16px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </CounterContextProvider>
      </QueryClientProvider>
    </CartContextProvider>
  );
}

export default App;
