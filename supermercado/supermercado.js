let inProduto = document.querySelector("#inProduto");
let inPreco = document.querySelector("#inPreco");
let btPromocao = document.querySelector("#btPromocao");
let outPromocao = document.querySelector("#outPromocao");
let outTotal = document.querySelector("#outTotal");

function mostrarPromocao() {
  let produto = inProduto.value.trim();
  let preco = Number(inPreco.value);

  if (produto === "" || preco <= 0) {
    alert("Informe corretamente o produto e o preço.");
    return;
  }

  let terceiroProduto = preco * 0.5;
  let total = preco * 2 + terceiroProduto;

  outPromocao.innerText = `${produto} - Promoção: leve 3 por ${total.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    },
  )}`;

  outTotal.innerText = `O 3º produto custa apenas ${terceiroProduto.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    },
  )}`;
}

btPromocao.addEventListener("click", mostrarPromocao);
