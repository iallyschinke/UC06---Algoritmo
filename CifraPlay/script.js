const CHAVE_MUSICAS = "cifraPlayMusicas";

const formMusica = document.getElementById("formMusica");

const inTitulo = document.getElementById("inTitulo");
const inArtista = document.getElementById("inArtista");
const inTom = document.getElementById("inTom");
const inCategoria = document.getElementById("inCategoria");
const inCifra = document.getElementById("inCifra");

const btLimpar = document.getElementById("btLimpar");
const btRestaurar = document.getElementById("btRestaurar");

const mensagem = document.getElementById("mensagem");

const outTotalMusicas = document.getElementById("outTotalMusicas");
const outMusicaAberta = document.getElementById("outMusicaAberta");
const outTomAtual = document.getElementById("outTomAtual");

const inPesquisa = document.getElementById("inPesquisa");
const listaMusicas = document.getElementById("listaMusicas");
const cifraAberta = document.getElementById("cifraAberta");

let musicaAtual = null;

function obterMusicas() {
  const dados = localStorage.getItem(CHAVE_MUSICAS);

  if (!dados) {
    return [];
  }

  try {
    const musicas = JSON.parse(dados);

    if (Array.isArray(musicas)) {
      return musicas;
    }

    return [];
  } catch (erro) {
    return [];
  }
}

function salvarMusicas(musicas) {
  localStorage.setItem(CHAVE_MUSICAS, JSON.stringify(musicas));
}

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;

  mensagem.classList.remove("erro", "sucesso");
  mensagem.classList.add(tipo);

  setTimeout(function () {
    mensagem.textContent = "";
    mensagem.classList.remove("erro", "sucesso");
  }, 2600);
}

function atualizarResumo() {
  const musicas = obterMusicas();

  outTotalMusicas.textContent = musicas.length;

  if (musicaAtual === null) {
    outMusicaAberta.textContent = "Nenhuma";
    outTomAtual.textContent = "-";
  }
}

/*
  Evita que caracteres especiais quebrem o HTML.
*/
function escaparHTML(texto) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/*
  Verifica se um pedaço de texto parece ser um acorde.
  Exemplos aceitos:
  C
  Dm
  F#m7
  G7(#11)
  C7(9)
  D6/9
  A7(4/9)
  F°
  G7M
  Bm7(b5)
*/
function pareceAcorde(texto) {
  const acorde = texto.trim();

  if (acorde === "") {
    return false;
  }

  const regexAcorde =
    /^[A-G](#|b)?(m|M|maj|min|dim|aug|sus|add)?[0-9M]*(\([^)]*\))?(\/[A-G](#|b)?)?(\/[0-9]+)?(°)?$/;

  return regexAcorde.test(acorde);
}

/*
  Verifica se uma linha parece ser uma linha de acordes.
  A linha de acordes normalmente possui poucas palavras
  e quase todos os elementos são acordes ou barras.
*/
function pareceLinhaDeAcordes(linha) {
  const texto = linha.trim();

  if (texto === "") {
    return false;
  }

  const partes = texto.split(/\s+/);

  let totalPartesValidas = 0;

  for (let i = 0; i < partes.length; i++) {
    const parte = partes[i];

    if (parte === "/" || pareceAcorde(parte)) {
      totalPartesValidas++;
    }
  }

  return totalPartesValidas === partes.length;
}

/*
  Destaca acordes em dois formatos:

  1) Formato com colchetes:
     [Em] Hoje eu acordei

  2) Formato tradicional:
     D6/9          C7(9)
        Subi ladei--ra
*/
function destacarAcordes(texto) {
  const textoSeguro = escaparHTML(texto);
  const linhas = textoSeguro.split("\n");

  const linhasFormatadas = linhas.map(function (linha) {
    /*
      Primeiro caso:
      acordes escritos entre colchetes.
    */
    if (linha.includes("[") && linha.includes("]")) {
      return linha.replace(/\[([^\]]+)\]/g, function (_, acorde) {
        return `<span class="acorde">${acorde}</span>`;
      });
    }

    /*
      Segundo caso:
      linhas inteiras compostas por acordes.
    */
    if (pareceLinhaDeAcordes(linha)) {
      return linha.replace(/\S+/g, function (trecho) {
        if (trecho === "/") {
          return trecho;
        }

        if (pareceAcorde(trecho)) {
          return `<span class="acorde">${trecho}</span>`;
        }

        return trecho;
      });
    }

    /*
      Linha comum de letra.
    */
    return linha;
  });

  return linhasFormatadas.join("\n");
}

function cadastrarMusica(evento) {
  evento.preventDefault();

  const titulo = inTitulo.value.trim();
  const artista = inArtista.value.trim();
  const tom = inTom.value;
  const categoria = inCategoria.value;
  const cifra = inCifra.value.trim();

  if (titulo === "") {
    mostrarMensagem("Informe o nome da música.", "erro");
    inTitulo.focus();
    return;
  }

  if (artista === "") {
    mostrarMensagem("Informe o nome do artista.", "erro");
    inArtista.focus();
    return;
  }

  if (tom === "") {
    mostrarMensagem("Selecione o tom da música.", "erro");
    inTom.focus();
    return;
  }

  if (categoria === "") {
    mostrarMensagem("Selecione a categoria da música.", "erro");
    inCategoria.focus();
    return;
  }

  if (cifra === "") {
    mostrarMensagem("Informe a letra com acordes.", "erro");
    inCifra.focus();
    return;
  }

  const musicas = obterMusicas();

  const jaExiste = musicas.some(function (musica) {
    return (
      musica.titulo.toLocaleLowerCase("pt-BR") ===
        titulo.toLocaleLowerCase("pt-BR") &&
      musica.artista.toLocaleLowerCase("pt-BR") ===
        artista.toLocaleLowerCase("pt-BR")
    );
  });

  if (jaExiste) {
    mostrarMensagem("Essa música já está cadastrada.", "erro");
    inTitulo.focus();
    return;
  }

  musicas.push({
    titulo: titulo,
    artista: artista,
    tom: tom,
    categoria: categoria,
    cifra: cifra,
  });

  salvarMusicas(musicas);

  mostrarMensagem(`Música "${titulo}" cadastrada com sucesso.`, "sucesso");

  formMusica.reset();
  renderizarMusicas();

  inTitulo.focus();
}

function renderizarMusicas() {
  const termo = inPesquisa.value.trim().toLocaleLowerCase("pt-BR");

  const musicas = obterMusicas();

  const filtradas = musicas.filter(function (musica) {
    return (
      musica.titulo.toLocaleLowerCase("pt-BR").includes(termo) ||
      musica.artista.toLocaleLowerCase("pt-BR").includes(termo)
    );
  });

  listaMusicas.innerHTML = "";

  if (filtradas.length === 0) {
    listaMusicas.innerHTML = `
      <p class="lista-vazia">
        Nenhuma música encontrada.
      </p>
    `;

    atualizarResumo();
    return;
  }

  filtradas.forEach(function (musica) {
    const card = document.createElement("div");
    card.classList.add("musica-card");

    card.innerHTML = `
      <h3>${escaparHTML(musica.titulo)}</h3>
      <p><strong>Artista:</strong> ${escaparHTML(musica.artista)}</p>
      <p><strong>Tom:</strong> ${escaparHTML(musica.tom)}</p>
      <p><strong>Categoria:</strong> ${escaparHTML(musica.categoria)}</p>

      <div class="acoes-card">
        <button type="button" class="btn-ver">
          Ver cifra
        </button>

        <button type="button" class="btn-excluir">
          Excluir
        </button>
      </div>
    `;

    const btnVer = card.querySelector(".btn-ver");
    const btnExcluir = card.querySelector(".btn-excluir");

    btnVer.addEventListener("click", function () {
      abrirCifra(musica);
    });

    btnExcluir.addEventListener("click", function () {
      excluirMusica(musica.titulo, musica.artista);
    });

    listaMusicas.appendChild(card);
  });

  atualizarResumo();
}

function abrirCifra(musica) {
  musicaAtual = musica;

  outMusicaAberta.textContent = musica.titulo;
  outTomAtual.textContent = musica.tom;

  cifraAberta.innerHTML = `
    <div class="cifra-topo">
      <h3>${escaparHTML(musica.titulo)}</h3>
      <p><strong>Artista:</strong> ${escaparHTML(musica.artista)}</p>
      <p><strong>Tom:</strong> ${escaparHTML(musica.tom)}</p>
      <p><strong>Categoria:</strong> ${escaparHTML(musica.categoria)}</p>
    </div>

    <div class="cifra-texto">${destacarAcordes(musica.cifra)}</div>
  `;
}

function excluirMusica(titulo, artista) {
  const confirmar = confirm(`Deseja excluir a música "${titulo}"?`);

  if (!confirmar) {
    return;
  }

  const musicas = obterMusicas();

  const novasMusicas = musicas.filter(function (musica) {
    return !(musica.titulo === titulo && musica.artista === artista);
  });

  salvarMusicas(novasMusicas);

  if (
    musicaAtual !== null &&
    musicaAtual.titulo === titulo &&
    musicaAtual.artista === artista
  ) {
    musicaAtual = null;

    cifraAberta.innerHTML = `
      <p class="lista-vazia">
        Nenhuma cifra aberta.
      </p>
    `;

    outMusicaAberta.textContent = "Nenhuma";
    outTomAtual.textContent = "-";
  }

  mostrarMensagem("Música excluída com sucesso.", "sucesso");

  renderizarMusicas();
}

function limparCampos() {
  formMusica.reset();

  mostrarMensagem("Campos limpos.", "sucesso");

  inTitulo.focus();
}

function restaurarCatalogo() {
  const confirmar = confirm("Deseja apagar todas as músicas cadastradas?");

  if (!confirmar) {
    return;
  }

  localStorage.removeItem(CHAVE_MUSICAS);

  musicaAtual = null;

  formMusica.reset();

  cifraAberta.innerHTML = `
    <p class="lista-vazia">
      Nenhuma cifra aberta.
    </p>
  `;

  outMusicaAberta.textContent = "Nenhuma";
  outTomAtual.textContent = "-";

  mostrarMensagem(
    "Catálogo restaurado. Todas as músicas foram apagadas.",
    "sucesso",
  );

  renderizarMusicas();

  inTitulo.focus();
}

formMusica.addEventListener("submit", cadastrarMusica);
btLimpar.addEventListener("click", limparCampos);
btRestaurar.addEventListener("click", restaurarCatalogo);
inPesquisa.addEventListener("input", renderizarMusicas);

renderizarMusicas();
