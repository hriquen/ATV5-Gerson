import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Produto {
  nome: string;
  preco: number;
}

const EditarProduto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Produto>({
    nome: "",
    preco: 0,
  });

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/produtos/${id}`);
        setProduto(response.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProduto();
  }, [id]);

  const handleAtualizarProduto = async () => {
    try {
      await axios.put(`http://localhost:5000/atualizar-produto/${id}`, produto);
      alert("Produto/Serviço atualizado com sucesso!");
      navigate("/listar-produtos");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar Produto/Serviço</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAtualizarProduto();
        }}
      >
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome:
          </label>
          <input
            id="nome"
            type="text"
            name="nome"
            className="form-control"
            value={produto.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="preco" className="form-label">
            Preço:
          </label>
          <input
            id="preco"
            type="number"
            name="preco"
            className="form-control"
            value={produto.preco}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Atualizar Produto/Serviço
        </button>
      </form>
    </div>
  );
};

export default EditarProduto;
