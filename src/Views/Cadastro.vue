<template>
  <div class="layout-container">
    <header class="header-section">
      <h1>Cadastro de EPIs</h1>
      <p>Gerencie o catálogo de Equipamentos de Proteção Individual e C.A.</p>
    </header>

    <main class="content">
      <section class="card-form">
        <div class="card-header">
          <h3>{{ editandoId ? 'Editar Equipamento' : 'Novo Equipamento' }}</h3>
        </div>

        <form @submit.prevent="salvar" class="main-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nome do EPI*</label>
              <input v-model="form.nome" type="text" placeholder="Ex: Capacete" required>
            </div>

            <div class="form-group">
              <label>Número do C.A*</label>
              <input v-model="form.ca" type="text" placeholder="Ex: 159357" required>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Categoria*</label>
              <input v-model="form.categoria" type="text" placeholder="Ex: Segurança" required />
            </div>

            <div class="form-group">
              <label>Cor*</label>
              <input v-model="form.cor" type="text" placeholder="Ex: Branco" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Quantidade em estoque*</label>
              <input v-model="form.quantidade" type="number" min="0" placeholder="Ex: 10" required />
            </div>

            <div class="form-group">
              <label>Descrição/Observações</label>
              <input v-model="form.descricao" type="text" placeholder="Ex: Classe B, com Jugular" />
            </div>
          </div>

          <div class="form-group">
            <label>Foto (URL)</label>
            <input v-model="form.foto" type="text" placeholder="URL do Supabase Storage" />
          </div>

          <div class="divider"></div>

          <div class="action-bar">
            <button type="submit" class="btn btn-primary">
              {{ editandoId ? 'Salvar Alterações' : 'Cadastrar EPI' }}
            </button>
            <button type="button" @click="resetForm" class="btn btn-outline">
              Limpar formulário
            </button>
          </div>
        </form>
      </section>
      
      <section class="card-table desktop-only">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Equipamento</th>
              <th>Categoria</th>
              <th>CA</th>
              <th>Qtde</th>
              <th>Descrição</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(e, index) in epis" :key="e.id ?? index">
              <td><span class="text-bold">{{ e.nome }}</span></td>
              <td><span class="text-bold">{{ e.categoria }}</span></td>
              <td><span class="badge-ca">{{ e.ca }}</span></td>
              <td><span class="text-bold">{{ e.quantidade }}</span></td>
              <td>{{ e.descricao }}</td>
              <td class="text-center">
                <button @click="prepararEdicao(e)" class="btn-action edit">Editar</button>
                <button @click="excluir(e.id)" class="btn-action delete">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="cards-mobile mobile-only">
        <div v-for="(e, index) in epis" :key="e.id ?? index" class="card-item">
          <div class="card-item-header">
            <span class="card-item-nome">{{ e.nome }}</span>
            <span class="badge-ca">{{ e.ca }}</span>
          </div>
          <div class="card-item-info">
            <span><strong>Categoria:</strong> {{ e.categoria }}</span>
            <span><strong>Qtde:</strong> {{ e.quantidade }}</span>
          </div>
          <p class="card-item-desc">{{ e.descricao }}</p>
          <div class="card-item-acoes">
            <button @click="prepararEdicao(e)" class="btn-action edit">Editar</button>
            <button @click="excluir(e.id)" class="btn-action delete">Excluir</button>
          </div>
        </div>
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
  border-inline: solid 0.125rem #0a3b59;
  border-bottom: solid 0.125rem #0a3b59;
  border-radius: 0rem 0rem 1rem 1rem;
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

input {
  height: 2.25rem;
  border-radius: 1rem;
  border: none;
  padding: 0 1rem;
  background: #ffffff;
  font-size: 0.95rem;
}

input:focus {
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

.card-table {
  background: #f2f2f2;
  border-radius: 1rem;
  border: 0.125rem solid #0a3b59;
  overflow: hidden;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table th {
  height: 2.5rem;
  text-align: center;
  font-size: 0.80rem;
  color: #0a3b59;
  text-transform: uppercase;
  border-bottom: solid 0.125rem #0a3b59;
}

.styled-table td {
  text-align: center;
  height: 3rem;
  font-size: 0.95rem;
}

.badge-ca {
  background: #0d4c73;
  color: #f2f2f2;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.85rem;
  display: inline-block;
}

.edit {
  color: #0d4c73;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: bold;
  margin-right: 1rem;
}

.delete {
  color: #D94D1A;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: bold;
}

.text-center {
  text-align: center;
}

.cards-mobile {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-item {
  background: #f2f2f2;
  border-radius: 1rem;
  border: 0.125rem solid #0a3b59;
  padding: 1rem;
}

.card-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.card-item-nome {
  font-weight: 700;
  color: #0a3b59;
  font-size: 1rem;
}

.card-item-info {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 0.4rem;
}

.card-item-desc {
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 0.75rem;
}

.card-item-acoes {
  display: flex;
  gap: 1rem;
}

.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media (max-width: 1024px) {
  .header-section h1 {
    font-size: 1.3rem;
  }
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

  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: flex;
  }

  .header-section h1 {
    font-size: 1.2rem;
  }

  .header-section p {
    font-size: 0.85rem;
    padding: 0 0.5rem;
  }
}
</style>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { supabase } from '../composables/useSupabase'

const epis = ref([])
const editandoId = ref(null)

const defaultForm = () => ({
  nome: '',
  ca: '',
  categoria: '',
  cor: '',
  quantidade: 0,
  descricao: '',
  foto: ''
})

const form = reactive(defaultForm())

const resetForm = () => {
  Object.assign(form, defaultForm())
  editandoId.value = null
}

const carregar = async () => {
  const { data, error } = await supabase
    .from('epis')
    .select('*')
    .eq('ativo', true)
    .order('nome', { ascending: true })

  if (error) {
    alert('Erro ao carregar EPIs')
    return
  }

  epis.value = data || []
}

const salvar = async () => {
  const payload = {
    nome: form.nome,
    ca: form.ca,
    categoria: form.categoria,
    cor: form.cor,
    quantidade: Number(form.quantidade),
    descricao: form.descricao,
    foto: form.foto
  }

  const { error } = editandoId.value
    ? await supabase.from('epis').update(payload).eq('id', editandoId.value)
    : await supabase.from('epis').insert([payload])

  if (error) {
    alert('Erro ao salvar EPI')
    return
  }

  resetForm()
  await carregar()
}

const prepararEdicao = (e) => {
  editandoId.value = e.id
  Object.assign(form, e)
}

const excluir = async (id) => {
  if (!confirm('Deseja excluir este EPI? Todas as retiradas vinculadas também serão excluídas permanentemente.')) return

  const { error } = await supabase
    .from('epis')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro:', error)
    alert('Erro ao excluir EPI: ' + error.message)
    return
  }

  await carregar()
}

onMounted(carregar)
</script>