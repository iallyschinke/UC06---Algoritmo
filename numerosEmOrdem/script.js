// Vetor que armazenará os números
const numeros = [];

// Localiza os elementos da página
const formNumero = document.getElementById("formNumero");
const campoNumero = document.getElementById("numero");
const listaNumeros = document.getElementById("listaNumeros");
const resultado = document.getElementById("resultado");
const btnVerificar = document.getElementById("btnVerificar");
const btnLimpar = document.getElementById("btnLimpar");

/*
  Função responsável por mostrar na página
  os números armazenados no vetor.
*/

function mostrarNumeros() {
  // Limpa a lista antes de criá-la novamente
  listaNumeros.innerHTML = "";

  // Percorre todas as posições do vetor
  for (let indice = 0; indice < numeros.length; indice++) {
    // Cria um item de lista
    const item = document.createElement("li");

    // Coloca o número dentro do item
    item.textContent = numeros[indice];

    // Adiciona o item á lista HTML
    listaNumeros.appendChild(item);
  }
}

/*
  Evento executado ao enviar o formulário.
*/

formNumero.addEventListener("submit", function (evento) {
  // Impede que a página seja recarregada
  evento.preventDefault();

  // Converte o valor digitado para número
  const numeroInformado = Number(campoNumero.value);

  /*
    O indexOf() procura o valor dentro do vetor.

    Caso não encontre, ele retorna -1.
    Caso encontre, retorna a posição do número.
  */

  if (numeros.indexOf(numeroInformado) !== -1) {
    alert("Esse número já foi adicionado.");

    campoNumero.focus();
    return;
  }

  // Adiciona o número ao final do vetor
  numeros.push(numeroInformado);

  // Atualiza a lista exibida na página
  mostrarNumeros();

  // Limpa resultados anteriores
  resultado.textContent = "";
  resultado.className = "";

  // Limpa o campo
  campoNumero.value = "";

  // Coloca o cursor novamente no campo
  campoNumero.focus();
});

/*
  Evento executado ao clicar no botão
  "Verificar ordem".
*/

btnVerificar.addEventListener("click", function () {
  // Verifica se existem pelo menos dois números
  if (numeros.length < 2) {
    resultado.textContent =
      "Adicione pelo menos dois números para verificar a ordem.";
    resultado.className = "resultado-erro";
    return;
  }

  /*
    Começamos supondo que os números
    estão em ordem crescente.
  */

  let estaEmOrdem = true;

  /*
    O laço vai até a penúltima posição,
    pois cada número será comparado com o próximo.
  */

  for (let indice = 0; indice < numeros.length - 1; indice++) {
    /*
      Complete a comparação.

      A ordem deixa de ser crescente quando
      o número atual for maior que o próximo.
    */
    if (numeros[indice] > numeros[indice + 1]) {
      estaEmOrdem = false;
      // Interrompe o laço porque já encontrou um erro
      break;
    }
  }

  // Verifica o resultado da comparação
  if (estaEmOrdem) {
    resultado.textContent = "Os número estão em ordem crescente.";

    resultado.className = "resultado-correto";
  } else {
    resultado.textContent = "Os números não estão em ordem crescente.";

    resultado.className = "resultado-erro";
  }
});

/*
  Evento executado ao clicar no botão
  "Limpar lista".
*/

btnLimpar.addEventListener("click", function () {
  // Remove todos os elementos do vetor
  numeros.length = 0;

  // Limpa os elementos exibidos na página
  listaNumeros.innerHTML = "";
  resultado.textContent = "";
  resultado.className = "";

  // Limpa e seleciona novamente o campo
  campoNumero.value = "";
  campoNumero.focus();
});
