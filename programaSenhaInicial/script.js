const formAluno = document.getElementById("formAluno");
const campoNome = document.getElementById("nomeAluno");
const btnLimpar = document.getElementById("btnLimpar");

const mensagemErro = document.getElementById("mensagemErro");
const resultado = document.getElementById("resultado");

const resultadoNome = document.getElementById("resultadoNome");
const resultadoSobrenome = document.getElementById("resultadoSobrenome");
const resultadoVogais = document.getElementById("resultadoVogais");
const resultadoSenha = document.getElementById("resultadoSenha");

function validarNome(nome) {
  const nomeSemEspacosExtras = nome.trim();

  if (nomeSemEspacosExtras === "") {
    return false;
  }

  const partesNome = nomeSemEspacosExtras.split(/\s+/);

  if (partesNome.length < 2) {
    return false;
  }

  const somenteLetras = /^[A-Za-zÀ-ÿ\s]+$/;

  return somenteLetras.test(nomeSemEspacosExtras);
}

function obterSobrenome(nome) {
  const partesNome = nome.trim().split(/\s+/);

  return partesNome[partesNome.length - 1].toLowerCase();
}

function contarVogais(nome) {
  const vogaisEncontradas = nome.match(/[aeiouáàâãéèêíìîóòôõúùû]/gi);

  if (vogaisEncontradas === null) {
    return 0;
  }

  return vogaisEncontradas.length;
}

formAluno.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nomeCompleto = campoNome.value.trim();

  mensagemErro.textContent = "";
  resultado.classList.add("oculto");

  if (!validarNome(nomeCompleto)) {
    mensagemErro.textContent =
      "Digite o nome completo usando apenas letras e espaços.";

    campoNome.focus();
    return;
  }

  const sobrenome = obterSobrenome(nomeCompleto);
  const quantidadeVogais = contarVogais(nomeCompleto);

  const vogaisFormatadas = String(quantidadeVogais).padStart(2, "0");

  const senhaInicial = sobrenome + vogaisFormatadas;

  resultadoNome.textContent = nomeCompleto;
  resultadoSobrenome.textContent = sobrenome;
  resultadoVogais.textContent = vogaisFormatadas;
  resultadoSenha.textContent = senhaInicial;

  resultado.classList.remove("oculto");
});

btnLimpar.addEventListener("click", function () {
  formAluno.reset();

  mensagemErro.textContent = "";
  resultado.classList.add("oculto");

  resultadoNome.textContent = "";
  resultadoSobrenome.textContent = "";
  resultadoVogais.textContent = "";
  resultadoSenha.textContent = "";

  campoNome.focus();
});
