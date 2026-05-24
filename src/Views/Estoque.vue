<template>
  <div class="inventario-page">
    <header class="top-section">
      <h1>Estoque de EPIs</h1>
    </header>

    <div class="grid-cards">
      <div v-for="epi in epis" :key="epi.id" class="card-epi">
        <div class="card-image">
          <!-- <img :src="epi.foto" :alt="epi.nome || 'EPI'" loading="lazy" /> -->
        </div>

        <div class="card-body">
          <div class="top-info">
            <div class="equipamento-info">
              <h3>{{ epi.nome }}</h3>
              <p class="categoria">{{ epi.categoria }}</p>
            </div>

            <div class="status" :class="{ indisponivel: (epi.estoque_disponivel || 0) <= 0 }">
              {{ (epi.estoque_disponivel || 0) > 0 ? 'Disponível' : 'Indisponível' }}
            </div>
          </div>

          <div class="info-row">
            <div class="info-item">
              <div class="info-content">
                <!-- <img class="info-icon" src="/cor.png" alt="Ícone cor" /> -->
                <div class="info-text">
                  <span class="label">Cor</span>
                  <strong>{{ epi.cor || 'Não informado' }}</strong>
                </div>
              </div>
            </div>

            <div class="info-item">
              <div class="info-content">
                <!-- <img class="info-icon" src="/estoque-pronto.png" alt="Ícone estoque" /> -->
                <div class="info-text">
                  <span class="label">Qtd. Disponível</span>
                  <!-- ✅ Usa estoque_disponivel calculado pela view -->
                  <strong>{{ epi.estoque_disponivel || 0 }} unidades</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-section {
  margin-bottom: 1.5rem;
}

.top-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #f2f2f2;
  text-align: center;
}

.grid-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.card-epi {
  background: #0d4c73;
  border-radius: 1rem;
  border: 0.15rem solid #f2f2f2;
  overflow: hidden;
  transition: 0.25s ease;
}

.card-epi:hover {
  transform: translateY(-0.25rem);
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.06);
}

.card-image {
  width: 100%;
  height: 17.5rem;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
  background: #f2f2f2;
}

.card-body {
  padding: 1rem;
}

.top-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f2f2f2;
  border-radius: 1rem;
  padding: 0.75rem;
  margin-bottom: 1rem;
}

.equipamento-info {
  flex: 1;
}

.card-body h3 {
  font-size: 1.12rem;
  color: #000000;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}

.categoria {
  font-size: 0.92rem;
  color: #777777;
  margin-top: 0.2rem;
}

.status {
  background: #d9f7e5;
  color: #119543;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.45rem 0.9rem;
  border-radius: 1rem;
  white-space: nowrap;
}

.status.indisponivel {
  background: #ffdede;
  color: #d11a2a;
}

.info-row {
  display: flex;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
}

.info-item,
.info-price {
  flex: 1;
}

.info-content {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  background: #f7f7f7;
  border: 0.1rem solid #ececec;
  border-radius: 0.9rem;
  padding: 0.9rem;
  height: 100%;
}

.info-icon {
  width: 1.7rem;
  height: 1.7rem;
  object-fit: contain;
  flex-shrink: 0;
}

.info-text {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 0.78rem;
  color: #707070;
  font-weight: 600;
  margin-bottom: 0.15rem;
}

.info-item strong,
.info-price strong {
  font-size: 1rem;
  color: #1f1f1f;
  font-weight: 700;
  line-height: 1.2;
}

@media (max-width: 1400px) {
  .grid-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .grid-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .info-row {
    flex-direction: column;
  }

  .top-section h1 {
    font-size: 2rem;
  }
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
// ✅ CORRIGIDO: import consistente com os outros componentes
import { supabase } from '../composables/useSupabase'

const epis = ref([])

const carregarEPIs = async () => {
  // ✅ CORRIGIDO: busca da view epis_estoque (estoque calculado automaticamente)
  // Filtra apenas EPIs ativos
  const { data, error } = await supabase
    .from('epis_estoque')
    .select('*')
    .eq('ativo', true)
    .order('nome')

  if (error) {
    console.error(error)
    return
  }

  epis.value = data || []
}

onMounted(() => {
  carregarEPIs()
})
</script>