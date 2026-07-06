// Localiza os elementos da página
const formCriptografia = document.getElementById("formCriptografia");
const campoMensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");
const btnLimpar = document.getElementById("btnLimpar");

/*
  Evento executado quando o formulário
  for enviado.
*/

formCriptografia.addEventListener("submit", function (evento) {
  // Impede o recarregamento da página
  evento.preventDefault();

  // Captura a mensagem exatamente como foi digitada
  const mensagemOriginal = campoMensagem.value;

  // Verifica se o usuário digitou apenas espaços
  if (mensagemOriginal.trim() === "") {
    resultado.textContent = "Digite uma mensagem válida.";
    campoMensagem.focus();
    return;
  }

  // Variável que armazenará a mensagem criptografada
  let mensagemCriptografada = "";

  /*
    Primeiro laço:
    percorre os índices ímpares da string.

    Começa no índice 1 e avança de 2 em 2:
    1, 3, 5, 7...
  */

  for (let indice = 1; indice < mensagemOriginal.length; indice += 2) {
    // charAt() retorna o caractere da posição informada
    mensagemCriptografada += mensagemOriginal.charAt(indice);
  }

  /*
    Segundo laço:
    percorre os índices pares da string.

    Começa no índice 0 e avança de 2 em 2:
    0, 2, 4, 6...
  */
  for (let indice = 0; indice < mensagemOriginal.length; indice += 2) {
    mensagemCriptografada += mensagemOriginal.charAt(indice);
  }

  // Exibe o texto criptografado
  resultado.textContent = mensagemCriptografada;
});

/*
Evento executado ao clicar no botão Limpar.
 */

btnLimpar.addEventListener("click", function () {
  // Limpa o campo e o resultado
  campoMensagem.value = "";
  resultado.textContent = "";

  // Coloca o cursor novamente no campo
  campoMensagem.focus();
});
