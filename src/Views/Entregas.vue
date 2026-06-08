<template>
  <div class="layout-container">
    <header class="header-section">
      <h1>Registrar Retirada de EPIs</h1>
      <p>Registre quando um funcionário retirar um EPI do estoque</p>
    </header>

    <main class="content">
      <section class="card-form">
        <div class="card-header">
          <h3>Informações do EPI</h3>
        </div>

        <form @submit.prevent="registrarRetirada" class="main-form">
          <div class="form-row">
            <div class="form-group">
              <label>Funcionário *</label>
              <select v-model.number="form.id_funcionario" required>
                <option disabled value="">Selecione o funcionário</option>
                <option
                  v-for="func in funcionarios"
                  :key="func.id_funcionario"
                  :value="func.id_funcionario"
                >
                  {{ func.nome }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>EPI a ser retirado *</label>
              <select v-model="form.id_epi" required>
                <option disabled value="">Selecione o EPI</option>
                <option
                  v-for="epi in epis"
                  :key="epi.id"
                  :value="epi.id"
                  :disabled="epi.estoque_disponivel <= 0"
                >
                  {{ epi.nome }} ({{ epi.estoque_disponivel }} disponível)
                </option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Estoque disponível</label>
              <input type="text" :value="epiSelecionado?.estoque_disponivel ?? 0" disabled />
            </div>

            <div class="form-group">
              <label>Quantidade a retirar *</label>
              <input
                v-model.number="form.quantidade"
                type="number"
                min="1"
                :max="epiSelecionado?.estoque_disponivel || 1"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Data da retirada *</label>
              <input v-model="form.data_retirada" type="date" required />
            </div>

            <div class="form-group">
              <label>Horário da retirada *</label>
              <input v-model="form.horario_retirada" type="time" required />
            </div>
          </div>

          <div class="form-group">
            <label>Observações</label>
            <textarea
              v-model="form.observacoes"
              placeholder="Adicione observações sobre a retirada do EPI..."
            ></textarea>
          </div>

          <div class="divider"></div>
          <div class="action-bar">
            <button type="submit" class="btn btn-primary">Registrar</button>
            <button type="button" class="btn btn-outline" @click="limparFormulario">
              Limpar formulário
            </button>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<style scoped>
.layout-container {
  height: 100%;
}

.content {
  padding-bottom: 1rem;
}

.header-section {
  text-align: center;
  padding-block: 1rem;
  background-color: #f2f2f2;
  border-radius: 1rem 1rem 0rem 0rem;
  border: solid 0.125rem #0a3b59;
}

.header-section h1 {
  color: #0a3b59;
  font-weight: 600;
  font-size: 1.5rem;
}

.header-section p {
  color: #0a3b59;
}

.card-form {
  background: #f2f2f2;
  border-radius: 0rem 0rem 1rem 1rem;
  border-inline: solid 0.125rem #0a3b59;
  border-bottom: solid 0.125rem #0a3b59;
  margin-bottom: 1rem;
  overflow: hidden;
}

.card-header {
  display: flex;
  background-color: #f2f2f2;
  align-items: center;
  height: 3rem;
}

.card-header h3 {
  padding-left: 1rem;
  color: #0a3b59;
}

.main-form {
  padding: 1rem;
  border-top: solid 0.125rem #0a3b59;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0a3b59;
  padding-left: 0.5rem;
  margin-bottom: 0.2rem;
}

input, select, textarea {
  height: 2.25rem;
  border-radius: 1rem;
  border: none;
  padding: 0 1rem;
  background: #ffffff;
  font-size: 0.95rem;
}

textarea {
  min-height: 6.94rem;
  padding-top: 1rem;
  resize: none;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  box-shadow: 0 0 0 0.1rem #0a3b59;
}

.divider {
  width: 100%;
  height: 0.1rem;
  background: rgba(0, 0, 0, 0.1);
  margin: 1rem 0 1.5rem;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.btn {
  height: 2.5rem;
  border-radius: 1rem;
  cursor: pointer;
  flex: 1;
}

.btn-primary {
  background: linear-gradient(45deg, rgba(13, 76, 115, 0.75), rgba(10, 59, 89, 1));
  color: #f2f2f2;
  border: none;
  font-weight: 500;
}

.btn-outline {
  background: transparent;
  border: 0.1rem solid #0a3b59;
  color: #0a3b59;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .action-bar {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .header-section h1 {
    font-size: 1.2rem;
  }

  .header-section p {
    font-size: 0.85rem;
    padding: 0 0.5rem;
  }
}

@media (max-width: 1024px) {
  .header-section h1 {
    font-size: 1.3rem;
  }
}
</style>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { supabase } from '../composables/useSupabase'

const epis = ref([])
const funcionarios = ref([])

const defaultForm = () => ({
  id_funcionario: '',
  id_epi: '',
  quantidade: 1,
  data_retirada: '',
  horario_retirada: '',
  observacoes: '',
})

const form = reactive(defaultForm())

const epiSelecionado = computed(() => {
  return epis.value.find(e => e.id === form.id_epi)
})

const resetForm = () => {
  Object.assign(form, defaultForm())
  const agora = new Date()
  form.data_retirada = agora.toISOString().split('T')[0]
  form.horario_retirada = agora.toTimeString().slice(0, 5)
}

const carregarEPIs = async () => {
  const { data, error } = await supabase
    .from('epis_estoque')
    .select('*')
    .eq('ativo', true)
    .order('nome')

  if (error) {
    console.error(error)
    alert('Erro ao carregar EPIs')
    return
  }

  epis.value = data || []
}

const carregarFuncionarios = async () => {
  const { data, error } = await supabase
    .from('funcionarios')
    .select('id_funcionario, nome')
    .order('nome')

  if (error) {
    console.error(error)
    alert('Erro ao carregar funcionários')
    return
  }

  funcionarios.value = data || []
}

const registrarRetirada = async () => {
  if (!epiSelecionado.value) {
    alert('Selecione um EPI válido')
    return
  }

  if (form.quantidade > epiSelecionado.value.estoque_disponivel) {
    alert('Quantidade maior que o estoque disponível')
    return
  }

  const retirado_em = `${form.data_retirada}T${form.horario_retirada}:00`

  const { error } = await supabase
    .from('retiradas')
    .insert([{
      id_funcionario: form.id_funcionario,
      id_epi: form.id_epi,
      quantidade: form.quantidade,
      retirado_em,
      observacoes: form.observacoes || null
    }])

  if (error) {
    console.error(error)
    alert('Erro ao registrar retirada')
    return
  }

  alert('Retirada registrada com sucesso!')
  resetForm()
  await carregarEPIs()
}

const limparFormulario = () => {
  resetForm()
}

onMounted(() => {
  resetForm()
  carregarEPIs()
  carregarFuncionarios()
})
</script>