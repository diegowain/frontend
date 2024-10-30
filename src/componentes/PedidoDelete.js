// src/componentes/PedidoDelete.js
import React, { useState } from 'react';

const PedidoDelete = ({ onExcluir }) => {
    const [pedidoId, setPedidoId] = useState('');

    const handleExcluir = () => {
        onExcluir(pedidoId);
        setPedidoId('');
    };

    return (
        <div>
            <h2>Exclusão de Pedido</h2>
            <input
                type="text"
                placeholder="Pedido ID"
                value={pedidoId}
                onChange={(e) => setPedidoId(e.target.value)}
            />
            <button onClick={handleExcluir}>Excluir Pedido</button>
        </div>
    );
};

export default PedidoDelete;
