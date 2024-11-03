import { useState } from "react";
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import "./estilo.css"
export default function FormPedido({ atualizarTabela }) {
    const [pedido, setPedido] = useState({
        cliente_id: "",
        total: 0,
        itens: [{ produtoId: "", quantidade: 1 }]
    });

    const manipularMudanca = (e) => {
        const { name, value } = e.target;
        setPedido(prev => ({ ...prev, [name]: value }));
    };

    const adicionarItem = () => {
        setPedido(prev => ({
            ...prev,
            itens: [...prev.itens, { produtoId: "", quantidade: 1 }]
        }));
    };

    const removerItem = (index) => {
        setPedido(prev => ({
            ...prev,
            itens: prev.itens.filter((_, i) => i !== index)
        }));
    };

    const manipularMudancaItem = (index, campo, valor) => {
        const novosItens = pedido.itens.map((item, i) =>
            i === index ? { ...item, [campo]: valor } : item
        );
        setPedido(prev => ({ ...prev, itens: novosItens }));
    };

    const manipulaSubmissao = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/pedido", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pedido)
            });
            if (response.ok) {
                alert("Pedido cadastrado com sucesso!");
                atualizarTabela();
            } else {
                alert("Erro ao cadastrar o pedido.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar o pedido:", error);
        }
    };

    return (
        <Form onSubmit={manipulaSubmissao}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Cliente ID</Form.Label>
                    <Form.Control
                        type="number"
                        name="cliente_id"
                        value={pedido.cliente_id}
                        onChange={manipularMudanca}
                        required
                    />
                </Form.Group>
            </Row>
            
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Total do Pedido</Form.Label>
                    <Form.Control
                        type="number"
                        name="total"
                        value={pedido.total}
                        onChange={manipularMudanca}
                        required
                    />
                </Form.Group>  
            </Row>
            <Container className="border p-3">
                <h5>Itens do Pedido</h5>
                {pedido.itens.map((item, index) => (
                    <Row key={index} className="mb-3">
                        <Col md="5">
                            <Form.Control
                                type="number"
                                placeholder="ID do Produto"
                                value={item.produtoId}
                                onChange={(e) => manipularMudancaItem(index, "produtoId", e.target.value)}
                                required
                            />
                        </Col>
                        <Col md="3">
                            <Form.Control
                                type="number"
                                placeholder="Quantidade"
                                value={item.quantidade}
                                onChange={(e) => manipularMudancaItem(index, "quantidade", e.target.value)}
                                required
                            />
                        </Col>
                        <Col md="2">
                            <Button variant="danger" onClick={() => removerItem(index)}>Remover</Button>
                        </Col>
                    </Row>
                ))}
                <Button variant="secondary" onClick={adicionarItem}>Adicionar Item</Button>
            </Container>
            <Button type="submit" className="mt-3">Cadastrar Pedido</Button>
        </Form>
        
    );
}

