const CHAVE_JOGADORES = "arenaCyberJogadores";

const formJogador = document.getElementById("formJogador");
const inNome = document.getElementById("inNome");
const inAcertos = document.getElementById("inAcertos");
const inErros = document.getElementById("inErros");

const btLimpar = document.getElementById("btLimpar");
const btRestaurar = document.getElementById("btRestaurar");

const mensagem = document.getElementById("mensagem");

const outTotalJogadores = document.getElementById("outTotalJogadores");
const outMelhorJogador = document.getElementById("outMelhorJogador");
const outMelhorAproveitamento = document.getElementById(
  "outMelhorAproveitamento",
);

const listaJogadores = document.getElementById("listaJogadores");

function obterJogadores() {
  const dados = localStorage.getItem(CHAVE_JOGADORES);

  if (!dados) {
    return [];
  }

  try {
    const jogadores = JSON.parse(dados);

    if (Array.isArray(jogadores)) {
      return jogadores;
    }

    return [];
  } catch (erro) {
    return [];
  }
}

function salvarJogadores(jogadores) {
  localStorage.setItem(CHAVE_JOGADORES, JSON.stringify(jogadores));
}

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;

  mensagem.classList.remove("erro", "sucesso");
  mensagem.classList.add(tipo);

  setTimeout(function () {
    mensagem.textContent = "";
    mensagem.classList.remove("erro", "sucesso");
  }, 2600);
}

function calcularAproveitamento(acertos, erros) {
  const total = acertos + erros;

  if (total === 0) {
    return 0;
  }

  return (acertos / total) * 100;
}

function obterClassificacao(aproveitamento) {
  if (aproveitamento >= 90) {
    return "Mestre Supremo";
  }

  if (aproveitamento >= 70) {
    return "Especialista";
  }

  if (aproveitamento >= 50) {
    return "Competidor";
  }

  return "Iniciante";
}

function atualizarTela() {
  const jogadores = obterJogadores();

  jogadores.sort(function (a, b) {
    return b.aproveitamento - a.aproveitamento;
  });

  listaJogadores.innerHTML = "";

  if (jogadores.length === 0) {
    listaJogadores.innerHTML = `
      <p class="lista-vazia">
        Nenhum jogador cadastrado.
      </p>
    `;

    outTotalJogadores.textContent = "0";
    outMelhorJogador.textContent = "Nenhum";
    outMelhorAproveitamento.textContent = "0%";

    return;
  }

  jogadores.forEach(function (jogador, indice) {
    const card = document.createElement("div");
    card.classList.add("jogador");

    card.innerHTML = `
      <strong>${indice + 1}. ${jogador.nome}</strong>
      <span>Acertos: ${jogador.acertos}</span>
      <span>Erros: ${jogador.erros}</span>
      <span class="aproveitamento">
        ${jogador.aproveitamento.toFixed(1)}%
      </span>
      <span class="classificacao">
        ${jogador.classificacao}
      </span>
    `;

    listaJogadores.appendChild(card);
  });

  const melhor = jogadores[0];

  outTotalJogadores.textContent = jogadores.length;
  outMelhorJogador.textContent = melhor.nome;
  outMelhorAproveitamento.textContent = `${melhor.aproveitamento.toFixed(1)}%`;
}

function cadastrarJogador(evento) {
  evento.preventDefault();

  const nome = inNome.value.trim();
  const acertos = Number(inAcertos.value);
  const erros = Number(inErros.value);

  if (nome === "") {
    mostrarMensagem("Informe o nome do jogador.", "erro");
    inNome.focus();
    return;
  }

  if (
    inAcertos.value.trim() === "" ||
    !Number.isInteger(acertos) ||
    acertos < 0
  ) {
    mostrarMensagem("Informe uma quantidade válida de acertos.", "erro");
    inAcertos.focus();
    return;
  }

  if (inErros.value.trim() === "" || !Number.isInteger(erros) || erros < 0) {
    mostrarMensagem("Informe uma quantidade válida de erros.", "erro");
    inErros.focus();
    return;
  }

  if (acertos + erros === 0) {
    mostrarMensagem(
      "O jogador precisa ter pelo menos uma resposta registrada.",
      "erro",
    );

    inAcertos.focus();
    return;
  }

  const jogadores = obterJogadores();

  const nomeJaExiste = jogadores.some(function (jogador) {
    return (
      jogador.nome.toLocaleLowerCase("pt-BR") ===
      nome.toLocaleLowerCase("pt-BR")
    );
  });

  if (nomeJaExiste) {
    mostrarMensagem("Esse jogador já está cadastrado.", "erro");
    inNome.focus();
    return;
  }

  const aproveitamento = calcularAproveitamento(acertos, erros);
  const classificacao = obterClassificacao(aproveitamento);

  jogadores.push({
    nome: nome,
    acertos: acertos,
    erros: erros,
    aproveitamento: aproveitamento,
    classificacao: classificacao,
  });

  salvarJogadores(jogadores);

  mostrarMensagem(`Jogador "${nome}" cadastrado com sucesso.`, "sucesso");

  formJogador.reset();
  atualizarTela();

  inNome.focus();
}

function limparCampos() {
  formJogador.reset();

  mostrarMensagem("Campos limpos.", "sucesso");

  inNome.focus();
}

function restaurarArena() {
  const confirmar = confirm(
    "Deseja apagar todos os jogadores cadastrados e restaurar a arena?",
  );

  if (!confirmar) {
    return;
  }

  localStorage.removeItem(CHAVE_JOGADORES);

  formJogador.reset();
  atualizarTela();

  mostrarMensagem(
    "Arena restaurada. Todos os jogadores foram removidos.",
    "sucesso",
  );

  inNome.focus();
}

formJogador.addEventListener("submit", cadastrarJogador);
btLimpar.addEventListener("click", limparCampos);
btRestaurar.addEventListener("click", restaurarArena);

atualizarTela();
