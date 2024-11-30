import React, { useEffect, useState } from "react";
import axios from "axios";

const Relatorios: React.FC = () => {
  const [produtosMaisConsumidos, setProdutosMaisConsumidos] = useState<any[]>([]);
  const [clientesMaisConsumiramQuantidade, setClientesMaisConsumiramQuantidade] = useState<any[]>([]);
  const [clientesMaisConsumiramValor, setClientesMaisConsumiramValor] = useState<any[]>([]);
  const [produtosPorTipo, setProdutosPorTipo] = useState<any[]>([]);

  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const [produtosRes, clientesQuantRes, clientesValorRes, produtosTipoRes] = await Promise.all([
          axios.get("http://localhost:5000/produtos-mais-consumidos"),
          axios.get("http://localhost:5000/clientes-mais-consumiram-quantidade"),
          axios.get("http://localhost:5000/clientes-mais-consumiram-valor"),
          axios.get("http://localhost:5000/produtos-mais-consumidos-por-tipo"),
        ]);
        
        setProdutosMaisConsumidos(produtosRes.data);
        setClientesMaisConsumiramQuantidade(clientesQuantRes.data);
        setClientesMaisConsumiramValor(clientesValorRes.data);
        setProdutosPorTipo(produtosTipoRes.data);
      } catch (error) {
        console.error("Erro ao carregar relatórios:", error);
      }
    };

    fetchRelatorios();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Relatórios</h2>

      <h3>Produtos Mais Consumidos por Quantidade</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade Total</th>
          </tr>
        </thead>
        <tbody>
          {produtosMaisConsumidos.map((produto: any) => (
            <tr key={produto.nome}>
              <td>{produto.nome}</td>
              <td>{produto.quantidade_total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Clientes que Mais Consumiram Produtos por Quantidade</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Quantidade Total</th>
          </tr>
        </thead>
        <tbody>
          {clientesMaisConsumiramQuantidade.map((cliente: any) => (
            <tr key={cliente.nome}>
              <td>{cliente.nome}</td>
              <td>{cliente.quantidade_total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Clientes que Mais Consumiram Produtos por Valor</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {clientesMaisConsumiramValor.map((cliente: any) => (
            <tr key={cliente.nome}>
              <td>{cliente.nome}</td>
              <td>R$ {Number(cliente.valor_total).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <h3>Produtos Mais Consumidos por Tipo de Pet</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Tipo de Pet</th>
            <th>Quantidade Total</th>
          </tr>
        </thead>
        <tbody>
          {produtosPorTipo.map((produto: any) => (
            <tr key={produto.nome + produto.tipo}>
              <td>{produto.nome}</td>
              <td>{produto.tipo}</td>
              <td>{produto.quantidade_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Relatorios;
