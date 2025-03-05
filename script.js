const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
const gravidade = 0.5
const chaoY = canvas.height - 100;
const personagem = {
    x: 100,
    y: chaoY - 100,
    altura: 100,
    largura: 100,
    velocidadey:0,
    pulando: false
}
document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && personagem.pulando==false){
        console.log("clicou para pular")
        personagem.velocidadey = 15
        personagem.pulando = true
    }
})


function desenharPersonagem() {
    ctx.fillStyle = 'blue'
    ctx.fillRect(personagem.x, personagem.y, personagem.altura, personagem.largura)
}

function atualizarPersonagem() {
if (personagem.pulando == true){
    personagem.velocidadey -= gravidade
    personagem.y -= personagem.velocidadey;
    if (personagem.y >= chaoY-personagem.altura){
        personagem.velocidadey = 0
        personagem.pulando= false
        personagem.y = chaoY - personagem.altura;
    }
}
}

function loop () {
    ctx.clearRect(0,0,canvas.width,canvas.height)
desenharPersonagem()
requestAnimationFrame(loop)
atualizarPersonagem()
}

loop()