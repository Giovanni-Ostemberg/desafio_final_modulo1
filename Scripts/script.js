let qtdResultados = 1;
let resultadoBusca =  null;
let listarResultado = "";
let todasPessoas = [];
let buscaPessoas = [];

let qtdSexoMasculino =0;
let qtdSexoFeminino =0;
let somaDasIdades = 0;
let mediaIdades =0;

let pessoas = [];





window.addEventListener('load', () => 
resultadoBusca =  document.querySelector("#resultados"),
fetchPessoas()


    );

    async function fetchPessoas(){
        const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
        const json = await res.json();
        todasPessoas =  await mapearJson(json);
        console.log(todasPessoas);
        render();
    }

    async function render(){
       (qtdResultados === 0 ? renderBuscarSemResultado() : renderResultadosBusca())
    }

    function renderBuscarSemResultado(){
                resultadoBusca.innerHTML = `<div id="sem-resultados"><h2>Busca sem resultados</h2></div>`
    }

    async function renderResultadosBusca(){
        listarResultado =   await mostrarResultados();
        const montarListaPessoas = await montarLista(listarResultado);

        resultadoBusca.innerHTML = montarListaPessoas;
            
            
    }
        
    

    async function mostrarResultados(){
    let pessoasBuscadas="";
   

       todasPessoas.forEach(element => {
          pessoasBuscadas += `<div class="linha-pessoa"><div class="foto"><img src='${element.foto.thumbnail}'/></div>
          <div class="nome">${element.name}</div>
          <div class="idade">${element.age}</div>
          </div>`
      })
      
      return pessoasBuscadas;
    }

    function mapearJson(data){
        return data.results.map(pessoa =>{ return{
            name: pessoa.name.first + " " + pessoa.name.last,
            gender: pessoa.gender,
            age: pessoa.dob.age,
            foto: pessoa.picture
        }
        })
    }

    async function montarLista(data){
       return `<div id="usuarios-encontrados"><h3>${qtdResultados} resultados encontrados</h3>${data}</div>
        <div id="estatisticas">
            <h3>Estatísticas</h3>
            <ul>
            <li>Sexo Masculino: ${qtdSexoMasculino}</li>
            <li>Sexo Feminino: ${qtdSexoFeminino}</li>
            <li>Soma das Idades: ${somaDasIdades}</li>
            <li>Média das Idades: ${mediaIdades}</li>
            </ul>
        </div>`;
    }



    

