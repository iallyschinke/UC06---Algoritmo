// Vetor que armazenará os objetos dos candidatos
const candidatos = [];

// Localiza os elementos da página
const formCandidato = document.getElementById("formCandidato");
const campoNome = document.getElementById("nomeCandidato");
const campoAcertos = document.getElementById("numeroAcertos");
const listaCandidatos = document.getElementById("listaCandidatos");
const campoNotaCorte = document.getElementById("notaCorte");
const btnAprovados = document.getElementById("btnAprovados");
const btnLimpar = document.getElementById("btnLimpar");
const resultado = document.getElementById("resultado");

/*
  Mostra na página todos os candidatos
  que estão armazenados no vetor.
*/
function mostrarCandidatos() {
  // Limpa a lista antes de montá-la novamente
  listaCandidatos.innerHTML = "";

  // Percorre todos os candidatos do vetor
  for (let indice = 0; indice < candidatos.length; indice++) {
    // Cria um item de lista
    const item = document.createElement("li");

    // Obtém o candidato da posição atual
    const candidato = candidatos[indice];

    // Exibe o nome e o número de acertos
    item.textContent = `${candidato.nome} — ${candidato.acertos} acertos`;

    // Adiciona o item à lista
    listaCandidatos.appendChild(item);
  }
}

/*
  Evento executado quando o formulário
  de cadastro for enviado.
*/
formCandidato.addEventListener("submit", function (evento) {
  // Impede que a página seja recarregada
  evento.preventDefault();

  // Captura o nome informado
  const nome = campoNome.value.trim();

  // Converte o valor para número
  const acertos = Number(campoAcertos.value);

  // Verifica se os dados são válidos
  if (nome === "" || campoAcertos.value === "" || acertos < 0) {
    alert("Informe corretamente o nome e o número de acertos.");

    return;
  }

  /*
    Cria um objeto com os dados do candidato.

    Cada objeto possui duas propriedades:
    nome e acertos.
  */
  const candidato = {
    nome: nome,
    acertos: acertos,
  };

  // Adiciona o objeto ao vetor
  candidatos.push(candidato);

  // Atualiza a lista exibida na página
  mostrarCandidatos();

  // Limpa resultados anteriores
  resultado.innerHTML = "";
  resultado.className = "";

  // Limpa os campos
  campoNome.value = "";
  campoAcertos.value = "";

  // Coloca o cursor novamente no campo de nome
  campoNome.focus();
});

/*
  Evento executado ao clicar no botão
  "Mostrar aprovados".
*/
btnAprovados.addEventListener("click", function () {
  // Verifica se existem candidatos cadastrados
  if (candidatos.length === 0) {
    resultado.textContent = "Cadastre pelo menos um candidato.";

    resultado.className = "aviso";
    return;
  }

  // Verifica se a nota de corte foi informada
  if (campoNotaCorte.value === "") {
    resultado.textContent = "Informe a nota de corte.";

    resultado.className = "aviso";
    campoNotaCorte.focus();
    return;
  }

  // Converte a nota de corte para número
  const notaCorte = Number(campoNotaCorte.value);

  // Impede uma nota negativa
  if (notaCorte < 0) {
    resultado.textContent = "A nota de corte não pode ser negativa.";

    resultado.className = "aviso";
    return;
  }

  /*
    O filter() cria um novo vetor apenas com
    os candidatos que atingiram a nota de corte.
  */
  const aprovados = candidatos.filter(function (candidato) {
    return candidato.acertos >= notaCorte;
  });

  // Verifica se alguém foi aprovado
  if (aprovados.length === 0) {
    resultado.textContent = "Nenhum candidato atingiu a nota de corte.";

    resultado.className = "aviso";
    return;
  }

  /*
    Ordena os aprovados pela pontuação.

    Para ordem decrescente, precisamos subtrair
    os acertos do segundo candidato pelos acertos
    do primeiro.
  */
  aprovados.sort(function (primeiro, segundo) {
    return segundo.acertos - primeiro.acertos;
  });

  // Variável usada para montar a relação de aprovados
  let listaAprovados = "";

  // Percorre os candidatos já filtrados e ordenados
  for (let indice = 0; indice < aprovados.length; indice++) {
    const candidato = aprovados[indice];

    listaAprovados += `
      <div class="aprovado">
        <strong>${indice + 1}º — ${candidato.nome}</strong>

        <span>${candidato.acertos} acertos</span>
      </div>
    `;
  }

  // Exibe os candidatos aprovados
  resultado.innerHTML = listaAprovados;

  // Remove a classe de aviso, caso ela tenha sido usada
  resultado.className = "";
});

/*
  Evento executado ao clicar no botão
  "Limpar dados".
*/
btnLimpar.addEventListener("click", function () {
  // Remove todos os objetos do vetor
  candidatos.length = 0;

  // Limpa os elementos da página
  listaCandidatos.innerHTML = "";
  resultado.innerHTML = "";
  resultado.className = "";

  // Limpa os campos
  campoNome.value = "";
  campoAcertos.value = "";
  campoNotaCorte.value = "";

  // Coloca o cursor novamente no campo de nome
  campoNome.focus();
});
