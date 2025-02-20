const canvas = document.getElementById("jogoCanvas")
const ctx = canvas.getContext('2d')
let gravidade = 0.5

document.addEventListener("click", (e) =>{
    if(gameOver){
        location.reload()
    }
})

document.addEventListener('keypress', (e) =>{
    if (e.code == 'Space' && personagem.pulando == false){
        personagem.velocidadey = -15
        personagem.pulando = true
    }
})
    

let gameOver = false

const personagem = {
    posx: 50,
    posy: canvas.height -50,
    tamx: 50,
    tamy: 50,
    velocidade: 0,
    velocidadey: 0,
    pulando: false, 
    onground: true
}
function desenhaPersonagem(){
    ctx.fillStyle = 'white'
    ctx.fillRect(personagem.posx, personagem.posy, personagem.tamx, personagem.tamy)
}

function atualizaPersonagem (){
    if (personagem.pulando){
        personagem.velocidadey += gravidade
        personagem.posy += personagem.velocidadey
    }
}

function chao(){
    if(personagem.posy == canvas.height -50){
        personagem.velocidadey = 0
        personagem.pulando = false
        personagem.onground = true
    }
}

const obstaculo = {
    posx: canvas.width -100,
    posy: canvas.height -100,
    tamx: 50,
    tamy: 100,
    velocidade: 10
}
function desenhaObstaculo(){
    ctx.fillStyle = 'red'
    ctx.fillRect(obstaculo.posx, obstaculo.posy, obstaculo.tamx, obstaculo.tamy)
}
function atualizaObstaculo(){
    obstaculo.posx -= obstaculo.velocidade
    if(obstaculo.posx <= 0 - obstaculo.tamx){
      let tamy_random = (Math.random() * 50) + 90
       obstaculo.posx = canvas.width - 100
       obstaculo.tamy = tamy_random
       obstaculo.posy = canvas.height - tamy_random
       obstaculo.velocidade += 0.5
    }
}

function verificaColisao(){
    if(personagem.posx < obstaculo.posx + obstaculo.tamx &&
        personagem.posx + personagem.tamx > obstaculo.posx &&
        personagem.posy < obstaculo.posy + obstaculo.tamy &&
        personagem.posy + personagem.tamy > obstaculo.posy
    ){
        houveColisao()    
    }
}

function houveColisao(){
    obstaculo.velocidade = 0
        atualizaObstaculo()
    ctx.fillStyle = 'red'
    ctx.fillRect((canvas.width/2)-200, (canvas.height/2)-50, 400, 100)
    ctx.fillStyle='black'
    ctx.font="50px Arial"
    ctx.fillText("Game Over", (canvas.width/2)-130, (canvas.height/2) +15)
    gameOver = true
}

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)

    atualizaObstaculo()
    desenhaObstaculo()
    atualizaPersonagem()
    desenhaPersonagem()
    chao()
    verificaColisao()
    requestAnimationFrame(loop)
}

loop()