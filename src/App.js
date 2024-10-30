// src/App.js
import React, { useState } from 'react';
import ClienteForm from './componentes/ClienteForm.js';
import PedidoForm from './componentes/PedidoForm.js';
import PedidoView from './componentes/PedidoView.js';
import PedidoDelete from './componentes/PedidoDelete.js';

function App() {
    const [pedidoVisualizado, setPedidoVisualizado] = useState(null);

    const handleCadastroCliente = async (cliente) => {
        try {
            const response = await fetch('http://localhost:4000/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente),
            });
            const result = await response.json();
            alert(result.mensagem || 'Cliente cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            alert('Erro ao cadastrar cliente.');
        }
    };

    const handleRealizarPedido = async (pedido) => {
        try {
            const response = await fetch('http://localhost:4000/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pedido),
            });
            const result = await response.json();
            alert(result.mensagem || 'Pedido realizado com sucesso!');
        } catch (error) {
            console.error('Erro ao realizar pedido:', error);
            alert('Erro ao realizar pedido.');
        }
    };

    const handleVisualizarPedido = async (pedidoId) => {
        try {
            const response = await fetch(`http://localhost:4000/pedido/${pedidoId}`);
            const result = await response.json();
            if (response.ok) {
                setPedidoVisualizado(result.pedido);
            } else {
                alert(result.mensagem || 'Pedido não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao visualizar pedido:', error);
            alert('Erro ao visualizar pedido.');
        }
    };

    const handleExcluirPedido = async (pedidoId) => {
        try {
            const response = await fetch(`http://localhost:4000/pedido/${pedidoId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            alert(result.mensagem || 'Pedido excluído com sucesso!');
            if (pedidoVisualizado && pedidoVisualizado.id === pedidoId) {
                setPedidoVisualizado(null);
            }
        } catch (error) {
            console.error('Erro ao excluir pedido:', error);
            alert('Erro ao excluir pedido.');
        }
    };

    return (
        <div>
            <h1>Sistema de Gestão de Pedidos</h1>
            <ClienteForm onCadastro={handleCadastroCliente} />
            <PedidoForm onPedido={handleRealizarPedido} />
            <PedidoView pedido={pedidoVisualizado} onVisualizar={handleVisualizarPedido} />
            <PedidoDelete onExcluir={handleExcluirPedido} />
        </div>
    );
}

export default App;
