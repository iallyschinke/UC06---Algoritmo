const inputNome = document.querySelector("input");
const botao = document.querySelector("button");
const mensagem = document.querySelectorAll("p")[1];

function mostrarNome() {
  const nome = inputNome.value.trim();

  if (nome === "") {
    mensagem.textContent = "Digite seu nome!";
    return;
  }

  mensagem.textContent = `Olá ${nome}`;
}

botao.addEventListener("click", mostrarNome);

inputNome.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    mostrarNome();
  }
});
