const lancer = {
    velocidade: 0,
    acelerar: function acelerar(){this.velocidade+=10},
    freiar: function freiar(){this.velocidade-=10}

}
console.log(lancer.velocidade)
lancer.acelerar()
console.log(lancer.velocidade)
lancer.freiar()
console.log(lancer.velocidade)