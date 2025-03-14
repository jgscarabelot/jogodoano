const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');

// Constantes e variáveis
const gravidade = 0.25;
const chaoY = canvas.height - 180;
let gameOver = false;

// Carregar imagens
const imgPersonagem = new Image();
imgPersonagem.src = 'normal1.png'; // Substitua pelo caminho correto do seu sprite sheet
const imgPersonagemPulo = new Image();
imgPersonagemPulo.src = 'pulando.png';

// Definir personagem
const personagem = {
    x: 20,
    y: chaoY - 95,
    altura: 90,
    largura: 70,
    velocidadey: 0,
    velocidadeX: 0,
    aceleracao: 0.5,
    desaceleracao: 0.5,
    pulando: false,
    larguraPulo: 250,
    alturaPulo: 280,
    frameIndex: 0,
    numFrames: 5, // Número total de frames no sprite sheet
    frameWidth: 300, // Largura de cada frame no sprite sheet
    frameHeight: 300, // Altura de cada frame no sprite sheet
    frameDelay: 5,
    frameDelayCounter: 0
};

// Variáveis de controle
let teclas = {
    esquerda: false,
    direita: false,
    espaco: false
};

// Eventos de controle
document.addEventListener('keydown', (e) => {
    if (e.code == 'Space' && !personagem.pulando && !gameOver) {
        console.log("clicou para pular");
        personagem.velocidadey = -10; // Inicializa o pulo com velocidade negativa
        personagem.pulando = true;
    }
    if (e.code === 'KeyD' && !gameOver) {
        teclas.direita = true; 
    }
    if (e.code === 'KeyA' && !gameOver) {
        teclas.esquerda = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyD') {
        teclas.direita = false;
    }
    if (e.code === 'KeyA') {
        teclas.esquerda = false;
    }
});

document.addEventListener('click', () => {
    if (gameOver) {
        location.reload(); // Reinicia o jogo ao clicar
    }
});

// Função para desenhar o personagem
function desenharPersonagem() {
    if (personagem.pulando) {
        ctx.drawImage(imgPersonagemPulo, personagem.x, personagem.y, personagem.larguraPulo, personagem.alturaPulo);
    } else {
        const frameX = personagem.frameIndex * personagem.frameWidth;
        ctx.drawImage(imgPersonagem, frameX, 0, personagem.frameWidth, personagem.frameHeight, personagem.x, personagem.y, personagem.frameWidth, personagem.frameHeight);

        // Atualizar o frame da animação
        personagem.frameDelayCounter++;
        if (personagem.frameDelayCounter >= personagem.frameDelay) {
            personagem.frameIndex = (personagem.frameIndex + 1) % personagem.numFrames;
            personagem.frameDelayCounter = 0;
        }
    }
}

// Função para atualizar o personagem
function atualizarPersonagem() {
    // Movimentação suave
    if (teclas.direita) {
        personagem.velocidadeX += personagem.aceleracao;
    } else if (teclas.esquerda) {
        personagem.velocidadeX -= personagem.aceleracao;
    } else {
        personagem.velocidadeX *= personagem.desaceleracao; // Desacelerar quando não pressionar teclas
    }

    if (personagem.velocidadeX > 5) personagem.velocidadeX = 5;
    if (personagem.velocidadeX < -5) personagem.velocidadeX = -5;

    personagem.x += personagem.velocidadeX;

    if (personagem.x < 0) personagem.x = 0;
    if (personagem.x > canvas.width - personagem.largura) personagem.x = canvas.width - personagem.largura;

    if (personagem.pulando) {
        personagem.velocidadey += gravidade; // Aumenta a velocidade Y pela gravidade
        personagem.y += personagem.velocidadey; // Aplica a velocidade Y na posição

        // Verifica se o personagem atingiu o chão
        if (personagem.y >= chaoY - 95) {
            personagem.velocidadey = 0;
            personagem.pulando = false;
            personagem.y = chaoY - 95;
        }
    }
}

// Definir obstáculo
const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 194,
    largura: 50,
    altura: 100,
    velocidadex: 5,
};

// Função para desenhar o obstáculo
function desenharObstaculo() {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

// Função para atualizar o obstáculo
function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidadex;
    if (obstaculo.x <= -obstaculo.largura) {
        obstaculo.x = canvas.width;
        obstaculo.velocidadex += 0.2;
        let novaAltura = (Math.random() * 50) + 100;
        obstaculo.altura = novaAltura;
        obstaculo.y = canvas.height - novaAltura - 94; // Ajuste da posição Y
    }
}

// Função que detecta colisões
function houveColisao() {
    gameOver = true; // Define que o jogo acabou após a colisão
    ctx.fillStyle = 'red';
    ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 50, 400, 100); // Retângulo vermelho
    ctx.fillStyle = 'white'; // Cor do texto
    ctx.font = "30px Arial";
    ctx.fillText("GAME OVER", (canvas.width / 2) - 100, (canvas.height / 2)); // Exibe a mensagem "Game Over"
}

// Função para verificar colisão entre o personagem e o obstáculo
function verificarColisao() {
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        houveColisao();
    }
}

// Função para desenhar e atualizar os inimigos
function desenharInimigos() {
    // Exemplo de inimigo Joe
    const inimigo = {
        x: canvas.width,
        y: chaoY - 150,
        largura: 50,
        altura: 50,
        velocidadex: 3
    };

    ctx.fillStyle = 'blue'; // Cor para o inimigo
    ctx.fillRect(inimigo.x, inimigo.y, inimigo.largura, inimigo.altura);

    // Atualizar a posição do inimigo
    inimigo.x -= inimigo.velocidadex;
    if (inimigo.x <= -inimigo.largura) {
        inimigo.x = canvas.width; // Reaparece do outro lado
        inimigo.velocidadex += 0.1; // Aumenta a velocidade do inimigo com o tempo
    }
}

// Função principal do loop de animação
function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenharPersonagem();
        desenharObstaculo();
        atualizarPersonagem();
        atualizarObstaculo();
        verificarColisao();
        desenharInimigos();
        requestAnimationFrame(loop);
    }
}

loop();
