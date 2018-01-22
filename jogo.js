var timerId = null; //armazena a chamada da função timeout

function iniciaJogo()
{
	var url = window.location.search; // search pega só o ? e o que vem após ele na url 
	var nivel_jogo = url.replace("?", ""); // pega só o número do nível, pois substitui o ? por nada 
	var tempo_segundos = 0;

	if (nivel_jogo==1) //Nível 1 - Fácil - 120 segundos 
	{
		tempo_segundos = 120;
	}

	if (nivel_jogo==2) //Nível 2 - Normal - 60 segundos 
	{
		tempo_segundos = 60;
	}

	if (nivel_jogo==3) //Nível 3 - Difícil - 30 segundos 
	{
		tempo_segundos = 30;
	}
	
	//Inserindo segundos no spam (dentro do cronômetro)
	//innerHTML coloca o valor tempo_segundos dentro do objeto html que tem o id cronometro
	document.getElementById('cronometro').innerHTML = tempo_segundos; 

	var qtde_baloes = 90;
	criaBaloes(qtde_baloes);

	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;

	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos+1); //+1, senão ele já começa decrementando
	
}

function contagem_tempo(tempo_segundos)
{
	tempo_segundos--; //decrementa os segundos 

	if (tempo_segundos<0)//se o cronômetro ficar negativo
	{
		clearTimeout(timerId); //para a função setTimeout
		game_over();
		return False;
	}

	document.getElementById('cronometro').innerHTML = tempo_segundos; //coloca no cronômetro
	//timerId chama a timeout que executa tal função (contagem_tempo) a cada tantos milissegundos 
	//(1000 milisseg. = 1seg)
	timerId = setTimeout("contagem_tempo("+tempo_segundos+")", 1000); 
}

function game_over(){
	alert("Game over! Você não conseguiu estourar todos os balões a tempo!");
	remove_eventos_baloes();
}


function criaBaloes(qtde_baloes)
{
	for (var i = 1; i <= qtde_baloes; i++) 
	{
		var balao = document.createElement("img"); //cria um elemento, uma tag, dentro da página html
		balao.src = 'imagens/balao_azul_pequeno.png'; // define a imagem do balão
		balao.style.margin = '10px 12px';
		balao.style.cursor = 'crosshair';
		balao.id = 'b'+i; //cria um id para cada balão

		balao.onclick = function(){ estourar(this);}; //faz estourar o balão
		/* function(){} é uma função anônima e é usada para que atribua uma ação à um gatilho, 
		que nesse caso é o clique no balão, ou seja, quando o balão for clicado, a função estourar será chamada.
		Sem ela a função estourar seria chamada assim que essa linha fosse executada e não quando o balão fosse 
		clicado.*/

		// faz um append para ir adicionando balões no cenário
		document.getElementById('cenario').appendChild(balao); 
	}
}

function estourar(e)
{
	var id_balao = e.id;

	//limpa o que está na onclick do elemento para que seja impossível continuar pontuando quando
	// clica em balões já estourados
	document.getElementById(id_balao).setAttribute("onclick", "");

	//substitui o src do balao inteiro pelo balao estourado
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	pontuacao(); //menos um balao inteiro
}

function pontuacao()
{
	//recupera os valores transformando-os em int
	var baloes_inteiros = (parseInt(document.getElementById('baloes_inteiros').innerHTML));
	var baloes_estourados = (parseInt(document.getElementById('baloes_estourados').innerHTML));

	//realiza alteração na quantidades
	baloes_inteiros--;
	baloes_estourados++;

	//põe os valores na tela
	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);

}

function situacao_jogo(baloes_inteiros)
{
	if (baloes_inteiros == 0) 
	{
		parar_jogo();
		alert("Parabéns! Você estourou todos os balões a tempo!");
	}
}

function parar_jogo()
{
	clearTimeout(timerId);// para o cronômetro
}

/* remover o evento estourar() do onclick  dos elementos (balões) caso o tempo tenha sido 
atingido e ainda existam balões a serem estourados */
function remove_eventos_baloes() 
{
    var i = 1; //contado para recuperar balões por id
    
    //percorre os elementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}