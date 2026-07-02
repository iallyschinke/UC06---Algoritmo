const campoVelocidadePermitida = document.getElementById("velocidadePermitida");

const campoVelocidadeCondutor = document.getElementById("velocidadeCondutor");

const botaoVerificar = document.getElementById("btnVerificar");
const resultado = document.getElementById("resultado");

function verificarVelocidade() {
  const velocidadePermitida = Number(campoVelocidadePermitida.value);

  const velocidadeCondutor = Number(campoVelocidadeCondutor.value);

  if (
    campoVelocidadePermitida.value === "" ||
    campoVelocidadeCondutor.value === ""
  ) {
    resultado.textContent = "Preencha os dois campos.";
    return;
  }

  if (velocidadePermitida <= 0 || velocidadeCondutor < 0) {
    resultado.textContent = "Digite velocidades válidas.";
    return;
  }

  // Calcula 120% da velocidade permitida
  const limiteMultaLeve = velocidadePermitida * 1.2;

  if (velocidadeCondutor <= velocidadePermitida) {
    resultado.textContent = "Sem Multa";
  } else if (velocidadeCondutor <= limiteMultaLeve) {
    resultado.textContent = "Multa Leve";
  } else {
    resultado.textContent = "Multa Grave";
  }
}

botaoVerificar.addEventListener("click", verificarVelocidade);

campoVelocidadeCondutor.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    verificarVelocidade();
  }
});
