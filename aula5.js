const perguntas = [
    {
      pergunta: "Qual é o nome do assassino em 'Pânico'?",
      respostas: [
        { opcao: "Jason Voorhees", correto: false },
        { opcao: "Ghostface", correto: true },
        { opcao: "Freddy Krueger", correto: false },
        { opcao: "Chucky", correto: false }
      ]
    },
    {
      pergunta: "Qual objeto está possuído no filme 'Annabelle'?",
      respostas: [
        { opcao: "Espelho", correto: false },
        { opcao: "Boneca", correto: true },
        { opcao: "Brinquedo de pelúcia", correto: false },
        { opcao: "Quadro", correto: false }
      ]
    },
    {
      pergunta: "Qual é o nome do hotel em 'O Iluminado'?",
      respostas: [
        { opcao: "Bates Motel", correto: false },
        { opcao: "Overlook Hotel", correto: true },
        { opcao: "Hotel Transilvânia", correto: false },
        { opcao: "Derry Inn", correto: false }
      ]
    },
    {
      pergunta: "Qual criatura aparece em 'O Chamado' após assistir uma fita?",
      respostas: [
        { opcao: "Valak", correto: false },
        { opcao: "Samara", correto: true },
        { opcao: "Sadako", correto: false },
        { opcao: "Regan", correto: false }
      ]
    },
    {
      pergunta: "Quem é o assassino mascarado em 'Sexta-Feira 13'?",
      respostas: [
        { opcao: "Michael Myers", correto: false },
        { opcao: "Jason Voorhees", correto: true },
        { opcao: "Leatherface", correto: false },
        { opcao: "Ghostface", correto: false }
      ]
    },
    {
      pergunta: "Em qual filme vemos a freira demoníaca chamada Valak?",
      respostas: [
        { opcao: "Invocação do Mal 2", correto: true },
        { opcao: "A Freira", correto: false },
        { opcao: "Hereditário", correto: false },
        { opcao: "Corra!", correto: false }
      ]
    },
    {
      pergunta: "Qual filme mostra um menino vendo pessoas mortas?",
      respostas: [
        { opcao: "O Sexto Sentido", correto: true },
        { opcao: "Atividade Paranormal", correto: false },
        { opcao: "Sobrenatural", correto: false },
        { opcao: "A Entidade", correto: false }
      ]
    },
    {
      pergunta: "Qual brinquedo assassino tem sua alma ligada a um serial killer?",
      respostas: [
        { opcao: "Chucky", correto: true },
        { opcao: "Annabelle", correto: false },
        { opcao: "Slappy", correto: false },
        { opcao: "Billy", correto: false }
      ]
    },
    {
      pergunta: "Quem é o assassino em 'Halloween'?",
      respostas: [
        { opcao: "Freddy Krueger", correto: false },
        { opcao: "Michael Myers", correto: true },
        { opcao: "Jason Voorhees", correto: false },
        { opcao: "Norman Bates", correto: false }
      ]
    },
    {
      pergunta: "Qual filme tem a frase 'Você quer jogar um jogo?'?",
      respostas: [
        { opcao: "Jogos Mortais", correto: true },
        { opcao: "Corra!", correto: false },
        { opcao: "A Bruxa de Blair", correto: false },
        { opcao: "A Visita", correto: false }
      ]
    }
  ];
  
  const perguntaElemento = document.querySelector(".pergunta");
  const respostasElemento = document.querySelector(".respostas");
  const progressoElemento = document.querySelector(".progresso");
  const textoFinal = document.querySelector(".mensagem-final");
  const imagemFinal = document.querySelector(".imagem-final");
  const conteudo = document.querySelector(".conteudo");
  const conteudoFinal = document.querySelector(".fim");
  const tempoElemento = document.querySelector(".tempo");
  const botoesControle = document.querySelector(".botoes-controle");
  const btnIniciar = document.querySelector(".botao-iniciar");
  const btnReiniciar = document.querySelector(".botao-reiniciar");
  const btnReiniciarFinal = document.querySelector(".botao-reiniciar-final");
  const btnCancelar = document.querySelector(".botao-cancelar");
  const btnSom = document.querySelector(".botao-som");
  const somFundo = document.getElementById("som-fundo");
  
  let indiceAtual = 0;
  let acertos = 0;
  let tempoRestante = 10;
  let cronometro;
  let somLigado = true;
  
  btnIniciar.addEventListener("click", iniciarJogo);
  btnReiniciar.addEventListener("click", reiniciarJogo);
  btnReiniciarFinal.addEventListener("click", reiniciarJogo);
  btnCancelar.addEventListener("click", cancelarJogo);
  btnSom.addEventListener("click", toggleSom);
  
  function iniciarJogo() {
    indiceAtual = 0;
    acertos = 0;
    conteudoFinal.style.display = "none";
    conteudo.style.display = "block";
    botoesControle.style.display = "flex";
    btnIniciar.style.display = "none";
    btnReiniciar.style.display = "none";
    carregarPergunta();
    if (somLigado) somFundo.play();
  }
  
  function reiniciarJogo() {
    iniciarJogo();
  }
  
  function cancelarJogo() {
    clearInterval(cronometro);
    conteudo.style.display = "none";
    conteudoFinal.style.display = "none";
    botoesControle.style.display = "flex";
    btnIniciar.style.display = "inline-block";
    btnReiniciar.style.display = "none";
    somFundo.pause();
    somFundo.currentTime = 0;
  }
  
  function toggleSom() {
    somLigado = !somLigado;
    btnSom.innerText = somLigado ? "🔊 Música: On" : "🔇 Música: Off";
    if (somLigado) somFundo.play();
    else somFundo.pause();
  }
  
  function iniciarCronometro() {
    tempoRestante = 10;
    tempoElemento.innerText = `⏱️ Tempo: ${tempoRestante}s`;
    cronometro = setInterval(() => {
      tempoRestante--;
      tempoElemento.innerText = `⏱️ Tempo: ${tempoRestante}s`;
      if (tempoRestante <= 0) {
        clearInterval(cronometro);
        mostrarFeedback(null);
      }
    }, 1000);
  }
  
  function carregarPergunta() {
    progressoElemento.innerHTML = `${indiceAtual + 1}/${perguntas.length}`;
    const perguntaAtual = perguntas[indiceAtual];
    perguntaElemento.innerHTML = perguntaAtual.pergunta;
    respostasElemento.innerHTML = "";
  
    const respostasAleatorias = embaralhar([...perguntaAtual.respostas]);
    respostasAleatorias.forEach((resposta) => {
      const botao = document.createElement("button");
      botao.classList.add("botao-resposta");
      botao.innerText = resposta.opcao;
      botao.onclick = () => {
        clearInterval(cronometro);
        mostrarFeedback(resposta.correto, botao);
      };
      respostasElemento.appendChild(botao);
    });
  
    iniciarCronometro();
  }
  
  function embaralhar(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function mostrarFeedback(correto, botaoClicado = null) {
    const botoes = document.querySelectorAll(".botao-resposta");
  
    botoes.forEach((btn) => {
      btn.disabled = true;
      const texto = btn.innerText;
      const respostaCorreta = perguntas[indiceAtual].respostas.find(r => r.opcao === texto);
      if (respostaCorreta?.correto) {
        btn.style.backgroundColor = "#4CAF50";
      } else if (btn === botaoClicado) {
        btn.style.backgroundColor = "#f44336";
      }
    });
  
    if (correto) acertos++;
  
    setTimeout(() => {
      indiceAtual++;
      if (indiceAtual < perguntas.length) {
        carregarPergunta();
      } else {
        finalizarJogo();
      }
    }, 1000);
  }
  
  function finalizarJogo() {
    clearInterval(cronometro);
    conteudo.style.display = "none";
    conteudoFinal.style.display = "flex";
    botoesControle.style.display = "none";
    btnReiniciar.style.display = "inline-block";
  
    if (acertos === perguntas.length) {
      textoFinal.innerText = `🎉 Você conseguiu escapar! ${acertos}/${perguntas.length}`;
      imagemFinal.src = "https://i.postimg.cc/Xq09K1T4/Chat-GPT-Image-7-de-abr-de-2025-18-38-53.png";
    } else {
      textoFinal.innerText = acertos === 0
        ? `💀 Fim de linha! Você errou tudo.`
        : `Você acertou ${acertos} de ${perguntas.length}`;
      imagemFinal.src = "https://i.postimg.cc/1z5CwXDJ/hallowen-background-849761-36904.jpg";
      mostrarJumpscare();
    }
  
    if (somLigado) somFundo.pause();
  }
  
  function mostrarJumpscare() {
    const jumpscare = document.createElement("div");
    jumpscare.classList.add("jumpscare");
    jumpscare.innerHTML = `
      <img src="https://i.postimg.cc/SQ8411zC/d7hp9pj-398184fe-7f54-48a7-bc98-4257a82bd287.png" alt="Susto assustador" />
      <audio autoplay>
        <source src="https://files.catbox.moe/wlnwvk.mp3" />
      </audio>
    `;
    document.body.appendChild(jumpscare);
  
    setTimeout(() => {
      jumpscare.remove();
    }, 3000);
  }
  