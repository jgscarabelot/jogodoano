class Entidade {
    constructor(x, y, largura, altura, imagemSrc) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.imagem = new Image();
        this.imagem.src = imagemSrc;
    }

    desenhar(ctx) {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    }
}

class Personagem extends Entidade {
    constructor(x, y, largura, altura, imagemSrc, imgPuloSrc) {
        super(x, y, largura, altura, imagemSrc);
        this.velocidadey = 0;
        this.pulando = false;
        this.imgPulo = new Image();
        this.imgPulo.src = imgPuloSrc;
        this.frameIndex = 0;
        this.numFrames = 5;
        this.frameWidth = 300;
        this.frameHeight = 300;
        this.frameDelay = 5;
        this.frameDelayCounter = 0;
    }

    atualizar(gravidade, chaoY) {
        if (this.pulando) {
            this.velocidadey += gravidade;
            this.y += this.velocidadey;
            if (this.y >= chaoY - this.altura) {
                this.velocidadey = 0;
                this.pulando = false;
                this.y = chaoY - this.altura;
            }
        }
    }

    desenhar(ctx) {
        if (this.pulando) {
            ctx.drawImage(this.imgPulo, this.x, this.y, 250, 280);
        } else {
            const frameX = this.frameIndex * this.frameWidth;
            ctx.drawImage(this.imagem, frameX, 0, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth, this.frameHeight);
            this.frameDelayCounter++;
            if (this.frameDelayCounter >= this.frameDelay) {
                this.frameIndex = (this.frameIndex + 1) % this.numFrames;
                this.frameDelayCounter = 0;
            }
        }
    }
}

class Obstaculo extends Entidade {
    constructor(x, y, largura, altura, velocidade, cor = 'red') {
        super(x, y, largura, altura, '');
        this.velocidade = velocidade;
        this.cor = cor;
    }

    atualizar(canvas) {
        this.x -= this.velocidade;
        if (this.x <= -this.largura) {
            this.x = canvas.width;
            this.velocidade += 0.2;
            this.altura = Math.random() * 50 + 100;
            this.y = canvas.height - this.altura - 94;
        }
    }

    desenhar(ctx) {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
const gravidade = 0.5;
const chaoY = canvas.height - 180;
let gameOver = false;

const personagem = new Personagem(20, chaoY - 95, 70, 90, 'normal1.png', 'pulando.png');
const obstaculo = new Obstaculo(canvas.width - 50, canvas.height - 194, 50, 100, 5);

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && !personagem.pulando && !gameOver) {
        personagem.velocidadey = -15;
        personagem.pulando = true;
    }
    if (e.code === 'KeyD' && !gameOver) personagem.x += 20;
    if (e.code === 'KeyA' && !gameOver) personagem.x -= 20;
});

document.addEventListener('click', () => { if (gameOver) location.reload(); });

function verificarColisao() {
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        gameOver = true;
        ctx.fillStyle = 'red';
        ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 50, 400, 100);
        ctx.fillStyle = 'white';
        ctx.font = "30px Arial";
        ctx.fillText("GAME OVER", (canvas.width / 2) - 100, (canvas.height / 2));
    }
}

function loop() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        personagem.desenhar(ctx);
        personagem.atualizar(gravidade, chaoY);
        obstaculo.desenhar(ctx);
        obstaculo.atualizar(canvas);
        verificarColisao();
        requestAnimationFrame(loop);
    }
}
loop();
