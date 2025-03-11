const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
const gravidade = 0.5;
const chaoY = canvas.height - 180;
let gameOver = false;
const imgPersonagem = new Image();
imgPersonagem.src = 'normal1.png'; // Substitua pelo caminho correto do seu sprite sheet
const imgPersonagemPulo = new Image();
imgPersonagemPulo.src = 'pulando.png';

const personagem = {
    x: 20,
    y: chaoY - 95,
    altura: 90,
    largura: 70,
    velocidadey: 0,
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

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && !personagem.pulando && !gameOver) {
        console.log("clicou para pular");
        personagem.velocidadey = -15; // Inicializa o pulo com velocidade negativa
        personagem.pulando = true;
    }
    if (e.code === 'KeyD' && !gameOver) {
        personagem.x += 20; // Move 10 pixels para a direita
    }
    if (e.code === 'KeyA' && !gameOver) {
        personagem.x -= 20; // Move 10 pixels para a esquerda
    }
});

document.addEventListener('click', (e) => {
    if(gameOver) {
        location.reload(); // Reinicia o jogo ao clicar
    }
});

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

function atualizarPersonagem() {
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

const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 194,
    largura: 50,
    altura: 100,
    velocidadex: 5,
};

function desenharObstaculo() {
    ctx.fillStyle = 'red';
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidadex;
    if (obstaculo.x <= -obstaculo.largura) {
        obstaculo.x = canvas.width;
        obstaculo.velocidadex += 0.2;
        let nova_altura = (Math.random() * 50) + 100;
        obstaculo.altura = nova_altura;
        obstaculo.y = canvas.height - nova_altura - 94; // Ajuste da posição Y
    }
}

function houveColisao() {
    gameOver = true; // Define que o jogo acabou após a colisão
    ctx.fillStyle = 'red';
    ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 50, 400, 100); // Retângulo vermelho
    ctx.fillStyle = 'white'; // Cor do texto
    ctx.font = "30px Arial";
    ctx.fillText("GAME OVER", (canvas.width / 2) - 100, (canvas.height / 2)); // Exibe a mensagem "Game Over"
}

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

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenharPersonagem();
        desenharObstaculo();
        atualizarPersonagem();
        atualizarObstaculo();
        verificarColisao();
        requestAnimationFrame(loop);
    }
}

loop();
