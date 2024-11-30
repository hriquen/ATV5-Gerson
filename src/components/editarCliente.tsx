import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Cliente {
  nome: string;
  nomeSocial: string;
  cpf: string;
  telefone: string;
  endereco: string;
}

const EditarCliente: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate(); 
  const [cliente, setCliente] = useState<Cliente>({
    nome: "",
    nomeSocial: "",
    cpf: "",
    telefone: "",
    endereco: "",
  });

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/clientes/${id}`);
        if (response.status === 200) {
          setCliente(response.data);
        } else {
          alert("Cliente não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      }
    };

    fetchCliente();
  }, [id]);

 
  const handleAtualizarCliente = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/atualizar-cliente/${id}`, cliente);
      if (response.status === 200) {
        alert("Cliente atualizado com sucesso!");
        navigate("/listar-clientes"); 
      } else {
        alert("Erro ao atualizar cliente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prevState: Cliente) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar Cliente</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAtualizarCliente();
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
            value={cliente.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nomeSocial" className="form-label">
            Nome Social:
          </label>
          <input
            id="nomeSocial"
            type="text"
            name="nomeSocial"
            className="form-control"
            value={cliente.nomeSocial}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpf" className="form-label">
            CPF:
          </label>
          <input
            id="cpf"
            type="text"
            name="cpf"
            className="form-control"
            value={cliente.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">
            Telefone:
          </label>
          <input
            id="telefone"
            type="text"
            name="telefone"
            className="form-control"
            value={cliente.telefone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endereco" className="form-label">
            Endereço:
          </label>
          <input
            id="endereco"
            type="text"
            name="endereco"
            className="form-control"
            value={cliente.endereco}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Atualizar
        </button>
      </form>
    </div>
  );
};

export default EditarCliente;
