const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname, '../front-end')));

// Lista inicial de candidatos
let candidates = [];

// Lista para armazenar as contas que já votaram
let voters = new Set(); // Utilizando Set para garantir que cada conta seja única

// Rota para consultar candidatos e votos
app.get('/candidates', (req, res) => {
  res.json(candidates);
});

// Cadastro de novo candidato
app.post('/candidates', (req, res) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: 'Nome e número são obrigatórios.' });
  }

  // Verifica se já existe um candidato com o mesmo número
  const existingCandidate = candidates.find(candidate => candidate.number === number);
  if (existingCandidate) {
    return res.status(400).json({ error: 'Já existe um candidato com este número.' });
  }

  const newCandidate = {
    id: candidates.length + 1,
    name,
    number,
    votes: 0
  };

  candidates.push(newCandidate);
  res.status(201).json(newCandidate);
});

// Registrar voto
app.post('/vote', (req, res) => {
  const { candidateNumber, account } = req.body;
  
  if (!account) {
    return res.status(400).json({ error: 'Usuário não autenticado no MetaMask.' });
  }

  // Verifica se a conta já votou
  if (voters.has(account)) {
    return res.status(403).json({ error: 'Este usuário já votou.' });
  }

  const candidate = candidates.find(c => c.number === candidateNumber);

  if (!candidate) {
    return res.status(404).json({ error: 'Candidato não encontrado.' });
  }

  // Incrementa o voto do candidato
  candidate.votes += 1;

  // Adiciona a conta à lista de votantes
  voters.add(account);

  res.status(200).json({ message: 'Voto registrado com sucesso.', candidate });
});

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
