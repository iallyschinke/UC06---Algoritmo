const formReferencia = document.getElementById("formReferencia");
const campoNome = document.getElementById("nomeAutor");
const resultado = document.getElementById("resultado");
const btnLimpar = document.getElementById("btnLimpar");

/*
  Evento executado quando o formulário
  for enviado.
*/

formReferencia.addEventListener("submit", function (evento) {
  // Impede que a página seja recarregada
  evento.preventDefault();

  // Captura o nome e remove espaços do início e do final
  const nomeCompleto = campoNome.value.trim();

  // Verifica se o usuário informou um nome válido
  if (nomeCompleto === "") {
    resultado.textContent = "Digite o nome completo do autor.";
    campoNome.focus();
    return;
  }

  /*
    Divide o nome em um vetor.

    Exemplo:
    "Maurício Samy Silva"

    Resultado:
    ["Maurício", "Samy", "Silva"]
  */

  const partesNome = nomeCompleto.split(" ");

  /*
    O filter() remove possíveis posições vazias.

    Isso evita problemas quando o usuário digita
    vários espaços entre os nomes.
  */

  const nomes = partesNome.filter(function (parte) {
    return parte !== "";
  });

  // Verifica se foi informado nome e sobrenome
  if (nomes.length < 2) {
    resultado.textContent = "Informe pelo menos um nome e um sobrenome.";

    campoNome.focus();
    return;
  }

  const sobrenome = nomes[nomes.length - 1].toUpperCase();

  let iniciais = "";

  for (let indice = 0; indice < nomes.length - 1; indice++) {
    iniciais += nomes[indice].charAt(0).toUpperCase() + ".";
  }

  const referencia = `${sobrenome}, ${iniciais}`;

  resultado.textContent = referencia;
});

btnLimpar.addEventListener("click", function () {
  campoNome.value = "";
  resultado.textContent = "";

  campoNome.focus();
});
