const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
const gravidade = 0.5;
const chaoY = canvas.height - 180;
const imgPersonagem = new Image();
imgPersonagem.src = 'normal1.png'; // Substitua pelo caminho correto do seu sprite sheet
const imgPersonagemPulo = new Image();
imgPersonagemPulo.src = 'pulando.png';

const personagem = {
    x: 20,
    y: chaoY - 95,
    altura: 75,
    largura: 70,
    velocidadey: 0,
    pulando: false,
    larguraPulo: 250, 
    alturaPulo: 280,
    frameIndex: 0,
    numFrames: 5, // Número total de frames no sprite sheet
    frameWidth: 300, // Largura de cada frame no sprite sheet
    frameHeight: 300, // Altura de cada frame no sprite sheet
    frameDelay: 3,
    frameDelayCounter: 0
};

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && personagem.pulando == false) {
        console.log("clicou para pular");
        personagem.velocidadey = 15;
        personagem.pulando = true;
    }
    if (e.code === 'KeyD') {
        personagem.x += 20; // Move 10 pixels para a direita
    }
    if (e.code === 'KeyA') {
        personagem.x -= 20; // Move 10 pixels para a esquerda
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
    if (personagem.pulando == true) {
        personagem.velocidadey -= gravidade;
        personagem.y -= personagem.velocidadey;
        if (personagem.y >= chaoY - personagem.altura) {
            personagem.velocidadey = 0;
            personagem.pulando = false;
            personagem.y = chaoY - personagem.altura;
        }
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharPersonagem();
    requestAnimationFrame(loop);
    atualizarPersonagem();
}

loop();
