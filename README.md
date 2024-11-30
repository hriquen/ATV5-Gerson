Para rodar esse projeto instale as dependencias, altere as informações para que elas sejam iguais ao seu banco de dados no arquivo express.js e use npm run dev para executar, com o uso de concurrently o backend e frontend vão ser executados juntos. Segue o DLL das tabelas MySQL 

-- Criação da tabela de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nome_social VARCHAR(255),
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de produtos
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);

-- Criação da tabela de pets
CREATE TABLE pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    raca VARCHAR(100),
    genero ENUM('Macho', 'Fêmea') NOT NULL,
    dono_id INT NOT NULL,
    FOREIGN KEY (dono_id) REFERENCES clientes(id) ON DELETE CASCADE
);

-- Criação da tabela de produtos consumidos
CREATE TABLE produtos_consumidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
    FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE
);
