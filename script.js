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
    }//atualizar a posição

    desenhar(ctx) {
    }
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
         //sistema diferente de movimentacao que usa aceleracao e desaceleracao para andar suave
        if (teclas.direita) {
            this.velocidadeX += this.aceleracao;
        } else if (teclas.esquerda) {
            this.velocidadeX -= this.aceleracao;
        } else {
            this.velocidadeX *= this.desaceleracao;
        }
    
        if (this.velocidadeX > 5) this.velocidadeX = 5;
        if (this.velocidadeX < -5) this.velocidadeX = -5;//limite de velocidade

    
        this.x += this.velocidadeX;
    
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > canvas.width - this.largura) {
            this.x = canvas.width - this.largura;
        }
    
        if (this.pulando) {
            this.velocidadeY += gravidade;
            this.velocidadeY += velocidadeQueda; //queda
            this.y += this.velocidadeY;
    
            if (this.y >= chaoY - this.altura) {
                this.y = chaoY - this.altura;
                this.velocidadeY = 0;
                this.pulando = false;//pulando?
                this.noChao = true; //pode pular dnv
            }
        }
    }
    

    desenhar(ctx) {
        ctx.save();
        if (this.pulando) {
            if (teclas.esquerda) {
                ctx.scale(-1, 1);//inverter imagem quando pula pra esquerda
                ctx.drawImage(imgPersonagemPulo, -this.x - this.largura, this.y, this.largura, this.altura); 
                ctx.restore();//restaurar
            } else {
                ctx.drawImage(imgPersonagemPulo, this.x, this.y, this.largura, this.altura); //imagem normal se nao estiver pra esquerda
            }
        } else {
            if (teclas.direita || teclas.esquerda) {
                const imagemAndando = imgPersonagemAndando[Math.floor(Date.now() / 100) % 3]; //troca de sprites
                if (teclas.esquerda) {
                    ctx.scale(-1, 1);//inverter spite quando anda pra esquerda
                    ctx.drawImage(imagemAndando, -this.x - this.largura, this.y, this.largura, this.altura); 
                    ctx.restore();//restaurar
                } else {
                    ctx.drawImage(imagemAndando, this.x, this.y, this.largura, this.altura); //sprite normal se nao estiver pra esquerda
                }
            } else {
                ctx.drawImage(imgPersonagem, this.x, this.y, this.largura, this.altura);//personagem parado se nao tiver apertando tecla
            }
        }
    }

    pular() {
        if (!this.pulando && this.noChao) {
            this.velocidadeY = -10; //pulo
            this.pulando = true; //personagem pulando
            this.noChao = false;//personagem saiu do chao
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
            this.x = canvas.width; //sair da tela suave
            this.velocidade += Math.random() * (0.4 - 0.2) + 0.1; //velocidade aleatoria
        }

        if (this.velocidade > 12) this.velocidade = 12; //velocidade maxima

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
            this.x = canvas.width; //sair suave
            this.velocidade += Math.random() * (0.4 - 0.2) + 0.1; //velocidade aleatoria
        }

        if (this.velocidade > 12) this.velocidade = 12; //limite

        super.atualizar();
    }

    desenhar(ctx) {
        ctx.save();
        ctx.scale(-1, 1); //inverter pois a imagem e invertida normalmente
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
            this.x = canvas.width; //sair da tela suave
            this.velocidade += Math.random() * (0.4 - 0.2) + 0.1; //velocidade aleatoria
        }

        if (this.velocidade > 12) this.velocidade = 12; //velocidade maxima

        super.atualizar();
    }

    desenhar(ctx) {
        ctx.drawImage(imgjack, this.x, this.y, this.largura, this.altura);
    }
}

const personagem = new Personagem(100, chaoY - 150, 110, 150); //criar personagem
const joe = new Joe(900, chaoY - 150, 100, 150, Math.random() * (6 - 3) + 3); //criar joe
const lois = new Lois(1200, chaoY - 150, 150, 150, Math.random() * (6 - 3) + 3); //criar lois
const jack = new Jack(1200, chaoY - 150, 150, 150, Math.random() * (3 - 1) + 1); //criar jack

const gravidade = 0.25;


//imagens
const imgMorte = new Image();
imgMorte.src = 'gameover.jpg';

const imgInimigo = new Image();
imgInimigo.src = 'inimigo.webp';

const imgPersonagem = new Image();
imgPersonagem.src = 'normal.png';

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
];
imgPersonagemAndando[0].src = 'correndo.gif';
imgPersonagemAndando[1].src = 'correndo2.gif';
imgPersonagemAndando[2].src = 'correndo3.gif';

let gameOver = false; //game over desligado

let teclas = {
    esquerda: false,
    direita: false,
    espaco: false
};//variaveis de tecla

//fps do chatgp pq tava bugado no pc de casa
const FPS = 60;
let lastFrameTime = 0;
let deltaTime = 0;

let velocidadeQueda = 0; 

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        personagem.pular(); //ativa funcao de pular
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
        //ve se os persanagens se colidiram e ajusta a margem(JOE)
        personagem.x + margem < joe.x + joe.largura - margem &&
        personagem.x + personagem.largura - margem > joe.x + margem &&
        personagem.y + margem < joe.y + joe.altura - margem &&
        personagem.y + personagem.altura - margem > joe.y + margem 
    ) {
        gameOver = true; //caso se colidam game over liga
    }
    if (
          //ve se os persanagens se colidiram e ajusta a margem(LOIS)
        personagem.x + margem < lois.x + lois.largura - margem &&
        personagem.x + personagem.largura - margem > lois.x + margem &&
        personagem.y + margem < lois.y + lois.altura - margem &&
        personagem.y + personagem.altura - margem > lois.y + margem
    ) {
        gameOver = true; //caso se colidam game over liga
    }
    if (
        //ve se os persanagens se colidiram e ajusta a margem(JOE)
        personagem.x + margem < jack.x + jack.largura - margem &&
        personagem.x + personagem.largura - margem > jack.x + margem &&
        personagem.y + margem < jack.y + jack.altura - margem &&
        personagem.y + personagem.altura - margem > jack.y + margem 
    ) {
        gameOver = true; //caso se colidam game over liga
    }
}

function fundo() {
    ctx.drawImage(imgFundo, 0, 0, canvas.width, canvas.height);
}//funcao de imagem

// contar
class Contador {
    #contar = 0;  // privada
    aumentar() {
        this.#contar++;
    }

    // valor atual do contador
    numeroAtual() {
        return this.#contar;
    }

    // resetar pq nao da de resetar com #contar=0
    resetar() {
        this.#contar = 0;
    }
}

const contador = new Contador();  // criar

function loop() {
    deltaTime = performance.now() - lastFrameTime;   // fps que o chat fez pq tava bugando no pc
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
            //inicializar lois depois de 10 segundos
            if (contador.numeroAtual() >= 1000) {
                lois.atualizar();
                lois.desenhar(ctx);
            }
            

            

            // mostrar
            if (!gameOver) {
                ctx.font = '30px Comic Sans MS';
                ctx.lineWidth = 6;
                ctx.strokeStyle = 'black';
                ctx.strokeText('Pontos: ' + contador.numeroAtual(), 10, 30);
                ctx.fillStyle = 'white';
                ctx.fillText('Pontos: ' + contador.numeroAtual(), 10, 30);
                contador.aumentar();  // aumentar o contador
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

        contador.resetar();  // resetar

        loop(performance.now());
    }
}

canvas.addEventListener('click', reiniciarJogo);

imgPersonagem.onload = imgInimigo.onload = imgPersonagemPulo.onload = imgLois.onload = () => {
    canvas.addEventListener('click', () => {
        loop(performance.now());
    });
};