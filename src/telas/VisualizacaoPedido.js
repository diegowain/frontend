// src/telas/VisualizacaoPedido.js
import React, { useState } from 'react';
import PedidoView from '../componentes/PedidoView.js';

const VisualizacaoPedido = () => {
    const [reload, setReload] = useState(false);

    const handleDelete = () => setReload(!reload);

    return (
        <div>
            <h1>Visualização de Pedidos</h1>
            <PedidoView onDelete={handleDelete} />
        </div>
    );
};

export default VisualizacaoPedido;
