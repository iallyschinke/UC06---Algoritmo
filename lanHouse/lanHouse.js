let inPreco = document.querySelector("#inPreco");
let inTempo = document.querySelector("#inTempo");
let btCalcular = document.querySelector("#btCalcular");
let outResposta = document.querySelector("#outResposta");

function calcularValor() {
  let preco = Number(inPreco.value);
  let tempo = Number(inTempo.value);

  if (preco <= 0 || tempo <= 0) {
    alert("Informe um preço e um tempo válidos.");
    return;
  }

  let periodos = Math.ceil(tempo / 15);
  let valorTotal = periodos * preco;

  outResposta.innerText = `Valor a pagar: ${valorTotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })}`;
}

btCalcular.addEventListener("click", calcularValor);
