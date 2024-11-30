import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListarProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  const handleDeletarProduto = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/deletar-produto/${id}`);
      setProdutos(produtos.filter(produto => produto.id !== id));
      alert("Produto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      alert("Erro ao deletar produto.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Produtos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>R$ {(Number(produto.preco) || 0).toFixed(2)}</td>
              <td>
                <Link to={`/editar-produto/${produto.id}`} className="btn btn-primary btn-sm me-2">
                  Editar
                </Link>
                <button
                  onClick={() => handleDeletarProduto(produto.id)}
                  className="btn btn-danger btn-sm"
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarProdutos;
