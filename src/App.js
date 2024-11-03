// src/App.js
import React, { useState } from 'react';
import ClienteForm from './componentes/ClienteForm.js';
import FormPedido from './componentes/PedidoForm.js';


import ListaPedidos from './tabelas/tabelapedido.js';

function App() {
    const [pedidoVisualizado, setPedidoVisualizado] = useState(null);

    const [atualizar, setAtualizar] = useState(false);

    const atualizarTabela = () => setAtualizar(!atualizar);

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

    const handleCadastroPedido = async (pedido) => {
        try {
            const response = await fetch('http://localhost:4000/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pedido),
            });
            const result = await response.json();
            alert(result.mensagem || 'Pedido cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar pedido:', error);
            alert('Erro ao cadastrar pedido.');
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
            <FormPedido onCadastro={handleCadastroPedido} onVisualizar={setPedidoVisualizado}/>
            <ListaPedidos onVisualizar={setPedidoVisualizado} onAtualizar={atualizarTabela} />
        
        </div>
    );
}

export default App;
