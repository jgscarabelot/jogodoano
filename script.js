const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
const personagem = {
    x: 100,
    y: canvas.height -50,
    altura: 50,
    largura: 50,
    velocidadey:0,
    pulando: false
}
document.addEventListener('keypress', (e) => {
    if (e.code == 'Space'){
        console.log("clicou para pular")
        personagem.velocidadey = -10
        personagem.pulando = true
    }
})


function desenharPersonagem() {
    ctx.fillStyle = 'red'
    ctx.fillRect(personagem.x, personagem.y, personagem.altura, personagem.largura)
}

function atualizarPersonagem() {
if (personagem.pulando == true){
    personagem.y += personagem.velocidadey;
}
}

function loop () {
    ctx.clearRect(0,0,canvas.width,canvas.height)
desenharPersonagem()
requestAnimationFrame(loop)
atualizarPersonagem()
}

loop()