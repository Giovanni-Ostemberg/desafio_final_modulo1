let qtdResultados = 0;
let resultadoBusca = null;
let listarResultado = '';
let todasPessoasBuscadas = [];
let buscaPessoas = [];
let botaoSubmit = null;
let inputPesquisa = null;
let tamanhoStringPesquisa = 0;

let qtdSexoMasculino = 0;
let qtdSexoFeminino = 0;
let somaDasIdades = 0;
let mediaIdades = 0;

let pessoas = [];
let numberFormat = null;

window.addEventListener(
  'load',
  () => (resultadoBusca = document.getElementById('pesquisa-container')),
  (botaoSubmit = document.querySelector('#submit')),
  botaoSubmit.setAttribute('disabled', true),
  (inputPesquisa = document.querySelector('#input-busca')),
  fetchPessoas(),
  handleSubmit(),
  (numberFormat = Intl.NumberFormat('pt-BR'))
);

async function fetchPessoas() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();
  pessoas = await mapearJson(json);
  console.log(pessoas);
  render();
}

async function render() {
  qtdSexoFeminino = 0;
  qtdSexoMasculino = 0;
  qtdResultados === 0 ? renderBuscarSemResultado() : renderResultadosBusca();
  handleSubmit();
}

async function renderBuscarSemResultado() {
  resultadoBusca.innerHTML = `<div id="sem-resultados"><h2>Busca sem resultados</h2></div>`;
}

async function renderResultadosBusca() {
  (listarResultado = await mostrarResultados()),
    (qtdSexo = await qtdGenero()),
    (somaDasIdades = await somaIdades()),
    (resultadoBusca.innerHTML = await montarLista(listarResultado));
}

async function mostrarResultados() {
  let pessoasBuscadas = '';

  todasPessoasBuscadas.forEach((element) => {
    pessoasBuscadas += `<div class="linha-pessoa"><div class="foto"><img src='${element.foto.thumbnail}'/></div>
          <div class="nome">${element.name}</div>
          <div class="idade">${element.age}</div>
          </div>`;
  });

  return pessoasBuscadas;
}

function mapearJson(data) {
  return data.results.map((pessoa) => {
    return {
      name: pessoa.name.first + ' ' + pessoa.name.last,
      gender: pessoa.gender,
      age: pessoa.dob.age,
      foto: pessoa.picture,
    };
  });
}

async function montarLista(data) {
  mediaIdades = formatNumber(somaDasIdades / qtdResultados);
  return `<div id="usuarios-encontrados-container"><div class="encontrados-titulo"><h3>${qtdResultados} resultados encontrados</h3></div><div id="usuarios-encontrados">${data}</div></div>
        <div id="estatisticas">
        <div class="encontrados-titulo">
            <h3>Estatísticas</h3>
            </div>
            <div id="lista-estatisticas">
            <ul>
            <li class="item-estatisticas">Sexo Masculino: ${qtdSexoMasculino}</li>
            <li class="item-estatisticas">Sexo Feminino: ${qtdSexoFeminino}</li>
            <li class="item-estatisticas">Soma das Idades: ${somaDasIdades}</li>
            <li class="item-estatisticas">Média das Idades: ${mediaIdades}</li>
            </ul>
            </div>
        </div>`;
}

function handleSubmit() {
  tamanhoStringPesquisa = inputPesquisa.value.length;

  inputPesquisa.addEventListener('keyup', buscarPessoas);
  botaoSubmit.addEventListener('click', buscarPessoas);
}

async function buscarPessoas() {
  console.log(event);
  botaoSubmit.disabled = inputPesquisa.value.length === 0;

  if (
    (event.key === 'Enter' && inputPesquisa.value.length > 0) ||
    event.target == botaoSubmit
  ) {
    console.log('Apertou Enter');
    (todasPessoasBuscadas = pessoas.filter((pessoa) =>
      pessoa.name.toLowerCase().includes(inputPesquisa.value)
    )),
      (qtdResultados = todasPessoasBuscadas.length),
      render();
  } else {
    event.key === 'Enter'
      ? alert('Por favor, informe um termo para a busca')
      : null;
  }
}

async function qtdGenero() {
  todasPessoasBuscadas.forEach((pessoa) => {
    pessoa.gender === 'male' ? qtdSexoMasculino++ : qtdSexoFeminino++;
  });
  console.log(qtdSexoMasculino);
}

async function somaIdades() {
  let soma = todasPessoasBuscadas.reduce((acc, curr) => {
    return acc + curr.age;
  }, 0);

  return soma;
}

function formatNumber(numero) {
  return numberFormat.format(numero);
}
