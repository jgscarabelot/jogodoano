const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');

const chaoY = canvas.height - 50;

class Entidade {
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.velocidadeX = 0;
        this.velocidadeY = 0;
    }

    atualizar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
    }

    desenhar(ctx) {}
}

class Personagem extends Entidade {
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.aceleracao = 0.5;
        this.desaceleracao = 0.5;
        this.velocidadeY = 0;
        this.pulando = false;
        this.noChao = true; 
    }

    atualizar() {
        if (teclas.direita) {
            this.velocidadeX += this.aceleracao;
        } else if (teclas.esquerda) {
            this.velocidadeX -= this.aceleracao;
        } else {
            this.velocidadeX *= this.desaceleracao;
        }
    
        if (this.velocidadeX > 5) this.velocidadeX = 5;
        if (this.velocidadeX < -5) this.velocidadeX = -5;
    
        this.x += this.velocidadeX;
    
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > canvas.width - this.largura) {
            this.x = canvas.width - this.largura;
        }
    
        if (this.pulando) {
            this.velocidadeY += gravidade;
            this.velocidadeY += velocidadeQueda;
            this.y += this.velocidadeY;
    
            if (this.y >= chaoY - this.altura) {
                this.y = chaoY - this.altura;
                this.velocidadeY = 0;
                this.pulando = false;
                this.noChao = true;
            }
        }
    }
    
    desenhar(ctx) {
        ctx.save();
        if (this.pulando) {
            if (teclas.esquerda) {
                ctx.scale(-1, 1);
                ctx.drawImage(imgPersonagemPulo, -this.x - tamanhosPersonagem.pulando.largura, this.y, tamanhosPersonagem.pulando.largura, tamanhosPersonagem.pulando.altura);
                ctx.restore();
            } else {
                ctx.drawImage(imgPersonagemPulo, this.x, this.y, tamanhosPersonagem.pulando.largura, tamanhosPersonagem.pulando.altura);
            }
        } else {
            // Verifica se o personagem está em movimento para escolher a animação
            if (teclas.direita || teclas.esquerda) {
                const imagemAndando = imgPersonagemAndando[Math.floor(Date.now() / 45) % 16];
                if (teclas.esquerda) {
                    ctx.scale(-1, 1); // Inverte a imagem para a esquerda
                    ctx.drawImage(imagemAndando, -this.x - tamanhosPersonagem.correndo.largura, this.y, tamanhosPersonagem.correndo.largura, tamanhosPersonagem.correndo.altura);
                    ctx.restore();
                } else {
                    ctx.drawImage(imagemAndando, this.x, this.y, tamanhosPersonagem.correndo.largura, tamanhosPersonagem.correndo.altura);
                }
            } else {
                // Se o personagem não está se movendo, ele está parado
                const imagemParado = imgPersonagemParado[Math.floor(Date.now() / 70) % 8];
                ctx.drawImage(imagemParado, this.x, this.y, tamanhosPersonagem.normal.largura, tamanhosPersonagem.normal.altura);
            }
        }
    }
    
    

    pular() {
        if (!this.pulando && this.noChao) {
            this.velocidadeY = -10;
            this.pulando = true;
            this.noChao = false;
        }
    }
}

class Joe extends Entidade {
    constructor(x, y, largura, altura, velocidade) {
        super(x, y, largura, altura);
        this.velocidade = velocidade;
    }

    atualizar() {
        this.x -= this.velocidade;
        if (this.x <= 0 - this.largura) {
            this.x = canvas.width;
            this.velocidade += Math.random() * (0.4 - 0.2) + 0.1;
        }

        if (this.velocidade > 12) this.velocidade = 12;

        super.atualizar();
    }

    desenhar(ctx) {
        ctx.drawImage(imgInimigo, this.x, this.y, this.largura, this.altura);
    }
}

class Lois extends Entidade {
    constructor(x, y, largura, altura, velocidade) {
        super(x, y, largura, altura);
        this.velocidade = velocidade;
    }

    atualizar() {
        this.x -= this.velocidade;
        if (this.x <= 0 - this.largura) {
            this.x = canvas.width;
            this.velocidade += Math.random() * (0.4 - 0.2) + 0.1;
        }

        if (this.velocidade > 12) this.velocidade = 12;

        super.atualizar();
    }

    desenhar(ctx) {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(imgLois, -lois.x - lois.largura, lois.y, lois.largura, lois.altura);
        ctx.restore();
    }
}

class Jack extends Entidade {
    constructor(x, y, largura, altura, velocidade) {
        super(x, y, largura, altura);
        this.velocidade = velocidade;
    }

    atualizar() {
        this.x -= this.velocidade;
        if (this.x <= 0 - this.largura) {
            this.x = canvas.width;
            this.velocidade += Math.random() * (0.4 - 0.2) + 0.1;
        }

        if (this.velocidade > 12) this.velocidade = 12;

        super.atualizar();
    }

    desenhar(ctx) {
        ctx.drawImage(imgjack, this.x, this.y, this.largura, this.altura);
    }
}

const tamanhosPersonagem = {
    normal: {
        largura: 150,  
        altura: 200,   
    },
    correndo: {
        largura: 250,  
        altura: 170,   
    },
    pulando: {
        largura: 190,  
        altura: 190,   
    }
};

const personagem = new Personagem(100, chaoY - 200, 110, 150);
const joe = new Joe(900, chaoY - 150, 100, 150, Math.random() * (6 - 3) + 3);
const lois = new Lois(1200, chaoY - 150, 150, 150, Math.random() * (6 - 3) + 3);
const jack = new Jack(1200, chaoY - 150, 150, 150, Math.random() * (3 - 1) + 1);

const gravidade = 0.25;

// Imagens
const imgMorte = new Image();
imgMorte.src = 'gameover.jpg';

const imgInimigo = new Image();
imgInimigo.src = 'inimigo.webp';

const imgPersonagem = new Image();
imgPersonagem.src = 'parado.png';

const imgPersonagemPulo = new Image();
imgPersonagemPulo.src = 'pulando.png';

const imgFundo = new Image();
imgFundo.src = 'Fundo2.jpg';

const imgLois = new Image();
imgLois.src = 'inimigo2.webp';

const imgjack = new Image();
imgjack.src = 'inimigo3.webp';

const imgPersonagemAndando = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
];
imgPersonagemAndando[0].src = 'correndo.gif';
imgPersonagemAndando[1].src = 'correndo2.gif';
imgPersonagemAndando[2].src = 'correndo3.gif';
imgPersonagemAndando[3].src = 'correndo4.gif';
imgPersonagemAndando[4].src = 'correndo5.gif';
imgPersonagemAndando[5].src = 'correndo6.gif';
imgPersonagemAndando[6].src = 'correndo7.gif';
imgPersonagemAndando[7].src = 'correndo8.gif';
imgPersonagemAndando[8].src = 'correndo9.gif';
imgPersonagemAndando[9].src = 'correndo10.gif';
imgPersonagemAndando[10].src = 'correndo11.gif';
imgPersonagemAndando[11].src = 'correndo12.gif';
imgPersonagemAndando[12].src = 'correndo13.gif';
imgPersonagemAndando[13].src = 'correndo14.gif';
imgPersonagemAndando[14].src = 'correndo15.gif';
imgPersonagemAndando[15].src = 'correndo16.gif';

const imgPersonagemParado = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    
];
imgPersonagemParado[0].src = 'parado.png';
imgPersonagemParado[1].src = 'parado2.png';
imgPersonagemParado[2].src = 'parado3.png';
imgPersonagemParado[3].src = 'parado4.png';
imgPersonagemParado[4].src = 'parado5.png';
imgPersonagemParado[5].src = 'parado6.png';
imgPersonagemParado[6].src = 'parado7.png';
imgPersonagemParado[7].src = 'parado8.png';


let gameOver = false;

let teclas = {
    esquerda: false,
    direita: false,
    espaco: false
};

const FPS = 60;
let lastFrameTime = 0;
let deltaTime = 0;

let velocidadeQueda = 0; 

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        personagem.pular();
    }
    if (e.code === 'KeyD') {
        teclas.direita = true; 
    }
    if (e.code === 'KeyA') {
        teclas.esquerda = true;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyS') {
        velocidadeQueda = 5;
    }//cair mais rapido
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'KeyS') {
        velocidadeQueda = 0;// voltar ao normal
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

function verificarColisão() {
    const margem = 25;
    if (
        personagem.x + margem < joe.x + joe.largura - margem &&
        personagem.x + personagem.largura - margem > joe.x + margem &&
        personagem.y + margem < joe.y + joe.altura - margem &&
        personagem.y + personagem.altura - margem > joe.y + margem 
    ) {
        gameOver = true;
    }
    if (
        personagem.x + margem < lois.x + lois.largura - margem &&
        personagem.x + personagem.largura - margem > lois.x + margem &&
        personagem.y + margem < lois.y + lois.altura - margem &&
        personagem.y + personagem.altura - margem > lois.y + margem
    ) {
        gameOver = true;
    }
    if (
        personagem.x + margem < jack.x + jack.largura - margem &&
        personagem.x + personagem.largura - margem > jack.x + margem &&
        personagem.y + margem < jack.y + jack.altura - margem &&
        personagem.y + personagem.altura - margem > jack.y + margem 
    ) {
        gameOver = true;
    }
}

function fundo() {
    ctx.drawImage(imgFundo, 0, 0, canvas.width, canvas.height);
}

class Contador {
    #contar = 0;
    aumentar() {
        this.#contar++;
    }

    numeroAtual() {
        return this.#contar;
    }

    resetar() {
        this.#contar = 0;
    }
}

const contador = new Contador();  

function loop() {
    deltaTime = performance.now() - lastFrameTime;
    if (deltaTime >= 500 / FPS) {
        if (!gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fundo();
            personagem.atualizar();
            personagem.desenhar(ctx);
            verificarColisão();
            joe.atualizar();
            joe.desenhar(ctx);
            jack.atualizar();
            jack.desenhar(ctx);
            if (contador.numeroAtual() >= 1000) {
                lois.atualizar();
                lois.desenhar(ctx);
            }
            if (!gameOver) {
                ctx.font = '30px Comic Sans MS';
                ctx.lineWidth = 6;
                ctx.strokeStyle = 'black';
                ctx.strokeText('Pontos: ' + contador.numeroAtual(), 10, 30);
                ctx.fillStyle = 'white';
                ctx.fillText('Pontos: ' + contador.numeroAtual(), 10, 30);
                contador.aumentar();
            }
            lastFrameTime = performance.now();
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(imgMorte, 0, 0, canvas.width, canvas.height);
            ctx.fillText('Score: ' + contador.numeroAtual(), 100, canvas.height / 1.1);
        }
    }
    requestAnimationFrame(loop);
}

function reiniciarJogo() {
    if (gameOver) {
        gameOver = false;
        personagem.x = 100;
        personagem.y = chaoY - 150;
        personagem.velocidadeY = 0;
        personagem.pulando = false; 
        personagem.noChao = true;    
        joe.x = 900;
        joe.velocidade = Math.random() * (6 - 3) + 3;
        lois.velocidade = Math.random() * (6 - 3) + 3;
        lois.x = 1200;
        jack.velocidade = Math.random() * (3 - 1) + 1;
        jack.x = 1200;

        contador.resetar();  

        loop(performance.now());
    }
}

canvas.addEventListener('click', reiniciarJogo);

imgPersonagem.onload = imgInimigo.onload = imgPersonagemAndando[0].onload = function() {
    loop();
};
