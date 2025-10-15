// Importa o decorador Component, usado para definir um componente Angular
import { Component } from '@angular/core';

// Importa módulos básicos para funcionalidades comuns do Angular
import { CommonModule } from '@angular/common';

// Importa FormsModule para permitir o uso de formulários com [(ngModel)]
import { FormsModule } from '@angular/forms';

// Importa serviços de roteamento para navegação e leitura de parâmetros de URL
import { Router, ActivatedRoute } from '@angular/router';

// Importa o serviço responsável por operações CRUD de departamentos
import { DepartamentoService } from '../../../services/departamento';

// Importa o modelo (interface) que representa a estrutura de um departamento
import { Departamento } from '../../../models/departamento';

// Define o componente Angular responsável pelo formulário de criação e edição de departamentos
@Component({
  selector: 'app-form-departamento', // Nome da tag HTML para este componente
  standalone: true, // Define que o componente é independente
  imports: [CommonModule, FormsModule], // Importa módulos necessários ao template
  templateUrl: './form-departamento.html', // Caminho para o arquivo de template HTML
  styleUrls: ['./form-departamento.css'], // Caminho para o arquivo de estilos CSS
})
export class FormDepartamentoComponent {
  // Objeto que armazena os dados do departamento (ligado ao formulário via two-way binding)
  departamento: Departamento = { nome: '', sigla: '' };

  // Indica se o formulário está em modo de edição (true) ou criação (false)
  isEdit = false;

  // Controla o estado de carregamento durante operações assíncronas
  loading = false;

  // Armazena mensagens de erro para exibir ao usuário
  error: string | null = null;

  // Injeta dependências via construtor:
  // - ActivatedRoute: para obter parâmetros da rota (ex: ID do departamento)
  // - Router: para redirecionar o usuário após salvar
  // - DepartamentoService: para acessar os métodos de API (GET, POST, PUT)
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deptService: DepartamentoService
  ) {
    // Obtém o ID do departamento da URL (caso exista)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Se houver um ID, significa que estamos em modo de edição
    if (id) {
      this.isEdit = true;
      this.loading = true;
      // Busca os dados do departamento pelo ID
      this.deptService.getDepartamento(id).subscribe({
        next: (d) => {
          this.departamento = d;
          this.loading = false;
        },
        error: (e) => {
          console.error(e);
          this.error = 'Erro ao carregar departamento';
          this.loading = false;
        },
      });
    }
  }

  // Método responsável por salvar os dados (criar ou atualizar)
  save(): void {
    // Se estiver editando um departamento existente
    if (this.isEdit && this.departamento.id) {
      this.deptService.updateDepartamento(this.departamento.id, this.departamento).subscribe({
        next: () => this.router.navigate(['/departamentos']),
        error: (e) => {
          console.error(e);
          alert('Erro ao atualizar');
        },
      });
      // Caso contrário, cria um novo departamento
    } else {
      this.deptService.createDepartamento(this.departamento).subscribe({
        next: () => this.router.navigate(['/departamentos']),
        error: (e) => {
          console.error(e);
          alert('Erro ao criar');
        },
      });
    }
  }

  // Cancela a operação e retorna para a lista de departamentos
  cancel(): void {
    this.router.navigate(['/departamentos']);
  }
}
