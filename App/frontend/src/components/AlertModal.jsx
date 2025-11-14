import React from 'react';
// Importa os ícones que vamos usar
import { AlertTriangle, CheckCircle } from 'lucide-react';

/**
 * Um componente de Modal de Alerta reutilizável.
 * @param {string} message - A mensagem a ser exibida.
 * @param {string} type - 'warning' (amarelo) ou 'success' (verde)
 * @param {function} onClose - Função chamada ao fechar o modal (clicar em OK)
 */
function AlertModal({ message, type, onClose }) {

    // Define o ícone e a cor do botão com base no 'type'
    let IconComponent;
    let buttonClass;

    if (type === 'warning') {
        IconComponent = AlertTriangle;
        buttonClass = 'modal-button--warning';
    } else { // Padrão é 'success'
        IconComponent = CheckCircle;
        buttonClass = 'modal-button--success';
    }

    return (
        // O Fundo escuro (overlay)
        <div className="modal-overlay">
            {/* O conteúdo do Modal */}
            <div className="modal-content">
                {/* Ícone */}
                <div className={`modal-icon modal-icon--${type}`}>
                    <IconComponent size={48} />
                </div>

                {/* Mensagem */}
                <p className="modal-message">{message}</p>

                {/* Botão OK */}
                <button
                    onClick={onClose}
                    className={`modal-button ${buttonClass}`}
                >
                    OK
                </button>
            </div>
        </div>
    );
}

export default AlertModal;