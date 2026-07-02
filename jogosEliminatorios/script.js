// Vetor que armazenará os nomes dos clubes
const clubes = [];

// Localiza os elementos da página
const formClube = document.getElementById("formClube");
const campoNome = document.getElementById("nomeClube");
const listaClubes = document.getElementById("listaClubes");
const resultado = document.getElementById("resultado");
const btnGerar = document.getElementById("btnGerar");
const btnLimpar = document.getElementById("btnLimpar");

/*
Função responsável por mostrar na página
todos os clubes que estão dentro do vetor
*/

function mostrarClubes() {
  // Limpa a lista antes de monta-lá novamente
  listaClubes.innerHTML = "";

  // Percorre o vetor de  clubes
  for (let indice = 0; indice < clubes.length; indice++) {
    // Cria um novo item de lista
    const item = document.createElement("li");

    // Adicona o nome do clube ao item
    item.textContent = clubes[indice];

    // Coloca o item dentro da lista
    listaClubes.appendChild(item);
  }
}

/*
Evento executado quando o formulário 
de cadastro for enviado
*/
formClube.addEventListener("submit", function (evento) {
  // Impede que a página seja recarregada
  evento.preventDefault();

  // Lê  o nome e remove espaços extras
  const nomeClube = campoNome.value.trim();

  // Verifica se o campo está vazio
  if (nomeClube === "") {
    alert("Informe o nome de um clube.");
    campoNome.focus();
    return;
  }

  // Verifica se o clube já foi cadastrado
  if (clubes.includes(nomeClube)) {
    alert("Esse clube já foi adicionado");
    campoNome.focus();
    return;
  }

  // Adiciona o clube ao final do vetor
  clubes.push(nomeClube);

  // Atualiza a lista exibida da página
  mostrarClubes();

  // Limpa resultados anteriores
  resultado.innerHTML = "";

  // Limpa o campo
  campoNome.value = "";

  // Coloca o cursor novamente no campo
  campoNome.focus();
});

/*
Evento executado quando o usuário 
clicar no botão "Gerar jogos" 
*/

btnGerar.addEventListener("click", function () {
  // Verifica se há pelo menos dois clubes
  if (clubes.length < 2) {
    resultado.textContent = "Cadastre pelo menos dois clubes.";

    return;
  }

  /* 
  O operador % retorna o resto da divisão
  
  Se a quantidade dividida por 2 tiver o resto diferente 
  de zero, significa que a quantidade é ímpar.*/

  if (clubes.length % 2 !== 0) {
    resultado.textContent =
      "Não é possível gerar os jogos. A quantidade de clubes é ímpar";

    return;
  }

  // Variável usada para montar os confrontos
  let tabelaJogos = "";

  /*
    Precisamos percorrer apenas metade do vetor.

    Exemplo com 6 clubes:
    índice 0 enfrenta índice 5
    índice 1 enfrenta índice 4
    índice 2 enfrenta índice 3
  */

  for (let indice = 0; indice < clubes.length / 2; indice++) {
    // Posição correspondente, começando pelo final do vetor
    const indiceAdversario = clubes.length - 1 - indice;

    // Clube localizado no início do vetor
    const primeiroClube = clubes[indice];

    // Clube localizado na posição correspondente do final
    const segundoClube = clubes[indiceAdversario];

    // Adiciona o confronto à tabela
    tabelaJogos += `<div class="jogo">
    ${primeiroClube} x ${segundoClube}
    </div>`;
  }

  // Exibe a tabela de jogos
  resultado.innerHTML = tabelaJogos;
});

/*
  Limpa todos os clubes cadastrados.
*/

btnLimpar.addEventListener("click", function () {
  // Remove todos os itens do vetor
  clubes.length = 0;

  // Limpa os elementos exibidos na página
  listaClubes.innerHTML = "";
  resultado.innerHTML = "";

  // Coloca o cursor no campo de nome
  campoNome.focus();
});
