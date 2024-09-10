# Sistema de Votação Descentralizado

Este é nosso projeto final do estágio de Blockchain na CompassUOL, ele foi desenvolvido utilizando **Solidity** para o contrato inteligente e **JavaScript** para a interface do usuário, com integração ao **MetaMask** para autenticação e execução das transações de voto, além de ter um front-end. O objetivo é proporcionar um sistema seguro e auditável de votação em uma rede blockchain.

## **Equipe de Desenvolvimento**
- Yves Esteves
- Vinicius Rocha
- Pablo Moraes
- Victor Hugo Borges

## **Visão Geral**

O projeto consiste em um sistema de votação descentralizado onde os usuários podem:

1. **Votar** em candidatos previamente cadastrados.
2. **Cadastrar** novos candidatos.
3. **Consultar** os candidatos e a quantidade de votos.

O sistema utiliza a tecnologia blockchain para garantir a transparência e a segurança das eleições. Todos os votos são registrados na blockchain e podem ser consultados de forma transparente.

### **Funcionalidades**

- *Cadastro de Candidatos*: Um administrador pode cadastrar novos candidatos com um nome e um número de identificação.
- *Votação*: Um usuário, conectado via MetaMask, pode votar em um candidato. O sistema impede que o usuário vote mais de uma vez.
- *Consulta de Votos*: Qualquer usuário pode consultar os candidatos cadastrados e o número de votos que cada um recebeu.

## **Tecnologias Utilizadas**

### **Backend (Blockchain)**
- *Solidity*: Contrato inteligente implementado para gerenciar candidatos e votos.
- *Hardhat*: Framework de desenvolvimento para compilar e implantar o contrato inteligente.
- *Ethereum/MetaMask*: Utilizado para gerenciar a autenticação do usuário e as transações de votação.

### **Frontend**
- *HTML5/CSS3/JavaScript*: Interface do usuário que permite a interação com o sistema.
- *Web3.js*: Biblioteca para conectar o frontend ao contrato inteligente na blockchain.

### **Backend API**
- *Node.js*: API em Express para gerenciar os candidatos e os votos. A API serve como intermediária para as transações e consulta de dados no contrato inteligente.

## **Como Executar o Projeto**

### **Pré-requisitos**
- **Node.js**: Instale a versão mais recente do [Node.js](https://nodejs.org).
- **MetaMask**: Extensão de carteira digital para interagir com a blockchain. [Instale o MetaMask](https://metamask.io/download.html).
- **Hardhat**: Ferramenta de desenvolvimento para Ethereum. Para instalar, execute:

