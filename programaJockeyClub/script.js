const CAVALOS = [
  "Marujo",
  "Tordilho",
  "Belga",
  "Azarão",
  "Pé-de-Pano",
  "Casco-Rachado",
];

let apostas = [];

const formAposta = document.getElementById("formAposta");
const inCavalo = document.getElementById("inCavalo");
const inValor = document.getElementById("inValor");

const outCavalo = document.getElementById("outCavalo");
const outApostas = document.getElementById("outApostas");

const mensagem = document.getElementById("mensagem");
const quantidadeApostas = document.getElementById("quantidadeApostas");

const listaCavalos = document.getElementById("listaCavalos");

const btApostar = document.querySelector(".btn-apostar");
const btGanhador = document.getElementById("btGanhador");
const btNovo = document.getElementById("btNovo");

const resultadoFinal = document.getElementById("resultadoFinal");
const resultadoGanhador = document.getElementById("resultadoGanhador");
const resultadoQuantidade = document.getElementById("resultadoQuantidade");
const resultadoTotalGeral = document.getElementById("resultadoTotalGeral");
const resultadoApostasGanhador = document.getElementById(
  "resultadoApostasGanhador",
);
const resultadoTotalGanhador = document.getElementById(
  "resultadoTotalGanhador",
);

/*
  Exibe os cavalos disponíveis na página.
*/
function exibirCavalos() {
  listaCavalos.innerHTML = "";

  CAVALOS.forEach(function (nome, indice) {
    const card = document.createElement("div");
    card.classList.add("cavalo-card");

    const numero = document.createElement("span");
    numero.textContent = `Cavalo ${indice + 1}`;

    const nomeCavalo = document.createElement("strong");
    nomeCavalo.textContent = nome;

    card.appendChild(numero);
    card.appendChild(nomeCavalo);

    listaCavalos.appendChild(card);
  });
}

/*
  Verifica se o número do cavalo existe.
*/
function validarCavalo(numero) {
  return Number.isInteger(numero) && numero >= 1 && numero <= CAVALOS.length;
}

/*
  Retorna o nome do cavalo correspondente.
*/
function obterCavalo(numero) {
  return CAVALOS[numero - 1];
}

/*
  Conta quantas apostas foram feitas
  no cavalo informado.
*/
function contarApostas(numeroCavalo) {
  let contador = 0;

  for (let i = 0; i < apostas.length; i++) {
    if (apostas[i].cavalo === numeroCavalo) {
      contador++;
    }
  }

  return contador;
}

/*
  Soma os valores apostados em um cavalo.
*/
function totalizarApostas(numeroCavalo) {
  let total = 0;

  for (let i = 0; i < apostas.length; i++) {
    if (apostas[i].cavalo === numeroCavalo) {
      total += apostas[i].valor;
    }
  }

  return total;
}

/*
  Soma o valor de todas as apostas.
*/
function totalizarGeral() {
  let total = 0;

  for (let i = 0; i < apostas.length; i++) {
    total += apostas[i].valor;
  }

  return total;
}

/*
  Formata um valor para reais.
*/
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/*
  Exibe uma mensagem temporária.
*/
function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;

  mensagem.classList.remove("erro", "sucesso");
  mensagem.classList.add(tipo);

  setTimeout(function () {
    mensagem.textContent = "";
    mensagem.classList.remove("erro", "sucesso");
  }, 2500);
}

/*
  Atualiza a lista de apostas.
*/
function exibirApostas() {
  outApostas.innerHTML = "";

  if (apostas.length === 0) {
    outApostas.innerHTML = `
      <p class="lista-vazia">
        Nenhuma aposta foi realizada.
      </p>
    `;
  } else {
    apostas.forEach(function (aposta, indice) {
      const item = document.createElement("div");
      item.classList.add("aposta-item");

      const descricao = document.createElement("span");

      descricao.textContent =
        `${indice + 1}. Cavalo ${aposta.cavalo} — ` +
        obterCavalo(aposta.cavalo);

      const valor = document.createElement("strong");
      valor.textContent = formatarMoeda(aposta.valor);

      item.appendChild(descricao);
      item.appendChild(valor);

      outApostas.appendChild(item);
    });
  }

  const quantidade = apostas.length;

  quantidadeApostas.textContent =
    quantidade === 1 ? "1 aposta" : `${quantidade} apostas`;
}

/*
  Exibe os dados do cavalo quando o campo
  perde o foco ou recebe um número.
*/
function mostrarCavalo() {
  const numero = Number(inCavalo.value);

  if (inCavalo.value.trim() === "") {
    outCavalo.textContent = "";
    return;
  }

  if (!validarCavalo(numero)) {
    outCavalo.textContent = "Número de cavalo inválido. Escolha entre 1 e 6.";

    return;
  }

  const nome = obterCavalo(numero);
  const quantidade = contarApostas(numero);
  const total = totalizarApostas(numero);

  outCavalo.textContent =
    `${nome} — ${quantidade} aposta(s) — ` + `${formatarMoeda(total)}`;
}

/*
  Adiciona uma aposta.
*/
function adicionarAposta(evento) {
  evento.preventDefault();

  const cavalo = Number(inCavalo.value);
  const valor = Number(inValor.value);

  if (!validarCavalo(cavalo)) {
    mostrarMensagem("Informe um número de cavalo válido entre 1 e 6.", "erro");

    inCavalo.focus();
    return;
  }

  if (inValor.value.trim() === "" || !Number.isFinite(valor) || valor <= 0) {
    mostrarMensagem("Informe um valor de aposta maior que zero.", "erro");

    inValor.focus();
    return;
  }

  apostas.push({
    cavalo: cavalo,
    valor: valor,
  });

  exibirApostas();

  mostrarMensagem(`Aposta em ${obterCavalo(cavalo)} adicionada!`, "sucesso");

  formAposta.reset();
  outCavalo.textContent = "";

  inCavalo.focus();
}

/*
  Solicita o cavalo ganhador e exibe
  o resumo final do páreo.
*/
function ganhadorPareo() {
  if (apostas.length === 0) {
    mostrarMensagem(
      "Realize pelo menos uma aposta antes de informar o ganhador.",
      "erro",
    );

    return;
  }

  const numeroInformado = prompt(
    `Digite o número do cavalo ganhador:\n\n` +
      CAVALOS.map(function (nome, indice) {
        return `${indice + 1} - ${nome}`;
      }).join("\n"),
  );

  if (numeroInformado === null) {
    return;
  }

  const ganhador = Number(numeroInformado);

  if (!validarCavalo(ganhador)) {
    mostrarMensagem("Número do cavalo ganhador inválido.", "erro");

    return;
  }

  resultadoGanhador.textContent = `Cavalo ${ganhador} — ${obterCavalo(ganhador)}`;

  resultadoQuantidade.textContent = apostas.length;

  resultadoTotalGeral.textContent = formatarMoeda(totalizarGeral());

  resultadoApostasGanhador.textContent = contarApostas(ganhador);

  resultadoTotalGanhador.textContent = formatarMoeda(
    totalizarApostas(ganhador),
  );

  resultadoFinal.classList.remove("oculto");

  btApostar.disabled = true;
  btGanhador.disabled = true;

  inCavalo.disabled = true;
  inValor.disabled = true;

  btNovo.focus();
}

/*
  Inicia um novo páreo sem precisar
  recarregar manualmente a página.
*/
function novoPareo() {
  const confirmar = confirm(
    "Deseja apagar todas as apostas e iniciar um novo páreo?",
  );

  if (!confirmar) {
    return;
  }

  apostas = [];

  formAposta.reset();

  inCavalo.disabled = false;
  inValor.disabled = false;

  btApostar.disabled = false;
  btGanhador.disabled = false;

  outCavalo.textContent = "";
  resultadoFinal.classList.add("oculto");

  exibirApostas();

  mostrarMensagem("Novo páreo iniciado.", "sucesso");

  inCavalo.focus();
}

formAposta.addEventListener("submit", adicionarAposta);

inCavalo.addEventListener("blur", mostrarCavalo);

inCavalo.addEventListener("input", function () {
  if (inCavalo.value.trim() === "") {
    outCavalo.textContent = "";
    return;
  }

  mostrarCavalo();
});

btGanhador.addEventListener("click", ganhadorPareo);
btNovo.addEventListener("click", novoPareo);

exibirCavalos();
exibirApostas();
