const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "petloversdb"
});

con.connect(err => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conectado ao banco de dados!");
});

app.post("/adicionar-cliente", (req, res) => {
  const { nome, nomeSocial, cpf, telefone, endereco } = req.body;
  const query =
    "INSERT INTO clientes (nome, nome_social, cpf, telefone, endereco) VALUES (?, ?, ?, ?, ?)";
  con.query(
    query,
    [nome, nomeSocial, cpf, telefone, endereco],
    (err, result) => {
      if (err) {
        console.error("Erro ao adicionar cliente:", err);
        return res.status(500).json({ message: "Erro ao adicionar cliente." });
      }
      console.log("Cliente adicionado com ID:", result.insertId);
      res.status(200).json({ message: "Cliente adicionado com sucesso!" });
    }
  );
});


app.get("/clientes", (req, res) => {
  const query = "SELECT * FROM clientes";
  con.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao listar clientes:", err);
      return res.status(500).json({ message: "Erro ao listar clientes." });
    }
    console.log("Clientes encontrados:", results);
    res.status(200).json(results); 
  });
});


app.delete("/deletar-cliente/:id", (req, res) => {
  const { id } = req.params; 
  const query = "DELETE FROM clientes WHERE id = ?";
  
  con.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar cliente:", err);
      return res.status(500).json({ message: "Erro ao deletar cliente." });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }
    
    console.log("Cliente deletado com ID:", id);
    res.status(200).json({ message: "Cliente deletado com sucesso!" });
  });
});


app.put("/atualizar-cliente/:id", (req, res) => {
  const { id } = req.params;
  const { nome, nomeSocial, cpf, telefone, endereco } = req.body;


  if (!nome || !cpf || !telefone || !endereco) {
    return res.status(400).json({ message: "Campos obrigatórios faltando." });
  }

  const query =
    "UPDATE clientes SET nome = ?, nome_social = ?, cpf = ?, telefone = ?, endereco = ? WHERE id = ?";
  
  con.query(query, [nome, nomeSocial, cpf, telefone, endereco, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar cliente:", err);
      return res.status(500).json({ message: "Erro ao atualizar cliente." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    console.log("Cliente atualizado com ID:", id);
    res.status(200).json({ message: "Cliente atualizado com sucesso!" });
  });
});


app.post("/adicionar-pet", (req, res) => {
  const { nome, tipo, raca, genero, dono_id } = req.body;
  

  if (!nome || !tipo || !genero || !dono_id) {
    return res.status(400).json({ message: "Campos obrigatórios faltando." });
  }

  const query =
    "INSERT INTO pets (nome, tipo, raca, genero, dono_id) VALUES (?, ?, ?, ?, ?)";
  
  con.query(
    query,
    [nome, tipo, raca, genero, dono_id],
    (err, result) => {
      if (err) {
        console.error("Erro ao adicionar pet:", err);
        return res.status(500).json({ message: "Erro ao adicionar pet." });
      }
      console.log("Pet adicionado com ID:", result.insertId);
      res.status(200).json({ message: "Pet adicionado com sucesso!" });
    }
  );
});


app.get("/pets", (req, res) => {
  const query = "SELECT * FROM pets";
  con.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao listar pets:", err);
      return res.status(500).json({ message: "Erro ao listar pets." });
    }
    console.log("Pets encontrados:", results);
    res.status(200).json(results); 
  });
});


app.delete("/deletar-pet/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM pets WHERE id = ?";
  
  con.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar pet:", err);
      return res.status(500).json({ message: "Erro ao deletar pet." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pet não encontrado." });
    }

    console.log("Pet deletado com ID:", id);
    res.status(200).json({ message: "Pet deletado com sucesso!" });
  });
});


app.put("/atualizar-pet/:id", (req, res) => {
  const { id } = req.params;
  const { nome, tipo, raca, genero, dono_id } = req.body;


  if (!nome || !tipo || !genero || !dono_id) {
    return res.status(400).json({ message: "Campos obrigatórios faltando." });
  }

  const query =
    "UPDATE pets SET nome = ?, tipo = ?, raca = ?, genero = ?, dono_id = ? WHERE id = ?";
  
  con.query(query, [nome, tipo, raca, genero, dono_id, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar pet:", err);
      return res.status(500).json({ message: "Erro ao atualizar pet." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Pet não encontrado." });
    }

    console.log("Pet atualizado com ID:", id);
    res.status(200).json({ message: "Pet atualizado com sucesso!" });
  });
});


app.post("/adicionar-produto", (req, res) => {
    const { nome, preco } = req.body;
    const query =
      "INSERT INTO produtos (nome, preco) VALUES (?, ?)";
    con.query(
      query,
      [nome, preco],
      (err, result) => {
        if (err) {
          console.error("Erro ao adicionar produto:", err);
          return res.status(500).json({ message: "Erro ao adicionar produto." });
        }
        console.log("Produto adicionado com ID:", result.insertId);
        res.status(200).json({ message: "Produto adicionado com sucesso!" });
      }
    );
  });
  

  app.get("/produtos", (req, res) => {
    const query = "SELECT * FROM produtos";
    con.query(query, (err, results) => {
      if (err) {
        console.error("Erro ao listar produtos:", err);
        return res.status(500).json({ message: "Erro ao listar produtos." });
      }
      console.log("Produtos encontrados:", results);
      res.status(200).json(results);
    });
  });
  

  app.delete("/deletar-produto/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM produtos WHERE id = ?";
    
    con.query(query, [id], (err, result) => {
      if (err) {
        console.error("Erro ao deletar produto:", err);
        return res.status(500).json({ message: "Erro ao deletar produto." });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Produto não encontrado." });
      }
      
      console.log("Produto deletado com ID:", id);
      res.status(200).json({ message: "Produto deletado com sucesso!" });
    });
  });
  
  app.put("/atualizar-produto/:id", (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;
  
    if (!nome || !preco) {
      return res.status(400).json({ message: "Campos obrigatórios faltando." });
    }
  
    const query =
      "UPDATE produtos SET nome = ?, preco = ? WHERE id = ?";
    
    con.query(query, [nome, preco, id], (err, result) => {
      if (err) {
        console.error("Erro ao atualizar produto:", err);
        return res.status(500).json({ message: "Erro ao atualizar produto." });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Produto não encontrado." });
      }
  
      console.log("Produto atualizado com ID:", id);
      res.status(200).json({ message: "Produto atualizado com sucesso!" });
    });
  });

app.post("/adicionar-produto-consumido", (req, res) => {
    const { cliente_id, produto_id, quantidade } = req.body;
  

    if (!cliente_id || !produto_id || !quantidade) {
      return res.status(400).json({ message: "Campos obrigatórios faltando." });
    }
  
    const query =
      "INSERT INTO produtos_consumidos (cliente_id, produto_id, quantidade) VALUES (?, ?, ?)";
    
    con.query(query, [cliente_id, produto_id, quantidade], (err, result) => {
      if (err) {
        console.error("Erro ao adicionar produto consumido:", err);
        return res.status(500).json({ message: "Erro ao adicionar produto consumido." });
      }
  
      console.log("Produto consumido adicionado com ID:", result.insertId);
      res.status(200).json({ message: "Produto consumido adicionado com sucesso!" });
    });
  });

app.get("/produtos-mais-consumidos", (req, res) => {
    const query = `
      SELECT p.nome, SUM(pc.quantidade) AS quantidade_total
      FROM produtos_consumidos pc
      JOIN produtos p ON pc.produto_id = p.id
      GROUP BY p.nome
      ORDER BY quantidade_total DESC
      LIMIT 10;`;
    
    con.query(query, (err, results) => {
      if (err) {
        console.error("Erro ao buscar produtos mais consumidos:", err);
        return res.status(500).json({ message: "Erro ao buscar produtos mais consumidos." });
      }
      res.status(200).json(results);
    });
  });

app.get("/clientes-mais-consumiram-quantidade", (req, res) => {
    const query = `
      SELECT c.nome, SUM(pc.quantidade) AS quantidade_total
      FROM produtos_consumidos pc
      JOIN clientes c ON pc.cliente_id = c.id
      GROUP BY c.nome
      ORDER BY quantidade_total DESC
      LIMIT 10;`;
  
    con.query(query, (err, results) => {
      if (err) {
        console.error("Erro ao buscar clientes mais consumiram produtos por quantidade:", err);
        return res.status(500).json({ message: "Erro ao buscar clientes mais consumiram produtos." });
      }
      res.status(200).json(results);
    });
  });

app.get("/clientes-mais-consumiram-valor", (req, res) => {
    const query = `
      SELECT c.nome, SUM(pc.quantidade * p.preco) AS valor_total
      FROM produtos_consumidos pc
      JOIN clientes c ON pc.cliente_id = c.id
      JOIN produtos p ON pc.produto_id = p.id
      GROUP BY c.nome
      ORDER BY valor_total DESC
      LIMIT 10;`;
  
    con.query(query, (err, results) => {
      if (err) {
        console.error("Erro ao buscar clientes mais consumiram produtos por valor:", err);
        return res.status(500).json({ message: "Erro ao buscar clientes mais consumiram produtos por valor." });
      }
      res.status(200).json(results);
    });
  });

app.get("/produtos-mais-consumidos-por-tipo", (req, res) => {
    const query = `
      SELECT p.nome, pt.tipo, SUM(pc.quantidade) AS quantidade_total
      FROM produtos_consumidos pc
      JOIN produtos p ON pc.produto_id = p.id
      JOIN clientes c ON pc.cliente_id = c.id
      JOIN pets pt ON c.id = pt.dono_id
      GROUP BY p.nome, pt.tipo
      ORDER BY quantidade_total DESC
      LIMIT 10;`;
  
    con.query(query, (err, results) => {
      if (err) {
        console.error("Erro ao buscar produtos mais consumidos por tipo de pet:", err);
        return res.status(500).json({ message: "Erro ao buscar produtos mais consumidos por tipo de pet." });
      }
      res.status(200).json(results);
    });
  });
        
  


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
