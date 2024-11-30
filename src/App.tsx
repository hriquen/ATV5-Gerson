import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import Navbar from './components/Navbar'; 

import AdicionarCliente from './components/adicionarCliente';
import ListarClientes from './components/listarCliente';
import AdicionarPet from './components/adicionarPet';
import ListarPets from './components/listarPet';
import EditarPet from './components/editarPet';
import EditarCliente from './components/editarCliente';
import AdicionarProduto from './components/adicionarProduto';
import ListarProdutos from './components/listarProduto';
import EditarProduto from './components/editarProduto';
import AdicionarProdutoConsumido from './components/adicionarProdutoConsumido';
import Relatorios from './components/relatorios';


const links = [
  { label: "Adicionar Cliente", path: "/" },
  { label: "Listar Clientes", path: "/listar-clientes" },
  { label: "Adicionar Pet", path: "/adicionar-pet" },
  { label: "Listar Pets", path: "/listar-pets" },
  { label: "Adicionar Produto/Serviço", path: "/adicionar-produto" },
  { label: "Listar Produtos/Serviço", path: "/listar-produtos" },
  { label: "Registrar Compra", path: "/adicionar-produto-consumido" },
  { label: "Relatório", path: "/relatorio" },
];

function App() {
  return (
    <Router>
      <div>

        <Navbar links={links} />
        

        <Routes>
          <Route path="/" element={<AdicionarCliente />} />
          <Route path="/listar-clientes" element={<ListarClientes />} />
          <Route path="/editar-cliente/:id" element={<EditarCliente />} />
          <Route path="/adicionar-pet" element={<AdicionarPet />} />
          <Route path="/listar-pets" element={<ListarPets />} />
          <Route path="/editar-pet/:id" element={<EditarPet />} />
          <Route path="/adicionar-produto" element={<AdicionarProduto />} />
          <Route path="/listar-produtos" element={<ListarProdutos />} />
          <Route path="/editar-produto/:id" element={<EditarProduto />} />
          <Route path="/adicionar-produto-consumido" element={<AdicionarProdutoConsumido />} />
          <Route path="/relatorio" element={<Relatorios />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
