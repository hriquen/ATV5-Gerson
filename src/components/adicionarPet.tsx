import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Pet {
  nome: string;
  tipo: string;
  raca: string;
  genero: string;
  dono_id: number;
}

const AdicionarPet: React.FC = () => {
  const navigate = useNavigate(); 
  const [pet, setPet] = useState<Pet>({
    nome: "",
    tipo: "",
    raca: "",
    genero: "Macho", 
    dono_id: 0,
  });

  
  const handleAdicionarPet = async () => {
    try {
      await axios.post("http://localhost:5000/adicionar-pet", pet);
      alert("Pet adicionado com sucesso!");
      navigate("/listar-pets"); 
    } catch (error) {
      console.error("Erro ao adicionar pet:", error);
      alert("Erro ao adicionar pet.");
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Adicionar Pet</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAdicionarPet(); }}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={pet.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">Tipo</label>
          <input
            type="text"
            className="form-control"
            id="tipo"
            name="tipo"
            value={pet.tipo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="raca" className="form-label">Raça</label>
          <input
            type="text"
            className="form-control"
            id="raca"
            name="raca"
            value={pet.raca}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genero" className="form-label">Gênero</label>
          <select
            className="form-select"
            id="genero"
            name="genero"
            value={pet.genero}
            onChange={handleChange}
          >
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="dono_id" className="form-label">ID do Dono</label>
          <input
            type="number"
            className="form-control"
            id="dono_id"
            name="dono_id"
            value={pet.dono_id}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Adicionar Pet
        </button>
      </form>
    </div>
  );
};

export default AdicionarPet;
