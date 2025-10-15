// Importa os módulos e tipos principais do Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// Importa o serviço responsável pelas operações de CRUD com departamentos
import { DepartamentoService } from '../../../services/departamento';

// Importa o modelo (interface) que define a estrutura de um departamento
import { Departamento } from '../../../models/departamento';

// Define o componente Angular responsável por listar todos os departamentos
@Component({
  selector: 'app-listar-departamento', // Nome da tag HTML para uso no template
  standalone: true, // Componente independente
  imports: [CommonModule, RouterModule], // Importa módulos necessários para o template
  templateUrl: './listar-departamentos.html', // Caminho para o arquivo HTML
  styleUrls: ['./listar-departamentos.css'], // Caminho para o arquivo de estilos CSS
})
export class ListarDepartamentoComponent implements OnInit {
  // Armazena a lista de departamentos retornada do backend
  departamentos: Departamento[] = [];

  // Indica se os dados estão sendo carregados (útil para exibir spinners ou mensagens de "carregando...")
  loading = false;

  // Armazena mensagens de erro (caso haja falha ao carregar dados)
  error: string | null = null;

  // Construtor que injeta as dependências necessárias:
  // - deptService: serviço responsável pelas operações com a API de departamentos
  // - router: usado para navegar entre as páginas (ex: para tela de edição ou cadastro)
  constructor(private deptService: DepartamentoService, private router: Router) {}

  // Lifecycle hook executado quando o componente é inicializado
  // Chama o método load() para carregar a lista de departamentos automaticamente ao abrir a página
  ngOnInit(): void {
    this.load();
  }

  // Método responsável por buscar os departamentos do backend
  load(): void {
    this.loading = true;
    this.deptService.getDepartamentos().subscribe({
      // Quando a requisição é bem-sucedida, armazena o resultado e desativa o loading
      next: (res) => {
        this.departamentos = res;
        this.loading = false;
      },
      // Em caso de erro, registra no console e exibe mensagem ao usuário
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao carregar departamentos';
        this.loading = false;
      },
    });
  }

  // Redireciona o usuário para a tela de criação de um novo departamento
  novo(): void {
    this.router.navigate(['/departamentos/novo']);
  }

  // Redireciona para a tela de edição de um departamento existente
  // Recebe o ID do departamento e o inclui na rota
  editar(id?: number): void {
    if (!id) return;
    this.router.navigate(['/departamentos', id, 'editar']);
  }

  // Redireciona para a tela de listagem de funcionários de um determinado departamento
  verFuncionarios(id?: number): void {
    if (!id) return;
    this.router.navigate(['/departamentos', id, 'funcionarios']);
  }

  // Exclui um departamento após confirmação do usuário
  excluir(id?: number): void {
    if (!id) return;
    if (!confirm('Confirma exclusão do departamento?')) return;
    // Chama o serviço para excluir o departamento
    this.deptService.deleteDepartamento(id).subscribe({
      // Após excluir, recarrega a lista atualizada
      next: () => this.load(),
      // Em caso de erro, exibe alerta ao usuário
      error: (err) => {
        console.error(err);
        alert('Erro ao excluir departamento');
      },
    });
  }
}
