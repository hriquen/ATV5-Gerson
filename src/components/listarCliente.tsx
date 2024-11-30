import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListarClientes: React.FC = () => {
  const [clientes, setClientes] = useState<any[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/clientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    };

    fetchClientes();
  }, []);


  const handleDeletarCliente = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/deletar-cliente/${id}`);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
      alert("Cliente deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      alert("Erro ao deletar cliente.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Clientes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.telefone}</td>
              <td>
                <Link to={`/editar-cliente/${cliente.id}`} className="btn btn-primary btn-sm me-2">
                  Editar
                </Link>
                <button
                  onClick={() => handleDeletarCliente(cliente.id)}
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

export default ListarClientes;
