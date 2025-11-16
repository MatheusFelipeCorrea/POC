import React from 'react';
import { Link } from 'react-router-dom'; // Para os links de navegação
import { ShoppingCart, User } from 'lucide-react'; // Ícones
import logo from '../assets/Mercado Digital.png';

function Header() {
    return (
        <header className="header">
            <div className="header-container">
                {/* Logo que também é um link para a Home */}
                <Link to="/" className="header-logo">
                    <img src={logo} alt="Mercado Digital Logo" />
                </Link>

                {/* Ícones de navegação */}
                <div className="header-icons">
                    <Link to="/cart" title="Carrinho">
                        <ShoppingCart className="header-icon" size={24} />
                    </Link>
                    <Link to="/profile" title="Perfil">
                        <User className="header-icon" size={24} />
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;