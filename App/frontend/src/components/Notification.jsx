import React from 'react';
// 1. Importa os novos ícones para 'warning' (aviso) e 'success' (sucesso)
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

/**
 * Um componente de notificação reutilizável.
 * @param {string} message - A mensagem a ser exibida.
 * @param {string} type - 'error' (vermelho), 'warning' (amarelo), 'success' (verde)
 */
function Notification({ message, type = 'error' }) {

    // 2. Função para renderizar o ícone correto baseado no tipo
    const renderIcon = () => {
        switch (type) {
            case 'error':
                return <AlertCircle size={28} className="notification__icon" />;
            case 'warning':
                return <AlertTriangle size={28} className="notification__icon" />;
            case 'success':
                return <CheckCircle size={28} className="notification__icon" />;
            default:
                // Padrão para 'error' se o tipo for desconhecido
                return <AlertCircle size={28} className="notification__icon" />;
        }
    };

    return (
        // 3. ADICIONA O "role" (Acessibilidade e Teste)
        <div
            className={`notification notification--${type}`}
            role="alert"
        >
            {renderIcon()} {/* Renderiza o ícone dinâmico */}
            <span className="notification__text">{message}</span>
        </div>
    );
}

export default Notification;