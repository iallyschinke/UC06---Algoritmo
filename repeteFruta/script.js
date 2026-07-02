const formFruta = document.getElementById("formFruta");
const resultado = document.getElementById("resultado");

formFruta.addEventListener("submit", function (evento) {
  // Impede que a página seja recarregada
  evento.preventDefault();

  const fruta = document.getElementById("nomeFruta").value.trim();

  const quantidade = Number(document.getElementById("quantidade").value);

  if (fruta === "" || quantidade < 1) {
    resultado.textContent =
      "Informe uma fruta e uma quantidade maior que zero.";

    return;
  }

  let listaDeFrutas = "";

  for (let contador = 1; contador <= quantidade; contador++) {
    listaDeFrutas += fruta;
    if (contador < quantidade) {
      listaDeFrutas += "*";
    }
  }

  resultado.textContent = listaDeFrutas;
});
