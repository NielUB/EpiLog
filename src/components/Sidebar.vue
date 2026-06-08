<template>
  <div class="shell">
    <div class="overlay" :class="{ ativo: menuAberto }" @click="menuAberto = false"></div>
    <button class="celular" @click="menuAberto = !menuAberto" aria-label="Menu">
      <span :class="{ aberto: menuAberto }"></span>
      <span :class="{ aberto: menuAberto }"></span>
      <span :class="{ aberto: menuAberto }"></span>
    </button>

    <aside class="sidebar" :class="{ aberto: menuAberto }">
      <div class="logotipo">
        <img class="logo" src="../assets/LogoTipo.svg">
      </div>

      <nav class="menu">
        <RouterLink to="/Nave/Estoque" class="menu-item" active-class="active" @click="fecharMenu">
          <span>Estoque</span>
        </RouterLink>

        <RouterLink to="/Nave/Cadastro" class="menu-item" active-class="active" @click="fecharMenu">
          <span>Cadastro de EPIs</span>
        </RouterLink>

        <RouterLink to="/Nave/Entregas" class="menu-item" active-class="active" @click="fecharMenu">
          <span>Entrega de EPIs</span>
        </RouterLink>

        <RouterLink to="/Nave/Funcionarios" class="menu-item" active-class="active" @click="fecharMenu">
          <span>Funcionários</span>
        </RouterLink>
      </nav>

      <button @click="sair" class="botao-sair">
        <i class="fas fa-sign-out-alt"></i>
        <span>Sair</span>
      </button>
    </aside>

    <main class="conteudo" :class="{ expandido: !menuAberto }">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.shell {
  display: flex;
  height: 100vh;
}

.sidebar {
  display: flex;
  gap: 1rem;
  width: 15rem;
  height: 100vh;
  background-color: #0A3B59;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
  overflow-y: auto;
  transition: transform 0.3s ease;
}

.logotipo {
  display: flex;
  background-color: #f2f2f2;
  width: 15rem;
}

.logo {
  width: 14rem;
  padding-left: 1rem;
}

.menu {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 1rem 1rem;
  color: #f2f2f2;
  text-decoration: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
  border-left: 0.2rem solid #f2f2f2;
}

.menu-item i {
  font-size: 20px;
  width: 24px;
  text-align: center;
}

.botao-sair {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  color: #f2f2f2;
  border: none;
  height: 2.5rem;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  gap: 0.5rem;
}

.botao-sair:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.botao-sair:active {
  transform: scale(0.98);
}

.conteudo {
  flex-grow: 1;
  margin-left: 15rem;
  padding: 1rem;
  overflow-y: auto;
  background: linear-gradient(45deg, rgba(13, 76, 115, 0.75), rgba(10, 59, 89, 1));
  min-height: 100vh;
}

.celular {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1100;
  background: #0A3B59;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
}

.celular span {
  display: block;
  width: 1.5rem;
  height: 2px;
  background: #f2f2f2;
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.celular span.aberto:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.celular span.aberto:nth-child(2) {
  opacity: 0;
}

.celular span.aberto:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 12rem;
  }

  .logotipo {
    width: 12rem;
  }

  .logo {
    width: 11rem;
  }

  .conteudo {
    margin-left: 12rem;
  }

  .menu-item {
    font-size: 1rem;
    padding: 0.75rem;
  }
}

@media (max-width: 768px) {
  .celular {
    display: flex;
  }

  .overlay {
    display: block;
  }

  .overlay.ativo {
    opacity: 1;
  }

  .sidebar {
    width: 15rem;
    transform: translateX(-100%);
  }

  .sidebar.aberto {
    transform: translateX(0);
  }

  .logotipo {
    width: 15rem;
  }

  .logo {
    width: 14rem;
  }

  .conteudo {
    margin-left: 0;
    padding: 1rem;
    padding-top: 4rem;
  }

  .menu-item {
    font-size: 1.1rem;
    padding: 1rem;
  }
}
</style>

<script setup>
import { ref } from 'vue'
import { useSupabase } from '../composables/useSupabase'
import { useRouter } from 'vue-router'
import { RouterLink, RouterView } from 'vue-router'

const { supabase } = useSupabase()
const router = useRouter()
const menuAberto = ref(false)

const fecharMenu = () => {
  menuAberto.value = false
}

async function sair() {
  try {
    await supabase.auth.signOut()
    router.push('/Login')
  } catch (err) {
    console.error('Erro ao fazer logout:', err)
    alert('Erro ao sair. Tente novamente.')
  }
}
</script>