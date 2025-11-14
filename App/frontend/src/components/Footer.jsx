import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Mercado Digital.png"; // Para os links de navegação

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Coluna 1: Logo */}
                <div className="footer-logo-container">
                    {/* Usamos o mesmo estilo de logo do header */}
                    <Link to="/" className="footer-logo">
                        <img src={logo} alt="Mercado Digital Logo" />
                    </Link>
                </div>

                {/* Coluna 2: Conheça-nos */}
                <div className="footer-links-column">
                    <h4>Conheça-nos</h4>
                    <ul>
                        <li><Link to="/sobre">Sobre nós</Link></li>
                        <li><Link to="/acessibilidade">Acessibilidade</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                    </ul>
                </div>

                {/* Coluna 3: Pagamento */}
                <div className="footer-links-column">
                    <h4>Pagamento</h4>
                    <ul>
                        <li><Link to="/meios-de-pagamento">Meios de Pagamento</Link></li>
                        <li><Link to="/pontos">Pagar com Pontos</Link></li>
                    </ul>
                </div>

                {/* Coluna 4: FAQ */}
                <div className="footer-links-column">
                    <h4>FAQ</h4>
                    <ul>
                        <li><Link to="/frete">Frete e Prazo</Link></li>
                        <li><Link to="/devolucoes">Devoluções e Reembolso</Link></li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}

export default Footer;