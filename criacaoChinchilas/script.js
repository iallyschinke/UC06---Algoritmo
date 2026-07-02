// Localiza o formulário
const formChinchilas = document.getElementById("formChinchilas");

// Localiza a área onde o resultado será exibido
const resultado = document.getElementById("resultado");

// Escuta o envio do formulário
formChinchilas.addEventListener("submit", function (evento) {
  // Impede o recarregamento da página
  evento.preventDefault();

  // Declara a variável fora do do...while,
  // pois ela será usada depois da repetição
  let quantidadeInicial;

  /*
    O bloco "do" é executado pelo menos uma vez.

    Caso o valor seja menor que 2, o programa
    solicita novamente uma quantidade.
  */
  do {
    quantidadeInicial = Number(
      document.getElementById("quantidadeInicial").value,
    );

    if (quantidadeInicial < 2) {
      alert("A quantidade inicial deve ser de pelo menos 2 chinchilas.");

      // Solicita um novo valor
      quantidadeInicial = Number(prompt("Informe pelo menos 2 chinchilas:"));

      // Atualiza o campo do formulário
      document.getElementById("quantidadeInicial").value = quantidadeInicial;
    }
  } while (quantidadeInicial < 2);

  // Captura a quantidade de anos
  const anos = Number(document.getElementById("anos").value);

  // Valida a quantidade de anos
  if (anos < 1) {
    resultado.textContent = "Informe uma quantidade de anos maior que zero.";

    return;
  }

  // Guarda a quantidade atual de chinchilas
  let quantidadeAtual = quantidadeInicial;

  // Inicia o texto do resultado
  let mensagem = "";

  // Controla o ano atual
  let anoAtual = 1;

  /*
    O while executa enquanto o ano atual
    for menor ou igual ao período informado.
  */
  while (anoAtual <= anos) {
    // Adiciona os dados do ano atual ao resultado
    mensagem += `
      <p>
        ${anoAtual}º ano: ${quantidadeAtual} chinchilas
      </p>
    `;

    /*
      A quantidade deve triplicar para o próximo ano.

      Complete a linha usando o operador de multiplicação:
      quantidadeAtual = quantidadeAtual ___ 3;
    */

    quantidadeAtual = quantidadeAtual * 3;

    // Avança para o próximo ano
    anoAtual++;
  }

  // Exibe o resultado na página
  resultado.innerHTML = mensagem;
});
