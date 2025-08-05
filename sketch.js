function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}// Jogo do Fazendeiro

// Criado depois de estudar alguns tutoriais, apesar disso ainda usei suporte do git-hub para fazer padrões diferentes e corrigir bugs do labirinto.

// variaveis do jogo

var labirinto = [];

var tamanho = 25;

var tamanhoQuadrado = 20;

var jogador;

var tela = "menu"; // menu, instruções, jogo, vitoria

var ganhou = false;

function setup() {

    createCanvas(tamanho * tamanhoQuadrado, tamanho * tamanhoQuadrado + 100);

}

function draw() {

    background(173, 216, 230);

    

    if (tela === "menu") {

        desenharMenu();

    } else if (tela === "instrucoes") {

        desenharInstrucoes();

    } else if (tela === "jogo") {

        desenharJogo();

    } else if (tela === "vitoria") {

        desenharVitoria();

    }

}

function desenharMenu() {

    fill(0, 0, 139);

    textAlign(CENTER, CENTER);

    textSize(36);

    text("Jogo do Fazendeiro", width/2, height/2 - 80);

    

    textSize(18);

    text("Ajude o fazendeiro a chegar na casa!", width/2, height/2 - 30);

    

    // botão começar

    fill(144, 238, 144);

    stroke(0);

    strokeWeight(2);

    rect(width/2 - 80, height/2 + 10, 160, 40);

    fill(0);

    textSize(18);

    text("Começar", width/2, height/2 + 30);

    

    // botão instruções

    fill(144, 238, 144);

    rect(width/2 - 80, height/2 + 60, 160, 40);

    fill(0);

    text("Como Jogar", width/2, height/2 + 80);

}

function desenharInstrucoes() {

    fill(255);

    rect(50, 50, width-100, height-100);

    

    fill(0);

    textAlign(CENTER, CENTER);

    textSize(24);

    text("Como Jogar", width/2, 100);

    

    textSize(16);

    text("Use as setas do teclado para mover", width/2, 150);

    text("O fazendeiro é 👨‍🌾", width/2, 180);

    text("A casa é 🏠", width/2, 210);

    text("Quadrados marrons são paredes", width/2, 240);

    text("Quadrados verdes são caminhos", width/2, 270);

    text("Ajude o fazendeiro a chegar em casa!", width/2, 300);

    

    fill(255, 99, 71);

    rect(width/2 - 60, height - 150, 120, 40);

    fill(255);

    text("Voltar", width/2, height - 130);

}

function desenharJogo() {

    background(255);

    

    //labirinto

    for (var i = 0; i < tamanho; i++) {

        for (var j = 0; j < tamanho; j++) {

            var x = i * tamanhoQuadrado;

            var y = j * tamanhoQuadrado;

            

            if (labirinto[i][j] === 1) {

                fill(139, 69, 19); // parede marrom

            } else {

                fill(0, 128, 0); // chão verde

            }

            noStroke();

            rect(x, y, tamanhoQuadrado, tamanhoQuadrado);

        }

    }

    

    //fazendeiro

    textAlign(CENTER, CENTER);

    textSize(16);

    fill(0);

    text("👨‍🌾", jogador.x * tamanhoQuadrado + tamanhoQuadrado/2, jogador.y * tamanhoQuadrado + tamanhoQuadrado/2);

    

    //casa

    fill(0);

    text("🏠", (tamanho-2) * tamanhoQuadrado + tamanhoQuadrado/2, (tamanho-2) * tamanhoQuadrado + tamanhoQuadrado/2);

    

    // verificar vitoria

    if (jogador.x === tamanho-2 && jogador.y === tamanho-2 && !ganhou) {

        ganhou = true;

        tela = "vitoria";

    }

}

function desenharVitoria() {

    fill(255, 255, 0);

    stroke(0);

    strokeWeight(3);

    rect(width/2 - 150, height/2 - 100, 300, 200);

    

    fill(0);

    textAlign(CENTER, CENTER);

    textSize(24);

    text("Parabéns!", width/2, height/2 - 30);

    textSize(18);

    text("Você conseguiu ajudar", width/2, height/2);

    text("o fazendeiro a chegar em casa! 🎉👨‍🌾", width/2, height/2 + 30);

}

// Controles do mouse

function mousePressed() {

    if (tela === "menu") {

        // botao começar

        if (mouseX > width/2 - 80 && mouseX < width/2 + 80 && 

            mouseY > height/2 + 10 && mouseY < height/2 + 50) {

            iniciarJogo();

        }

        // botao instruções

        if (mouseX > width/2 - 80 && mouseX < width/2 + 80 && 

            mouseY > height/2 + 60 && mouseY < height/2 + 100) {

            tela = "instrucoes";

        }

    } else if (tela === "instrucoes") {

        // botão voltar

        if (mouseX > width/2 - 60 && mouseX < width/2 + 60 && 

            mouseY > height - 150 && mouseY < height - 110) {

            tela = "menu";

        }

    }

}

function iniciarJogo() {

    tela = "jogo";

    ganhou = false;

    

    // criar labirinto

    for (var i = 0; i < tamanho; i++) {

        labirinto[i] = [];

        for (var j = 0; j < tamanho; j++) {

            labirinto[i][j] = 1;

        }

    }

    

    criarLabirinto(); // Gera o labirinto usando depth-first search

    

    jogador = {

        x: 1,

        y: 1

    };

    

    labirinto[1][1] = 0;

    labirinto[tamanho-2][tamanho-2] = 0;

}

// Algoritmo de geração do labirinto usando depth-first search

// Implementação baseada em recursive backtracking

function criarLabirinto() {

    // bordas

    for (var i = 0; i < tamanho; i++) {

        labirinto[i][0] = 1;

        labirinto[i][tamanho-1] = 1;

        labirinto[0][i] = 1;

        labirinto[tamanho-1][i] = 1;

    }

    

   

    var pilha = [];

    var atual = {x: 1, y: 1};

    labirinto[atual.x][atual.y] = 0;

    

    while (true) {

        var vizinhos = pegarVizinhos(atual.x, atual.y);

        

        if (vizinhos.length > 0) {

            var proximo = vizinhos[Math.floor(Math.random() * vizinhos.length)];

            quebrarParede(atual, proximo);

            labirinto[proximo.x][proximo.y] = 0;

            pilha.push(atual);

            atual = proximo;

        } else if (pilha.length > 0) {

            atual = pilha.pop();

        } else {

            break;

        }

    }

    

    // adiciona alguns caminhos extras para tornar o jogo mais interessante

    for (var i = 0; i < 15; i++) {

        var x = Math.floor(Math.random() * (tamanho-2)) + 1;

        var y = Math.floor(Math.random() * (tamanho-2)) + 1;

        if (Math.random() > 0.8) {

            labirinto[x][y] = 0;

        }

    }

}

function pegarVizinhos(x, y) {

    var vizinhos = [];

    var direcoes = [

        {x: x, y: y-2},

        {x: x+2, y: y},

        {x: x, y: y+2},

        {x: x-2, y: y}

    ];

    

    for (var i = 0; i < direcoes.length; i++) {

        var dir = direcoes[i];

        if (dir.x > 0 && dir.x < tamanho-1 && 

            dir.y > 0 && dir.y < tamanho-1 && 

            labirinto[dir.x][dir.y] === 1) {

            vizinhos.push(dir);

        }

    }

    

    return vizinhos;

}

function quebrarParede(atual, proximo) {

    var paredeX = atual.x + (proximo.x - atual.x) / 2;

    var paredeY = atual.y + (proximo.y - atual.y) / 2;

    labirinto[paredeX][paredeY] = 0;

}

function keyPressed() {

    if (tela !== "jogo" || ganhou) return;

    

    var novoX = jogador.x;

    var novoY = jogador.y;

    

    if (keyCode === LEFT_ARROW) {

        novoX = jogador.x - 1;

    } else if (keyCode === RIGHT_ARROW) {

        novoX = jogador.x + 1;

    } else if (keyCode === UP_ARROW) {

        novoY = jogador.y - 1;

    } else if (keyCode === DOWN_ARROW) {

        novoY = jogador.y + 1;

    }

    

    if (novoX >= 0 && novoX < tamanho && 

        novoY >= 0 && novoY < tamanho && 

        labirinto[novoX][novoY] === 0) {

        jogador.x = novoX;

        jogador.y = novoY;

    }

}