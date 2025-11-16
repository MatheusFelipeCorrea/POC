// Importa as ferramentas de teste
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Importa o componente que vamos testar
// (O caminho '../' sobe da pasta '__tests__' para a 'components')
import Notification from '../Notification';

// Descreve o conjunto de testes
describe('Componente Notification', () => {

    // Teste 1:
    it('deve renderizar a mensagem de erro corretamente', () => {
        const testMessage = 'Produto Não encontrado';

        // 1. Renderiza o componente "no ar"
        render(<Notification message={testMessage} type="error" />);

        // 2. Procura o elemento
        const messageElement = screen.getByText(testMessage);
        const notificationElement = screen.getByRole('alert'); // Procura pelo role

        // 3. Verifica (Assert)
        expect(messageElement).toBeInTheDocument();
        expect(notificationElement).toHaveClass('notification--error');
    });

    // Teste 2:
    it('deve renderizar a mensagem de sucesso corretamente', () => {
        render(<Notification message="Item adicionado!" type="success" />);

        expect(screen.getByText('Item adicionado!')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveClass('notification--success');
    });

});