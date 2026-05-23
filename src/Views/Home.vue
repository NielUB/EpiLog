<template>
  <header class="navbar">
    <div class="navbar_marca">
      <img class="navbar_logo" src="../assets/LogoTipo.svg">
    </div>

    <div class="navbar_botoes">
      <button class="button_login" type="button" @click="$router.push('/Login')">Entrar</button>
    </div>
  </header>

  <section class="primeira">
    <div class="textos">
      <h1 class="frase_principal">
        “Unimos a precisão da logística <br>
        digital com o compromisso <br>
        humano de garantir que cada <br>
        trabalhador retorne para casa <br>
        em segurança todos os dias.”
      </h1>
    </div>

    <div class="imagenshome">
      <img class="imagem" src="../assets/Imagem.svg">
    </div>
  </section>

  <section class="segunda">
    <div class="textos">
      <h1 class="frase_secundaria">
        Tudo o que você precisa para digitalizar <br>
        seu controle de EPIs:
      </h1>
    </div>

    <section class="quadros">
      <div class="quadro">
        <img class="imagemcadp" src="../assets/ImagemCad1.svg">
        <p class="nomes">Controle de Entradas de <br> EPIs.</p>
      </div>

      <div class="quadro">
        <img class="imagemcadp" src="../assets/ImagemCad2.svg">
        <p class="nomes">Controle de Saidas de <br> EPIs.</p>
      </div>

      <div class="quadro">
        <img class="imagemcadp" src="../assets/ImagemCad3.svg">
        <p class="nomes">Registro de Estoque <br> Completo.</p>
      </div>
    </section>
  </section>

  <section class="juntas">
    <section class="terceira">
      <div class="textos">
        <h1 class="frase_terceira">
          Porque escolher o EpiLog?
        </h1>
        <p class="frases">Digitalização completa do processo de entregas de EPIs.</p>
        <p class="frases">Redução de custos com gestão eficiente de estoque.</p>
        <p class="frases">Assinatura digital eliminando papelada.</p>
        <p class="frases">Economia de tempo.</p>
        <p class="frases">Redução de custo.</p>
      </div>
    </section>

    <div class="cantos">
      <img class="esquerda" src="../assets/Esquerda.svg">
      <img class="direita" src="../assets/Direita.svg">
    </div>

    <section class="quarta">
      <div class="frase_quarta">
        <p>Vamos começar a digitalização da sua Gestão de EPIs?</p>
      </div>

      <div class="buttons">
        <button class="button_iniciar" type="button" @click="$router.push('/Login')">Iniciar Login</button>
      </div>
    </section>
  </section>
  <rodape />
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7.15rem;
  border: solid 1px;
  border-color: #0A3B59;
  background-color: #f2f2f2;
}

.navbar_marca {
  display: flex;
  flex-shrink: 0;
}

.navbar_logo {
  padding: 0 1.74rem;
  width: 25rem;
}

.navbar_botoes {
  display: flex;
  align-items: center;
  padding: 0 1.74rem;
  gap: 2rem;
}

.button_login {
  background: linear-gradient(45deg, rgba(13, 76, 115, 0.75), rgba(10, 59, 89, 1));
  width: 8.75rem; 
  height: 3.50rem;
  border-radius: 3rem;
  color: #f2f2f2;
  font-weight: 600;
  font-size: 1.10rem;
}

.primeira {
  display: flex;
  background: linear-gradient(45deg, rgba(13, 76, 115, 0.75), rgba(10, 59, 89, 1));
  height: 23.75rem;
  border: solid 0.1rem;
  border-color: #0a3b59;
  justify-content: space-between;
  align-items: center;
}

.frase_principal {
  color: #f2f2f2;
  padding-left: 5.75rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.80rem;
}

.imagemhome {
  display: flex;
  flex-shrink: 0;
}

.imagem {
  padding-top: 0.25em;
  height: 24rem;
}

.segunda {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  height: 28.8rem;
  border: solid 1px;
  border-color: #0a3b59;
}

.frase_secundaria {
  text-align: center;
  padding: 2rem;
  font-weight: 600;
  font-size: 1.80rem;
}

.quadros {
  display: flex;
  gap: 4rem;
}

.quadro {
  position: relative;
  background-color: #0A3B59;
  height: 15rem;
  width: 23rem;
  border-radius: 1rem;
  overflow: hidden;
}

.nomes {
  position: relative;
  z-index: 2;
  color: #fff;
  font-weight: 600;
  font-size: 1.25rem;
  text-align: center;
  padding-top: 10.8rem;
}

.imagemcadp {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.terceira {
  display: flex;
  justify-content: center;
  background-color: #f2f2f2;
  height: 24rem;
  border: solid 1px;
  border-color: #0a3b59;
}

.frase_terceira {
  padding-top: 1rem;
  padding: 1.5rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.80rem;
}

.frases {
  padding: 1rem;
  text-align: center;
  font-weight: 500;
  font-size: 1.2rem;
}

.juntas {
  position: relative;
}

.cantos {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

}

.esquerda {
  position: absolute;
  top: 0rem;
  left: 0rem;
}

.direita {
  position: absolute;
  top: 0rem;
  right: 0rem;
}

.quarta {
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  height: 8.76rem;
  border: solid 1px;
  border-color: #0a3b59;
}

.frase_quarta {
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
}

.buttons {
  display: flex;
  justify-content: center;
}

.button_iniciar {
  background: linear-gradient(45deg, rgba(13, 76, 115, 0.84), rgba(10, 59, 89, 1));
  width: 15.8rem;
  height: 3.5rem;
  border-radius: 3rem;
  color: #f2f2f2;
  font-weight: 600;
  font-size: 1.10rem;
}

</style>

<script>
import rodape from '../components/rodape.vue'
export default {
  name: 'Home',
  components: {
    rodape
  }
}
</script>
