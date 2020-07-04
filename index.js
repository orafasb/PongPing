window.onload = () => {
  iniciar()
  setInterval(executar, 1000 / 60);

};
//Variaveis Globais na funcao iniciar
function iniciar() {
  posicaoBolaX = (posicaoBolaY = 0);
  velocidadeBolaPosicaoX = (velocidadeBolaPosicaoY = 2);
  pontuacaoJogador1 = (pontuacaoJogador2 = 0);
  posicaoJogador1 = (posicaoJogador2 = 10);
  folhaDesenho = document.getElementById('folha');
  areaDesenho = folhaDesenho.getContext('2d');
  larguraCampo = 600;
  alturaCampo = 500;
  espessuraLinha = 6;
  alturaRaquete = 70;
  tamanhoBola = 8;
  efeitoRaquete = 0.3;
  velocidadeJogador2 = 1;
  faseJogo = 1
  folhaDesenho.addEventListener('mousemove', function (e) {
    posicaoJogador1 = e.clientY - alturaRaquete / 2;
  });

}
function executar() {
  desenhaCampo()
  bollRoll();
  pontosJogador();
  endGame();
}

function desenhaCampo() {
  // Desenha Campo
  areaDesenho.fillStyle = '#886ce4';
  areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

  //Desenha Linha Meio do Campo
  areaDesenho.fillStyle = '#ffffff ';
  areaDesenho.fillRect(larguraCampo / 2 - espessuraLinha / 2, 0, espessuraLinha, alturaCampo);

  // Desenha Jogadores
  areaDesenho.fillRect(0, posicaoJogador1, espessuraLinha, alturaRaquete);
  areaDesenho.fillRect(larguraCampo - espessuraLinha, posicaoJogador2, espessuraLinha, alturaRaquete);

  // Pontuacao do Jogo
  areaDesenho.fillText('Humano = ' + pontuacaoJogador1 + 'pontos', 100, 100);


  areaDesenho.fillText('Computador = ' + pontuacaoJogador2 + 'pontos', larguraCampo - 200, 100);
}

function bollRoll() {
  //Desenha Bola e atualiza sua posicao
  areaDesenho.fillRect(posicaoBolaX - tamanhoBola / 2, posicaoBolaY - tamanhoBola / 2, tamanhoBola,
    tamanhoBola
  );

  posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX;
  posicaoBolaY = posicaoBolaY + velocidadeBolaPosicaoY;

  //Verifica Lateral Superior
  if (posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0) {
    velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
  }
  if (posicaoBolaY > alturaCampo && velocidadeBolaPosicaoY > 0) {
    velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
  }
}

function pontosJogador() {
  //Jogador 2
  if (posicaoBolaX < 0) {
    if (posicaoBolaY > posicaoJogador1 && posicaoBolaY < posicaoJogador1 + alturaRaquete) {
      velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
      let diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2);
      velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
    } else {
      pontuacaoJogador2++;
      //Colocar bola no centro
      continuar()
    }
  }
  //Jogador 1
  if (posicaoBolaX > larguraCampo) {
    if (posicaoBolaY > posicaoJogador2 && posicaoBolaY < posicaoJogador2 + alturaRaquete) {
      velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
      let diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2);
      velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
    } else {
      pontuacaoJogador1++;
      //Colocar bola no centro
      continuar()
    }
  }
  //Atualizacao jogador 2
  if (posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY) {
    posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
  } else {
    posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
  }

}

function endGame() {
  if (pontuacaoJogador2 === 5) {
    alert('Voce Perdeu');
    pontuacaoJogador1 = pontuacaoJogador2 = 0;

    alert("GAME OVER ");
    faseJogo = 1
    velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 2
    velocidadeJogador2 = 1

  } else if (pontuacaoJogador1 === 5) {

    faseJogo++
    pontuacaoJogador1 = pontuacaoJogador2 = 0;
    alert("Proxima Fase - " + faseJogo);
    velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 1 * faseJogo
    velocidadeJogador2 = 1 * faseJogo
  }
}

function continuar() {
  posicaoBolaX = larguraCampo / 2;
  posicaoBolaY = larguraCampo / 2;
  velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
  velocidadeBolaPosicaoY = 3;
  return
}
