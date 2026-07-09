const POLTRONAS = 240;
const POLTRONAS_POR_FILEIRA = 24;
const POLTRONAS_POR_LADO = 12;

let reservadas = [];

const inPoltrona = document.getElementById("inPoltrona");

const btReservar = document.getElementById("btReservar");
const btConfirmar = document.getElementById("btConfirmar");
const btLimpar = document.getElementById("btLimpar");
const btRestaurar = document.getElementById("btRestaurar");

const mapaPoltronas = document.getElementById("mapaPoltronas");
const mensagem = document.getElementById("mensagem");

const totalReservadas = document.getElementById("totalReservadas");
const totalOcupadas = document.getElementById("totalOcupadas");
const totalDisponiveis = document.getElementById("totalDisponiveis");

/*
  Recupera as poltronas ocupadas salvas
  no localStorage.
*/
function obterOcupadas() {
  const dadosSalvos = localStorage.getItem("teatroOcupadas");

  if (!dadosSalvos) {
    return [];
  }

  try {
    const ocupadas = JSON.parse(dadosSalvos);

    if (Array.isArray(ocupadas)) {
      return ocupadas;
    }

    return [];
  } catch (erro) {
    return [];
  }
}

/*
  Salva as poltronas ocupadas no navegador.
*/
function salvarOcupadas(ocupadas) {
  localStorage.setItem("teatroOcupadas", JSON.stringify(ocupadas));
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
  Atualiza os números do resumo.
*/
function atualizarResumo() {
  const ocupadas = obterOcupadas();

  totalReservadas.textContent = reservadas.length;
  totalOcupadas.textContent = ocupadas.length;

  totalDisponiveis.textContent =
    POLTRONAS - ocupadas.length - reservadas.length;
}

/*
  Retorna o elemento correspondente
  ao número de uma poltrona.
*/
function obterElementoPoltrona(numero) {
  return document.querySelector(`[data-poltrona="${numero}"]`);
}

/*
  Cria as 240 poltronas pelo JavaScript.
*/
function montarTeatro() {
  const ocupadas = obterOcupadas();

  mapaPoltronas.innerHTML = "";

  for (let numero = 1; numero <= POLTRONAS; numero++) {
    const posicaoNaFileira = (numero - 1) % POLTRONAS_POR_FILEIRA;

    /*
      Cria o espaço central do corredor.
    */
    if (posicaoNaFileira === POLTRONAS_POR_LADO) {
      const corredor = document.createElement("div");
      corredor.classList.add("corredor");

      mapaPoltronas.appendChild(corredor);
    }

    const poltrona = document.createElement("button");

    poltrona.type = "button";
    poltrona.classList.add("poltrona");

    poltrona.dataset.poltrona = numero;

    poltrona.textContent = String(numero).padStart(3, "0");
    poltrona.title = `Poltrona ${numero}`;

    if (ocupadas.includes(numero)) {
      poltrona.classList.add("poltrona-ocupada");
      poltrona.disabled = true;
    } else if (reservadas.includes(numero)) {
      poltrona.classList.add("poltrona-reservada");
    } else {
      poltrona.classList.add("poltrona-disponivel");
    }

    poltrona.addEventListener("click", function () {
      inPoltrona.value = numero;
      reservarPoltrona();
    });

    mapaPoltronas.appendChild(poltrona);
  }

  atualizarResumo();
}

/*
  Valida o número de uma poltrona.
*/
function validarPoltrona(numero) {
  return Number.isInteger(numero) && numero >= 1 && numero <= POLTRONAS;
}

/*
  Seleciona uma poltrona para reserva.
*/
function reservarPoltrona() {
  const numero = Number(inPoltrona.value);
  const ocupadas = obterOcupadas();

  if (!validarPoltrona(numero)) {
    mostrarMensagem(`Informe uma poltrona entre 1 e ${POLTRONAS}.`, "erro");

    inPoltrona.focus();
    return;
  }

  if (ocupadas.includes(numero)) {
    mostrarMensagem(`A poltrona ${numero} já está ocupada.`, "erro");

    inPoltrona.select();
    return;
  }

  if (reservadas.includes(numero)) {
    mostrarMensagem(`A poltrona ${numero} já foi selecionada.`, "erro");

    inPoltrona.select();
    return;
  }

  reservadas.push(numero);

  reservadas.sort(function (a, b) {
    return a - b;
  });

  const elemento = obterElementoPoltrona(numero);

  elemento.classList.remove("poltrona-disponivel");
  elemento.classList.add("poltrona-reservada");

  mostrarMensagem(`Poltrona ${numero} selecionada.`, "sucesso");

  inPoltrona.value = "";
  inPoltrona.focus();

  atualizarResumo();
}

/*
  Confirma as poltronas selecionadas.
*/
function confirmarReserva() {
  if (reservadas.length === 0) {
    mostrarMensagem("Não existem poltronas selecionadas.", "erro");

    inPoltrona.focus();
    return;
  }

  const ocupadas = obterOcupadas();
  const quantidadeConfirmada = reservadas.length;

  reservadas.forEach(function (numero) {
    if (!ocupadas.includes(numero)) {
      ocupadas.push(numero);
    }

    const elemento = obterElementoPoltrona(numero);

    elemento.classList.remove("poltrona-reservada");
    elemento.classList.add("poltrona-ocupada");

    elemento.disabled = true;
  });

  ocupadas.sort(function (a, b) {
    return a - b;
  });

  salvarOcupadas(ocupadas);

  reservadas = [];

  mostrarMensagem(
    `${quantidadeConfirmada} reserva(s) confirmada(s).`,
    "sucesso",
  );

  atualizarResumo();
  inPoltrona.focus();
}

/*
  Remove apenas as poltronas azuis
  ainda não confirmadas.
*/
function limparSelecao() {
  if (reservadas.length === 0) {
    mostrarMensagem("Não existem poltronas selecionadas.", "erro");

    return;
  }

  reservadas.forEach(function (numero) {
    const elemento = obterElementoPoltrona(numero);

    elemento.classList.remove("poltrona-reservada");
    elemento.classList.add("poltrona-disponivel");
  });

  reservadas = [];

  mostrarMensagem("Seleção de poltronas removida.", "sucesso");

  atualizarResumo();
  inPoltrona.focus();
}

/*
  Apaga todas as reservas confirmadas
  e selecionadas, retornando a sessão
  ao estado inicial.
*/
function restaurarTodaSessao() {
  const confirmar = confirm(
    "Deseja apagar todas as reservas confirmadas e restaurar toda a sessão?",
  );

  if (!confirmar) {
    return;
  }

  /*
    Apaga todas as reservas confirmadas
    salvas no navegador.
  */
  localStorage.removeItem("teatroOcupadas");

  /*
    Limpa também as poltronas selecionadas
    que ainda não foram confirmadas.
  */
  reservadas = [];

  /*
    Limpa o campo de entrada.
  */
  inPoltrona.value = "";

  /*
    Reconstrói o mapa com todas
    as poltronas disponíveis.
  */
  montarTeatro();

  mostrarMensagem(
    "Toda a sessão foi restaurada. As 240 poltronas estão disponíveis.",
    "sucesso",
  );

  inPoltrona.focus();
}

btReservar.addEventListener("click", reservarPoltrona);

btConfirmar.addEventListener("click", confirmarReserva);

btLimpar.addEventListener("click", limparSelecao);

btRestaurar.addEventListener("click", restaurarTodaSessao);

inPoltrona.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    evento.preventDefault();

    reservarPoltrona();
  }
});

montarTeatro();
