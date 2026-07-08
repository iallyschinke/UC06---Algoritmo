const formNome = document.getElementById("formNome");
const campoNome = document.getElementById("nomeCompleto");

const btnLimpar = document.getElementById("btnLimpar");

const mensagemErro = document.getElementById("mensagemErro");
const resultado = document.getElementById("resultado");
const partesNome = document.getElementById("partesNome");

/*
  Gera uma cor aleatória no formato hexadecimal.

  Exemplo:
  #e63946
  #22c55e
  #8b5cf6
*/
function gerarCorAleatoria() {
  const caracteres = "0123456789ABCDEF";
  let cor = "#";

  for (let i = 0; i < 6; i++) {
    const posicaoAleatoria = Math.floor(Math.random() * caracteres.length);

    cor += caracteres[posicaoAleatoria];
  }

  return cor;
}

/*
  Exclui todos os cabeçalhos h3
  que já foram criados anteriormente.
*/
function excluirCabecalhos() {
  const cabecalhos = partesNome.querySelectorAll("h3");

  cabecalhos.forEach(function (cabecalho) {
    cabecalho.remove();
  });
}

/*
  Cria uma tag h3 para cada parte do nome.
*/
function exibirPartesDoNome(nome) {
  /*
    Primeiro apaga os resultados anteriores.
  */
  excluirCabecalhos();

  /*
    O split separa o nome pelos espaços.

    Exemplo:
    "Ially Leão Schinke"

    Resultado:
    ["Ially", "Leão", "Schinke"]
  */
  const partes = nome.trim().split(/\s+/);

  partes.forEach(function (parte) {
    const titulo = document.createElement("h3");

    titulo.textContent = parte;
    titulo.style.color = gerarCorAleatoria();

    partesNome.appendChild(titulo);
  });
}

formNome.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nome = campoNome.value.trim();

  mensagemErro.textContent = "";
  resultado.classList.add("oculto");

  /*
    Remove os h3 antigos antes de validar
    ou mostrar um novo resultado.
  */
  excluirCabecalhos();

  if (nome === "") {
    mensagemErro.textContent = "Digite um nome antes de continuar.";

    campoNome.focus();
    return;
  }

  const somenteLetras = /^[A-Za-zÀ-ÿ\s]+$/;

  if (!somenteLetras.test(nome)) {
    mensagemErro.textContent = "Digite apenas letras e espaços.";

    campoNome.focus();
    return;
  }

  exibirPartesDoNome(nome);

  resultado.classList.remove("oculto");
});

btnLimpar.addEventListener("click", function () {
  formNome.reset();

  excluirCabecalhos();

  mensagemErro.textContent = "";
  resultado.classList.add("oculto");

  campoNome.focus();
});
