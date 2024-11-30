import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListarPets: React.FC = () => {
  const [pets, setPets] = useState<any[]>([]);

 
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/pets");
        setPets(response.data);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    };

    fetchPets();
  }, []);


  const handleDeletarPet = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/deletar-pet/${id}`);
      setPets(pets.filter(pet => pet.id !== id));
      alert("Pet deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar pet:", error);
      alert("Erro ao deletar pet.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Pets</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Gênero</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.id}>
              <td>{pet.id}</td>
              <td>{pet.nome}</td>
              <td>{pet.tipo}</td>
              <td>{pet.genero}</td>
              <td>
                <Link to={`/editar-pet/${pet.id}`} className="btn btn-primary btn-sm me-2">
                  Editar
                </Link>
                <button
                  onClick={() => handleDeletarPet(pet.id)}
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

export default ListarPets;
