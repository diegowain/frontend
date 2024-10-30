// src/componentes/PedidoView.js
import React, { useState } from 'react';

const PedidoView = ({ pedido, onVisualizar }) => {
    const [pedidoId, setPedidoId] = useState('');

    const handleVisualizar = () => {
        onVisualizar(pedidoId);
    };

    return (
        <div>
            <h2>Visualização de Pedido</h2>
            <input
                type="text"
                placeholder="Pedido ID"
                value={pedidoId}
                onChange={(e) => setPedidoId(e.target.value)}
            />
            <button onClick={handleVisualizar}>Visualizar Pedido</button>
            {pedido && (
                <div>
                    <h3>Pedido ID: {pedido.id}</h3>
                    <p>Cliente ID: {pedido.cliente_id}</p>
                    <p>Status: {pedido.status}</p>
                    <p>Itens:</p>
                    <ul>
                        {pedido.itens.map((item, index) => (
                            <li key={index}>
                                Produto ID: {item.produtoId}, Quantidade: {item.quantidade}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PedidoView;
