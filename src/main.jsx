// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@mantine/carousel/styles.css'; 
import { CustomerAuthProvider } from './context/CustomerAuthContext';
import { CartProvider } from './context/CartContext';
import App from './App.jsx';

import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { Toaster } from 'react-hot-toast';

const theme = createTheme({
  fontFamily: '"Plus Jakarta Sans", sans-serif',
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* === PERBAIKAN UTAMA DI SINI === */}
    {/* Tambahkan basename agar Router sadar ia ada di dalam folder hmsfrontend */}
    <BrowserRouter basename="/hmsfrontend">
    {/* =============================== */}
    
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Toaster position="top-right" />
        <CustomerAuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CustomerAuthProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);