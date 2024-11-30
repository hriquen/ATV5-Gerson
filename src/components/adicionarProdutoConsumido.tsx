import React, { useState, useEffect } from "react";
import axios from "axios";

const AdicionarProdutoConsumido: React.FC = () => {
  const [clientes, setClientes] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [clienteId, setClienteId] = useState<number>(0);
  const [produtoId, setProdutoId] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(0);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/clientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchClientes();
    fetchProdutos();
  }, []);

  const handleAdicionarProdutoConsumido = async () => {
    try {
      await axios.post("http://localhost:5000/adicionar-produto-consumido", {
        cliente_id: clienteId,
        produto_id: produtoId,
        quantidade,
      });
      alert("Produto/Serviço consumido adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar produto consumido:", error);
      alert("Erro ao adicionar produto consumido.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Adicionar Produto/Serviço Consumido</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdicionarProdutoConsumido();
        }}
      >
        <div className="mb-3">
          <label htmlFor="cliente" className="form-label">
            Cliente:
          </label>
          <select
            id="cliente"
            className="form-select"
            value={clienteId}
            onChange={(e) => setClienteId(Number(e.target.value))}
            required
          >
            <option value={0}>Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="produto" className="form-label">
            Produto:
          </label>
          <select
            id="produto"
            className="form-select"
            value={produtoId}
            onChange={(e) => setProdutoId(Number(e.target.value))}
            required
          >
            <option value={0}>Selecione um produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="quantidade" className="form-label">
            Quantidade:
          </label>
          <input
            id="quantidade"
            type="number"
            className="form-control"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            min="1"
            required
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Adicionar Produto/Serviço Consumido
        </button>
      </form>
    </div>
  );
};

export default AdicionarProdutoConsumido;
