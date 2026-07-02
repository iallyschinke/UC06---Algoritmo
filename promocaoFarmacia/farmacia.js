function mostrarPromocao() {
  //1. Referencia os elementos de entrada e saída
  let inMedicamento = document.getElementById("inMedicamento");
  let inPreco = document.getElementById("inPreco");
  let outMedicamento = document.getElementById("outMedicamento");
  let outPromocao = document.getElementById("outPromocao");

  //2. Obtém os conteúdos dos campos
  let medicamento = inMedicamento.value;
  let preco = Number(inPreco.value);

  //3. Calcula o valor total e o valor com desconto
  // O desconto são os centavos, então arredondamos para baixo
  let total = preco * 2;
  let promocao = Math.floor(total);

  //4. Exibe as respostas
  outMedicamento.textContent = "Promoção de " + medicamento;
  outPromocao.textContent = "Leve 2 por apenas R$: " + promocao.toFixed(2);
}

//5. Cria a referência ao botão e o ouvinte de evento
let btMostrar = document.getElementById("btMostrar");
btMostrar.addEventListener("click", mostrarPromocao);
