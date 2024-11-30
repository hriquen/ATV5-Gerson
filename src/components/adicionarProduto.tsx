import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Produto {
  nome: string;
  preco: number;
}

const AdicionarProduto: React.FC = () => {
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Produto>({
    nome: "",
    preco: 0,
  });

  const handleAdicionarProduto = async () => {
    try {
      await axios.post("http://localhost:5000/adicionar-produto", produto);
      alert("Produto/Serviço adicionado com sucesso!");
      navigate("/listar-produtos");
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      alert("Erro ao adicionar produto.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduto((prevState) => ({
      ...prevState,
      [name]: name === "preco" ? parseFloat(value) : value, 
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Adicionar Produto/Serviço</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAdicionarProduto(); }}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="preco" className="form-label">Preço</label>
          <input
            type="number"
            className="form-control"
            id="preco"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Adicionar Produto
        </button>
      </form>
    </div>
  );
};

export default AdicionarProduto;
