// Importa o tipo Routes do Angular Router, usado para definir a estrutura e o comportamento das rotas
import { Routes } from '@angular/router';

// Importa os componentes que serão associados a cada rota da aplicação
import { ListarDepartamentoComponent } from './components/departamentos/listar-departamentos/listar-departamentos';
import { FormDepartamentoComponent } from './components/departamentos/form-departamento/form-departamento';
import { ListarFuncionariosComponent } from './components/funcionarios/listar-funcionarios/listar-funcionarios';
import { FormFuncionarioComponent } from './components/funcionarios/form-funcionario/form-funcionario';

// Define o conjunto de rotas da aplicação
// Cada rota mapeia um caminho (URL) para o componente correspondente
export const routes: Routes = [
  // Rota padrão: redireciona para /departamentos quando a URL estiver vazia
  // 'pathMatch: "full"' indica que o caminho deve corresponder exatamente à string vazia
  { path: '', redirectTo: '/departamentos', pathMatch: 'full' },

  // Rota para listar todos os departamentos (página principal)
  { path: 'departamentos', component: ListarDepartamentoComponent },

  // Rota para criar um novo departamento
  { path: 'departamentos/novo', component: FormDepartamentoComponent },

  // Rota para editar um departamento existente
  // ':id' é um parâmetro dinâmico que captura o ID do departamento da URL
  { path: 'departamentos/:id/editar', component: FormDepartamentoComponent },

  // Rota para listar funcionários de um departamento específico
  // Captura o ID do departamento para filtrar os funcionários
  { path: 'departamentos/:id/funcionarios', component: ListarFuncionariosComponent },

  // Rota para criar um novo funcionário
  // Pode receber 'departamentoId' como parâmetro de query string
  { path: 'funcionarios/novo', component: FormFuncionarioComponent },

  // Rota para editar um funcionário existente
  // ':id' captura o ID do funcionário a ser editado
  { path: 'funcionarios/editar/:id', component: FormFuncionarioComponent },

  // Rota curinga (fallback): redireciona qualquer URL não mapeada para /departamentos
  // Útil para tratar URLs inválidas e exibir uma rota padrão
  { path: '**', redirectTo: '/departamentos' },

  // futuramente: rota para listar funcionários do departamento
  // { path: 'departamentos/:id/funcionarios', component: ListarFuncionarioComponent },
];
