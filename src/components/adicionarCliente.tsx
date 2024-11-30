import React, { useState } from "react";
import axios from "axios";

interface Cliente {
  nome: string;
  nomeSocial: string;
  cpf: string;
  telefone: string;
  endereco: string;
}

const AdicionarCliente: React.FC = () => {
  const [cliente, setCliente] = useState<Cliente>({
    nome: "",
    nomeSocial: "",
    cpf: "",
    telefone: "",
    endereco: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/adicionar-cliente", cliente);
      alert("Cliente adicionado com sucesso!");
      setCliente({
        nome: "",
        nomeSocial: "",
        cpf: "",
        telefone: "",
        endereco: ""
      });
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      alert("Ocorreu um erro ao adicionar o cliente.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Adicionar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={cliente.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nomeSocial" className="form-label">
            Nome Social
          </label>
          <input
            type="text"
            className="form-control"
            id="nomeSocial"
            name="nomeSocial"
            value={cliente.nomeSocial}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpf" className="form-label">
            CPF
          </label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            name="cpf"
            value={cliente.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">
            Telefone
          </label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            name="telefone"
            value={cliente.telefone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endereco" className="form-label">
            Endereço
          </label>
          <input
            type="text"
            className="form-control"
            id="endereco"
            name="endereco"
            value={cliente.endereco}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Adicionar Cliente
        </button>
      </form>
    </div>
  );
};

export default AdicionarCliente;
