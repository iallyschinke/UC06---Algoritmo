const formIdade = document.getElementById("formIdade");
const campoIdade = document.getElementById("idade");
const btnLimpar = document.getElementById("btnLimpar");

const mensagemErro = document.getElementById("mensagemErro");
const resultado = document.getElementById("resultado");
const velas = document.getElementById("velas");
const idadeResultado = document.getElementById("idadeResultado");

/*
  Cria as imagens correspondentes aos
  algarismos da idade informada.
*/
function inserirVelas(idade) {
  // Converte a idade em texto.
  const idadeEmTexto = String(idade);

  // Limpa as imagens anteriores.
  velas.innerHTML = "";

  /*
    Percorre cada algarismo da idade.

    Exemplo:
    25 será percorrido como "2" e "5".
  */
  for (let i = 0; i < idadeEmTexto.length; i++) {
    const algarismo = idadeEmTexto[i];

    const imagem = document.createElement("img");

    imagem.src = `img/vela-${algarismo}.svg`;
    imagem.alt = `Vela com o número ${algarismo}`;
    imagem.classList.add("imagem-vela");

    velas.appendChild(imagem);
  }
}

/*
  Valida se a idade está entre
  1 e 120 anos.
*/
function validarIdade(idade) {
  return Number.isInteger(idade) && idade >= 1 && idade <= 120;
}

formIdade.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const idade = Number(campoIdade.value);

  mensagemErro.textContent = "";
  resultado.classList.add("oculto");

  if (campoIdade.value.trim() === "" || !validarIdade(idade)) {
    mensagemErro.textContent = "Digite uma idade inteira entre 1 e 120 anos.";

    campoIdade.focus();
    return;
  }

  inserirVelas(idade);

  idadeResultado.textContent = `${idade} anos`;

  resultado.classList.remove("oculto");
});

btnLimpar.addEventListener("click", function () {
  formIdade.reset();

  velas.innerHTML = "";
  idadeResultado.textContent = "";
  mensagemErro.textContent = "";

  resultado.classList.add("oculto");

  campoIdade.focus();
});
