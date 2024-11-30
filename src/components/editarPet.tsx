import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


interface Pet {
  nome: string;
  tipo: string;
  raca: string;
  genero: string;
  dono_id: number;
}

const EditarPet: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate(); 
  const [pet, setPet] = useState<Pet>({
    nome: "",
    tipo: "",
    raca: "",
    genero: "Macho", 
    dono_id: 0,
  });


  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pets/${id}`);
        setPet(response.data);
      } catch (error) {
        console.error("Erro ao buscar pet:", error);
      }
    };

    fetchPet();
  }, [id]);

  
  const handleAtualizarPet = async () => {
    try {
      await axios.put(`http://localhost:5000/atualizar-pet/${id}`, pet);
      alert("Pet atualizado com sucesso!");
      navigate("/listar-pets"); 
    } catch (error) {
      console.error("Erro ao atualizar pet:", error);
      alert("Erro ao atualizar pet.");
    }
  };

 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Editar Pet</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAtualizarPet();
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
            value={pet.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">
            Tipo:
          </label>
          <input
            id="tipo"
            type="text"
            name="tipo"
            className="form-control"
            value={pet.tipo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="raca" className="form-label">
            Raça:
          </label>
          <input
            id="raca"
            type="text"
            name="raca"
            className="form-control"
            value={pet.raca}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genero" className="form-label">
            Gênero:
          </label>
          <select
            id="genero"
            name="genero"
            className="form-select"
            value={pet.genero}
            onChange={handleChange}
          >
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="dono_id" className="form-label">
            ID do Dono:
          </label>
          <input
            id="dono_id"
            type="number"
            name="dono_id"
            className="form-control"
            value={pet.dono_id}
            onChange={handleChange}
            min="0"
          />
        </div>
        <button type="submit" className="btn btn-dark">
          Atualizar Pet
        </button>
      </form>
    </div>
  );
};

export default EditarPet;
