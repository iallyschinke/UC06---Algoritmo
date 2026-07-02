const campoNumero = document.getElementById("numero");
const botaoVerificar = document.getElementById("btnVerificar");
const resultado = document.getElementById("resultado");

botaoVerificar.addEventListener("click", function () {
  const numero = Number(campoNumero.value);

  if (campoNumero.value === "") {
    resultado.textContent = "Digite um número.";
    return;
  }

  // Complete a condição:
  // O resto da divisão do número por 2 deve ser igual a 0.
  if (numero % 2 === 0) {
    resultado.textContent = `O número ${numero} é par.`;
  } else {
    resultado.textContent = `O número ${numero} é ímpar.`;
  }
});
