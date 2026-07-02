const formulario = document.getElementById("formParquimetro");
const campoValor = document.getElementById("valorInserido");
const resultado = document.getElementById("resultado");

function calcularParquimetro() {
  const valorInserido = Number(campoValor.value);

  if (campoValor.value === "") {
    resultado.textContent = "Informe um valor.";
    return;
  }

  if (valorInserido < 0) {
    resultado.textContent = "O valor não pode ser negativo.";
    return;
  }

  let tempo;
  let valorCobrado;

  if (valorInserido < 1) {
    resultado.textContent = "Valor insuficiente.";
    return;
  } else if (valorInserido < 1.75) {
    tempo = 30;
    valorCobrado = 1;
  } else if (valorInserido < 3) {
    tempo = 60;
    valorCobrado = 1.75;
  } else {
    tempo = 120;
    valorCobrado = 3;
  }

  const troco = valorInserido - valorCobrado;

  resultado.textContent =
    `Tempo de permanência: ${tempo} minutos. ` +
    `Troco: R$ ${troco.toFixed(2).replace(".", ",")}.`;
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  calcularParquimetro();
});
