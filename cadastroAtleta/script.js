const formAtleta = document.getElementById("formAtleta");

const campoNome = document.getElementById("nomeAtleta");
const campoIdade = document.getElementById("idadeAtleta");

const resultado = document.getElementById("resultado");
const resultadoNome = document.getElementById("resultadoNome");
const resultadoTracos = document.getElementById("resultadoTracos");
const resultadoIdade = document.getElementById("resultadoIdade");
const resultadoCategoria = document.getElementById("resultadoCategoria");

const mensagemErro = document.getElementById("mensagemErro");
const btnLimpar = document.getElementById("btnLimpar");

/*
  Recebe o nome do atleta.

  Retorna um traço para cada letra do nome,
  mantendo os espaços originais.
*/
function retornarTracos(nome) {
  let tracos = "";

  for (let i = 0; i < nome.length; i++) {
    if (nome[i] === " ") {
      tracos += " ";
    } else {
      tracos += "-";
    }
  }

  return tracos;
}

/*
  Recebe a idade do atleta e retorna
  a categoria correspondente.
*/
function categorizarAtleta(idade) {
  if (idade <= 12) {
    return "Infantil";
  } else if (idade <= 18) {
    return "Juvenil";
  } else {
    return "Adulto";
  }
}

/*
  Executado quando o formulário é enviado.
*/
formAtleta.addEventListener("submit", function (evento) {
  // Impede o recarregamento da página
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const idade = Number(campoIdade.value);

  mensagemErro.textContent = "";
  resultado.classList.add("oculto");

  // Verifica se o nome foi preenchido
  if (nome === "") {
    mensagemErro.textContent = "Digite o nome do atleta.";
    campoNome.focus();
    return;
  }

  // Verifica se o nome contém apenas letras e espaços
  const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/;

  if (!nomeValido.test(nome)) {
    mensagemErro.textContent = "O nome deve conter apenas letras e espaços.";

    campoNome.focus();
    return;
  }

  // Verifica se a idade foi informada corretamente
  if (
    campoIdade.value === "" ||
    !Number.isInteger(idade) ||
    idade <= 0 ||
    idade > 120
  ) {
    mensagemErro.textContent = "Digite uma idade válida entre 1 e 120 anos.";

    campoIdade.focus();
    return;
  }

  const tracos = retornarTracos(nome);
  const categoria = categorizarAtleta(idade);

  resultadoNome.textContent = nome;
  resultadoTracos.textContent = tracos;
  resultadoIdade.textContent = `${idade} anos`;
  resultadoCategoria.textContent = categoria;

  resultado.classList.remove("oculto");
});

/*
  Limpa todos os campos e o resultado.
*/
btnLimpar.addEventListener("click", function () {
  formAtleta.reset();

  resultado.classList.add("oculto");
  mensagemErro.textContent = "";

  resultadoNome.textContent = "";
  resultadoTracos.textContent = "";
  resultadoIdade.textContent = "";
  resultadoCategoria.textContent = "";

  campoNome.focus();
});
