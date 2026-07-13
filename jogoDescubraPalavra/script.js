const CHAVE_PALAVRAS = "jogoPalavra";
const CHAVE_DICAS = "jogoDica";

const botoesNavegacao = document.querySelectorAll(".btn-nav");
const secoes = document.querySelectorAll(".secao");

const mensagem = document.getElementById("mensagem");

const formCadastro = document.getElementById("formCadastro");
const inPalavra = document.getElementById("inPalavra");
const inDica = document.getElementById("inDica");
const totalPalavras = document.getElementById("totalPalavras");

const ckMostrar = document.getElementById("ckMostrar");
const ckTodos = document.getElementById("ckTodos");
const areaTabela = document.getElementById("areaTabela");
const corpoTabela = document.getElementById("corpoTabela");
const listaVazia = document.getElementById("listaVazia");
const btExcluir = document.getElementById("btExcluir");

const btIniciar = document.getElementById("btIniciar");
const btNovoJogo = document.getElementById("btNovoJogo");
const btRevelar = document.getElementById("btRevelar");

const jogoInicial = document.getElementById("jogoInicial");
const areaJogo = document.getElementById("areaJogo");

const outDica = document.getElementById("outDica");
const palavraOculta = document.getElementById("palavraOculta");
const outErros = document.getElementById("outErros");
const outTentativas = document.getElementById("outTentativas");
const outLetras = document.getElementById("outLetras");
const resultadoJogo = document.getElementById("resultadoJogo");

const formLetra = document.getElementById("formLetra");
const inLetra = document.getElementById("inLetra");

let palavraSorteada = "";
let dicaSorteada = "";
let letrasUtilizadas = [];
let erros = 0;
let jogoEncerrado = false;

const LIMITE_ERROS = 6;

/*
  Recupera palavras e dicas do localStorage.
*/
function obterDados() {
  const palavrasSalvas = localStorage.getItem(CHAVE_PALAVRAS);
  const dicasSalvas = localStorage.getItem(CHAVE_DICAS);

  if (!palavrasSalvas || !dicasSalvas) {
    return {
      palavras: [],
      dicas: [],
    };
  }

  return {
    palavras: palavrasSalvas.split(";"),
    dicas: dicasSalvas.split(";"),
  };
}

/*
  Salva os vetores usando ponto e vírgula,
  como descrito na atividade.
*/
function salvarDados(palavras, dicas) {
  if (palavras.length === 0) {
    localStorage.removeItem(CHAVE_PALAVRAS);
    localStorage.removeItem(CHAVE_DICAS);
    return;
  }

  localStorage.setItem(CHAVE_PALAVRAS, palavras.join(";"));

  localStorage.setItem(CHAVE_DICAS, dicas.join(";"));
}

/*
  Exibe mensagens de erro ou sucesso.
*/
function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;

  mensagem.classList.remove("erro", "sucesso");
  mensagem.classList.add(tipo);

  setTimeout(function () {
    mensagem.textContent = "";
    mensagem.classList.remove("erro", "sucesso");
  }, 2800);
}

/*
  Troca entre cadastro, listagem e jogo.
*/
function mostrarSecao(idSecao) {
  secoes.forEach(function (secao) {
    secao.classList.add("oculto");
  });

  botoesNavegacao.forEach(function (botao) {
    botao.classList.remove("ativo");
  });

  document.getElementById(idSecao).classList.remove("oculto");

  const botaoAtivo = document.querySelector(`[data-secao="${idSecao}"]`);

  botaoAtivo.classList.add("ativo");

  if (idSecao === "secaoLista") {
    ckMostrar.checked = false;
    ckTodos.checked = false;
    areaTabela.classList.add("oculto");
  }
}

botoesNavegacao.forEach(function (botao) {
  botao.addEventListener("click", function () {
    mostrarSecao(botao.dataset.secao);
  });
});

/*
  Atualiza a quantidade de palavras.
*/
function atualizarQuantidade() {
  const dados = obterDados();

  totalPalavras.textContent = dados.palavras.length;
}

/*
  Cadastra uma palavra e sua dica.
*/
function cadastrarPalavra(evento) {
  evento.preventDefault();

  const palavra = inPalavra.value.trim();
  const dica = inDica.value.trim();

  if (palavra === "" || dica === "" || palavra.includes(" ")) {
    mostrarMensagem(
      "Informe uma palavra sem espaços e sua respectiva dica.",
      "erro",
    );

    inPalavra.focus();
    return;
  }

  const somenteLetras = /^[A-Za-zÀ-ÿ-]+$/;

  if (!somenteLetras.test(palavra)) {
    mostrarMensagem("A palavra deve conter somente letras.", "erro");

    inPalavra.focus();
    return;
  }

  const dados = obterDados();

  const palavraJaExiste = dados.palavras.some(function (palavraCadastrada) {
    return (
      palavraCadastrada.toLocaleLowerCase("pt-BR") ===
      palavra.toLocaleLowerCase("pt-BR")
    );
  });

  if (palavraJaExiste) {
    mostrarMensagem("Essa palavra já está cadastrada.", "erro");

    inPalavra.focus();
    return;
  }

  dados.palavras.push(palavra);
  dados.dicas.push(dica);

  salvarDados(dados.palavras, dados.dicas);

  mostrarMensagem(`Palavra "${palavra}" cadastrada com sucesso.`, "sucesso");

  formCadastro.reset();
  atualizarQuantidade();

  inPalavra.focus();
}

formCadastro.addEventListener("submit", cadastrarPalavra);

/*
  Cria as linhas da tabela.
*/
function montarTabela() {
  const dados = obterDados();

  corpoTabela.innerHTML = "";
  ckTodos.checked = false;

  if (dados.palavras.length === 0) {
    listaVazia.classList.remove("oculto");
    btExcluir.classList.add("oculto");
    return;
  }

  listaVazia.classList.add("oculto");
  btExcluir.classList.remove("oculto");

  dados.palavras.forEach(function (palavra, indice) {
    const linha = document.createElement("tr");

    const colunaPalavra = document.createElement("td");
    colunaPalavra.textContent = palavra;

    const colunaDica = document.createElement("td");
    colunaDica.textContent = dados.dicas[indice];

    const colunaExcluir = document.createElement("td");

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.classList.add("ck-excluir");
    checkbox.dataset.indice = indice;

    colunaExcluir.appendChild(checkbox);

    linha.appendChild(colunaPalavra);
    linha.appendChild(colunaDica);
    linha.appendChild(colunaExcluir);

    corpoTabela.appendChild(linha);
  });
}

ckMostrar.addEventListener("change", function () {
  if (ckMostrar.checked) {
    areaTabela.classList.remove("oculto");
    montarTabela();
  } else {
    areaTabela.classList.add("oculto");
  }
});

ckTodos.addEventListener("change", function () {
  const checkboxes = document.querySelectorAll(".ck-excluir");

  checkboxes.forEach(function (checkbox) {
    checkbox.checked = ckTodos.checked;
  });
});

/*
  Remove as palavras selecionadas.
*/
function removerPalavras() {
  const selecionados = document.querySelectorAll(".ck-excluir:checked");

  if (selecionados.length === 0) {
    mostrarMensagem("Selecione pelo menos uma palavra para excluir.", "erro");

    return;
  }

  const confirmar = confirm(
    `Confirma a exclusão de ${selecionados.length} palavra(s)?`,
  );

  if (!confirmar) {
    return;
  }

  const dados = obterDados();

  const indicesParaExcluir = Array.from(selecionados).map(function (checkbox) {
    return Number(checkbox.dataset.indice);
  });

  const novasPalavras = [];
  const novasDicas = [];

  dados.palavras.forEach(function (palavra, indice) {
    if (!indicesParaExcluir.includes(indice)) {
      novasPalavras.push(palavra);
      novasDicas.push(dados.dicas[indice]);
    }
  });

  salvarDados(novasPalavras, novasDicas);

  montarTabela();
  atualizarQuantidade();

  mostrarMensagem("Palavras selecionadas excluídas.", "sucesso");
}

btExcluir.addEventListener("click", removerPalavras);

/*
  Remove acentos para facilitar a comparação.
*/
function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

/*
  Sorteia uma palavra cadastrada.
*/
function iniciarJogo() {
  const dados = obterDados();

  if (dados.palavras.length === 0) {
    mostrarMensagem(
      "Cadastre pelo menos uma palavra antes de iniciar.",
      "erro",
    );

    mostrarSecao("secaoCadastro");
    inPalavra.focus();

    return;
  }

  const indiceSorteado = Math.floor(Math.random() * dados.palavras.length);

  palavraSorteada = dados.palavras[indiceSorteado];
  dicaSorteada = dados.dicas[indiceSorteado];

  letrasUtilizadas = [];
  erros = 0;
  jogoEncerrado = false;

  jogoInicial.classList.add("oculto");
  areaJogo.classList.remove("oculto");

  outDica.textContent = dicaSorteada;
  outErros.textContent = "0";
  outTentativas.textContent = String(LIMITE_ERROS);
  outLetras.textContent = "Nenhuma";

  resultadoJogo.textContent = "";
  resultadoJogo.classList.remove("vitoria", "derrota");

  inLetra.disabled = false;
  formLetra.querySelector("button").disabled = false;

  exibirPalavra();

  inLetra.value = "";
  inLetra.focus();
}

/*
  Exibe letras descobertas e traços
  para as letras ainda ocultas.
*/
function exibirPalavra() {
  palavraOculta.innerHTML = "";

  const palavraNormalizada = normalizarTexto(palavraSorteada);

  for (let i = 0; i < palavraSorteada.length; i++) {
    const bloco = document.createElement("span");
    bloco.classList.add("letra-palavra");

    const caractereNormalizado = palavraNormalizada[i];

    if (
      letrasUtilizadas.includes(caractereNormalizado) ||
      palavraSorteada[i] === "-"
    ) {
      bloco.textContent = palavraSorteada[i].toUpperCase();
    } else {
      bloco.textContent = "_";
    }

    palavraOculta.appendChild(bloco);
  }
}

/*
  Verifica se todas as letras foram descobertas.
*/
function palavraFoiDescoberta() {
  const palavraNormalizada = normalizarTexto(palavraSorteada);

  for (const caractere of palavraNormalizada) {
    if (caractere !== "-" && !letrasUtilizadas.includes(caractere)) {
      return false;
    }
  }

  return true;
}

/*
  Finaliza o jogo.
*/
function finalizarJogo(vitoria) {
  jogoEncerrado = true;

  inLetra.disabled = true;
  formLetra.querySelector("button").disabled = true;

  palavraOculta.innerHTML = "";

  for (const caractere of palavraSorteada) {
    const bloco = document.createElement("span");

    bloco.classList.add("letra-palavra");
    bloco.textContent = caractere.toUpperCase();

    palavraOculta.appendChild(bloco);
  }

  if (vitoria) {
    resultadoJogo.textContent = `Parabéns! Você descobriu a palavra "${palavraSorteada}".`;

    resultadoJogo.classList.add("vitoria");
  } else {
    resultadoJogo.textContent = `Fim de jogo! A palavra era "${palavraSorteada}".`;

    resultadoJogo.classList.add("derrota");
  }
}

/*
  Recebe e verifica a letra informada.
*/
function verificarLetra(evento) {
  evento.preventDefault();

  if (jogoEncerrado) {
    return;
  }

  const letra = normalizarTexto(inLetra.value.trim());

  if (!/^[A-Z]$/.test(letra)) {
    mostrarMensagem("Digite somente uma letra.", "erro");

    inLetra.select();
    return;
  }

  if (letrasUtilizadas.includes(letra)) {
    mostrarMensagem(`A letra "${letra}" já foi utilizada.`, "erro");

    inLetra.select();
    return;
  }

  letrasUtilizadas.push(letra);

  const palavraNormalizada = normalizarTexto(palavraSorteada);

  if (!palavraNormalizada.includes(letra)) {
    erros++;
  }

  outErros.textContent = String(erros);

  outTentativas.textContent = String(LIMITE_ERROS - erros);

  outLetras.textContent = letrasUtilizadas.join(" ");

  exibirPalavra();

  if (palavraFoiDescoberta()) {
    finalizarJogo(true);
  } else if (erros >= LIMITE_ERROS) {
    finalizarJogo(false);
  }

  inLetra.value = "";

  if (!jogoEncerrado) {
    inLetra.focus();
  }
}

formLetra.addEventListener("submit", verificarLetra);

btIniciar.addEventListener("click", iniciarJogo);
btNovoJogo.addEventListener("click", iniciarJogo);

btRevelar.addEventListener("click", function () {
  if (jogoEncerrado) {
    return;
  }

  const confirmar = confirm(
    "Deseja revelar a palavra e encerrar esta partida?",
  );

  if (confirmar) {
    finalizarJogo(false);
  }
});

atualizarQuantidade();
