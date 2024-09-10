// URL base do seu servidor Express
const API_BASE_URL = 'http://localhost:3000';
let userAccount = null;

// Conectar ao MetaMask
async function connectMetaMask() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      console.log('MetaMask conectado:', userAccount);
    } catch (error) {
      console.error('Erro ao conectar ao MetaMask:', error);
      alert('MetaMask não está conectado. Por favor, faça login para votar.');
      throw new Error('MetaMask não conectado');
    }
  } else {
    alert('MetaMask não está instalado!');
    throw new Error('MetaMask não instalado');
  }
}

// Função para carregar os candidatos da API e exibi-los dinamicamente na seção de votação e consulta
function loadCandidates() {
  fetch(`${API_BASE_URL}/candidates`)
      .then(response => response.json())
      .then(data => {
          // Atualiza os candidatos na seção de votação
          const voteForm = document.getElementById('vote-form');
          voteForm.innerHTML = ''; // Limpa os candidatos existentes

          data.forEach(candidate => {
              const label = document.createElement('label');
              label.innerHTML = `<input type="radio" name="candidate" value="${candidate.number}" /> ${candidate.name} - (${candidate.number})`;
              voteForm.appendChild(label);
          });

          // Atualiza os candidatos na seção de consulta
          const consultList = document.querySelector('#consult-content ul');
          consultList.innerHTML = ''; // Limpa a lista existente

          data.forEach(candidate => {
              const listItem = document.createElement('li');
              listItem.textContent = `${candidate.name} (${candidate.number}) - ${candidate.votes} voto(s)`;
              consultList.appendChild(listItem);
          });
      })
      .catch(error => {
          console.error('Erro ao carregar candidatos:', error);
      });
}

// Lida com o cadastro de candidatos
document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault(); // Previne o comportamento padrão do formulário

  const candidateName = document.getElementById('candidate-name').value;
  const candidateNumber = document.getElementById('candidate-number').value;

  fetch(`${API_BASE_URL}/candidates`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          name: candidateName,
          number: candidateNumber,
      }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro ao cadastrar candidato');
      }
      return response.json();
  })
  .then(data => {
      console.log('Candidato cadastrado com sucesso:', data);
      alert('Candidato cadastrado com sucesso!');
      loadCandidates();  // Atualiza a lista de candidatos
  })
  .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao cadastrar candidato');
  });
});

// Lida com a votação
document.getElementById('vote-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  try {
    await connectMetaMask(); // Certifica-se de que o usuário está conectado ao MetaMask
  } catch (error) {
    console.error('Erro ao conectar ao MetaMask:', error);
    return;
  }

  const selectedCandidate = document.querySelector('input[name="candidate"]:checked');

  if (!selectedCandidate) {
    alert("Por favor, selecione um candidato.");
    return;
  }

  const candidateNumber = selectedCandidate.value;

  console.log("Votando para o candidato número:", candidateNumber);

  fetch(`${API_BASE_URL}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidateNumber, account: userAccount }) // Envia o endereço da conta do MetaMask
  })
  .then(response => {
    if (!response.ok) {
      // Se o erro for 403, significa que o usuário já votou
      if (response.status === 403) {
        alert('Você já votou. Não é possível votar novamente.');
        throw new Error('Usuário já votou.');
      } else {
        throw new Error('Erro ao registrar voto.');
      }
    }
    return response.json();
  })
  .then(data => {
    // Exibe a mensagem de sucesso apenas se o voto foi registrado corretamente
    console.log("Voto registrado:", data);
    alert('Voto registrado com sucesso!');
    loadCandidates(); // Atualiza a lista de votos
  })
  .catch(error => {
    // Este bloco tratará qualquer erro, incluindo tentativas de votar duas vezes
    console.error('Erro ao registrar voto:', error);
  });
});


// Mostra o conteúdo correto com base na opção clicada
document.getElementById('vote-option').addEventListener('click', function () {
  showContent('vote-content');
});

document.getElementById('signup-option').addEventListener('click', function () {
  showContent('signup-content');
});

document.getElementById('consult-option').addEventListener('click', function () {
  showContent('consult-content');
});

// Função para mostrar o conteúdo correto e esconder os outros
function showContent(contentId) {
  const contents = document.querySelectorAll('.content');
  contents.forEach(content => {
      if (content.id === contentId) {
          content.style.display = 'block';
      } else {
          content.style.display = 'none';
      }
  });
}

// Carregar os candidatos ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  loadCandidates();
});
