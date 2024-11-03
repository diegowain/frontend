import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

export default function ListaPedidos({ atualizarTabela }) {
    const [pedidos, setPedidos] = useState([]);

    const carregarPedidos = async () => {
        try {
            const response = await fetch("http://localhost:4000/pedido", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                const data = await response.json();
                setPedidos(data.listaPedidos);
            } else {
                console.error("Erro ao carregar os pedidos.");
            }
        } catch (error) {
            console.error("Erro ao carregar os pedidos:", error);
        }
    };

    const excluirPedido = async (codigo) => {
        if (window.confirm("Tem certeza de que deseja excluir este pedido?")) {
            try {
                const response = await fetch(`http://localhost:4000/pedido/${codigo}`, {
                    method: "DELETE"
                });
                if (response.ok) {
                    alert("Pedido excluído com sucesso!");
                    carregarPedidos();
                    atualizarTabela();
                } else {
                    alert("Erro ao excluir o pedido.");
                }
            } catch (error) {
                console.error("Erro ao excluir o pedido:", error);
            }
        }
    };

    useEffect(() => {
        carregarPedidos();
    }, []);

    return (
        <div>
            <h3>Lista de Pedidos</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Cliente ID</th>
                        <th>Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido) => (
                        <tr key={pedido.codigo}>
                            <td>{pedido.codigo}</td>
                            <td>{pedido.cliente_id}</td>
                            <td>{pedido.total}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => excluirPedido(pedido.codigo)}
                                >
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
