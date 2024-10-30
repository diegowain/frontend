// src/componentes/PedidoForm.js
import React, { useState } from 'react';

const PedidoForm = ({ onPedido }) => {
    const [clienteId, setClienteId] = useState('');
    const [itens, setItens] = useState([{ produtoId: '', quantidade: 1 }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onPedido({ clienteId, itens });
        setClienteId('');
        setItens([{ produtoId: '', quantidade: 1 }]);
    };

    const handleItemChange = (index, field, value) => {
        const newItens = [...itens];
        newItens[index][field] = value;
        setItens(newItens);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Realização de Pedido</h2>
            <input
                type="text"
                placeholder="Cliente ID"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                required
            />
            {itens.map((item, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Produto ID"
                        value={item.produtoId}
                        onChange={(e) => handleItemChange(index, 'produtoId', e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Quantidade"
                        value={item.quantidade}
                        onChange={(e) => handleItemChange(index, 'quantidade', e.target.value)}
                        required
                    />
                </div>
            ))}
            <button type="submit">Realizar Pedido</button>
        </form>
    );
};

export default PedidoForm;
