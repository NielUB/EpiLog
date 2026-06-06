<template>
  <div class="layout-container">
    <header class="header-section">
      <h1>Gestão de Funcionários</h1>
      <p>Gerencie o cadastro de colaboradores.</p>
    </header>

    <main class="content">
      <section class="card-form">
        <div class="card-header">
          <h3>{{ editandoId ? 'Alterar Registro' : 'Novo Funcionário' }}</h3>
        </div>

        <!-- ✅ email removido do form (fonte de verdade é profiles.email) -->
        <form @submit.prevent="salvar" class="main-form">
          <div class="form-row">
            <div class="form-group">
              <label>Nome</label>
              <input v-model="form.nome" type="text" required />
            </div>

            <div class="form-group">
              <label>Cargo</label>
              <input v-model="form.cargo" type="text" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Data de Nascimento</label>
              <input v-model="form.data_nascimento" type="date" required />
            </div>
          </div>

          <div class="divider"></div>

          <div class="action-bar">
            <button type="submit" class="btn btn-primary">
              {{ editandoId ? 'Atualizar' : 'Cadastrar' }}
            </button>
          
            <button type="button" @click="cancelarEdicao" class="btn btn-outline">
              Limpar formulário
            </button>
          </div>
        </form>
      </section>

      <section class="card-table">
        <table class="styled-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Data Nasc.</th>
              <th class="text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="f in funcionarios" :key="f.id_funcionario">
              <td><span class="text-bold">{{ f.nome }}</span></td>
              <td><span class="text-bold">{{ f.cargo }}</span></td>
              <td>{{ formatDate(f.data_nascimento) }}</td>
              <td class="text-center">
                <button class="btn-action edit" @click="prepararEdicao(f)">Editar</button>
                <button class="btn-action delete" @click="excluir(f.id_funcionario)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
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
  backdrop-filter: blur(1rem);
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
  margin-top: 1rem;
}

.btn {
  height: 2.5rem;
  width: 12rem;
  border-radius: 1rem;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(45deg, rgba(13, 76, 115, 0.75), rgba(10, 59, 89, 1));
  color: #f2f2f2;
  border: none;
  width: 30rem;
  border-radius: 1rem;
  font-weight: 500;
}

.btn-outline {
  border-radius: 1rem;
  background: transparent;
  border: 0.1rem solid #0a3b59;
  width: 30rem;
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
  width: 15rem;
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

.text-bold {
  color: black;
}

.btn-action {
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.edit {
  color: #0d4c73;
  margin-right: 1rem;
}

.delete {
  color: #D94D1A;
}

.text-center {
  text-align: center;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { supabase } from '../composables/useSupabase.js'

const funcionarios = ref([])
const editandoId = ref(null)

const form = reactive({
  nome: '',
  cargo: '',
  data_nascimento: ''
})

const carregar = async () => {
  const { data, error } = await supabase
    .from('funcionarios')
    .select('*')
    .order('nome')

  if (error) {
    console.error(error.message)
    alert('Erro ao carregar funcionários')
    return
  }

  funcionarios.value = data || []
}

const salvar = async () => {
  const payload = {
    nome: form.nome,
    cargo: form.cargo,
    data_nascimento: form.data_nascimento
  }

  const { error } = editandoId.value
    ? await supabase.from('funcionarios').update(payload).eq('id_funcionario', editandoId.value)
    : await supabase.from('funcionarios').insert([payload])

  if (error) {
    console.error(error.message)
    alert('Erro ao salvar funcionário')
    return
  }

  cancelarEdicao()
  await carregar()
}

const prepararEdicao = (f) => {
  editandoId.value = f.id_funcionario
  Object.assign(form, {
    nome: f.nome,
    cargo: f.cargo,
    data_nascimento: f.data_nascimento
  })
}

const excluir = async (id) => {
  if (!confirm('Deseja realmente excluir este funcionário?')) return

  const { error } = await supabase
    .from('funcionarios')
    .delete()
    .eq('id_funcionario', id)

  if (error) {
    console.error(error.message)
    alert('Erro ao excluir funcionário')
    return
  }

  await carregar()
}


const cancelarEdicao = () => {
  editandoId.value = null
  Object.assign(form, {
    nome: '',
    cargo: '',
    data_nascimento: ''
  })
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('pt-BR')
}

onMounted(carregar)
</script>