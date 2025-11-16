import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Componentes e Páginas
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DetailsPage from './pages/DetailsPage';
import CartPage from './pages/CartPage';
import SearchPage from './pages/SearchPage';


import { CartProvider } from './context/CartContext';

function App() {
    return (
        <CartProvider>
            <div className="app-container">
                <Header />

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/product/:id" element={<DetailsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/search" element={<SearchPage />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </CartProvider>
    );
}

export default App;