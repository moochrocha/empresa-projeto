// Importa módulos e utilitários principais do Angular
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

// Importa o modelo (interface) de Funcionário
import { Funcionario } from '../../../models/funcionario';

// Importa o serviço que faz requisições HTTP relacionadas a funcionários (CRUD)
import { FuncionarioService } from '../../../services/funcionario';

// Importa o serviço e modelo de Departamento (usados para preencher o campo de seleção)
import { DepartamentoService } from '../../../services/departamento';
import { Departamento } from '../../../models/departamento';

// Define o componente Angular responsável pelo formulário de criação/edição de Funcionários
@Component({
  selector: 'app-form-funcionario', // Nome do seletor HTML do componente
  standalone: true, // Indica que o componente é independente
  imports: [CommonModule, FormsModule, RouterModule], // Importa módulos necessários
  templateUrl: './form-funcionario.html', // Caminho para o template HTML
  styleUrl: './form-funcionario.css', // Caminho para o arquivo CSS
})
export class FormFuncionarioComponent implements OnInit {
  // Objeto que representa o funcionário em edição ou criação
  funcionario: Funcionario = {
    nome: '',
    foto: '',
    rg: '',
    departamentoId: 0,
  };

  // Lista de departamentos disponíveis (para preencher o <select> no formulário)
  departamentos: Departamento[] = [];

  // Indica se o formulário está em modo de edição (true) ou criação (false)
  isEditando: boolean = false;

  // Guarda o ID do funcionário que está sendo editado (se aplicável)
  funcionarioId: number = 0;

  // Injeta os serviços e utilitários necessários:
  // - funcionarioService: para operações CRUD com funcionários
  // - departamentoService: para listar departamentos no formulário
  // - route: para capturar parâmetros da URL (ex: ID do funcionário)
  // - router: para redirecionar o usuário entre as telas
  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // Lifecycle hook executado ao iniciar o componente
  ngOnInit(): void {
    // Carrega todos os departamentos para preencher o <select>
    this.carregarDepartamentos();

    // Verifica se há um parâmetro "id" na rota para saber se é edição
    this.funcionarioId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.funcionarioId) {
      // Se houver ID, é modo edição
      this.isEditando = true;
      this.carregarFuncionario(this.funcionarioId);
    } else {
      // Se for novo, pega departamentoId da query string
      this.route.queryParams.subscribe((params) => {
        if (params['departamentoId']) {
          this.funcionario.departamentoId = Number(params['departamentoId']);
        }
      });
    }
  }

  // Método responsável por buscar todos os departamentos cadastrados
  carregarDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe({
      next: (departamentos) => {
        this.departamentos = departamentos;
      },
      error: (erro) => {
        console.error('Erro ao carregar departamentos:', erro);
      },
    });
  }

  // Busca os dados de um funcionário específico pelo ID (modo edição)
  carregarFuncionario(id: number): void {
    this.funcionarioService.getFuncionario(id).subscribe({
      next: (funcionario) => {
        this.funcionario = funcionario;
      },
      error: (erro) => {
        console.error('Erro ao carregar funcionário:', erro);
        alert('Erro ao carregar funcionário!');
      },
    });
  }

  // Salva as alterações do formulário (criação ou atualização)
  salvarFuncionario(): void {
    // Valida os campos obrigatórios antes de enviar
    if (!this.validarFormulario()) {
      return;
    }

    if (this.isEditando) {
      // Atualizar funcionário existente
      this.funcionarioService.updateFuncionario(this.funcionarioId, this.funcionario).subscribe({
        next: () => {
          console.log('Funcionário atualizado com sucesso!');
          // Redireciona para a listagem de funcionários do mesmo departamento
          this.router.navigate(['/departamentos', this.funcionario.departamentoId, 'funcionarios']);
        },
        error: (erro) => {
          console.error('Erro ao atualizar funcionário:', erro);
          alert('Erro ao atualizar funcionário!');
        },
      });
    } else {
      // Criar novo funcionário
      this.funcionarioService.createFuncionario(this.funcionario).subscribe({
        next: () => {
          console.log('Funcionário criado com sucesso!');
          this.router.navigate(['/departamentos', this.funcionario.departamentoId, 'funcionarios']);
        },
        error: (erro) => {
          console.error('Erro ao criar funcionário:', erro);
          alert('Erro ao criar funcionário!');
        },
      });
    }
  }

  // Valida se os campos obrigatórios foram preenchidos corretamente
  validarFormulario(): boolean {
    if (!this.funcionario.nome || this.funcionario.nome.trim() === '') {
      alert('Nome é obrigatório!');
      return false;
    }

    if (!this.funcionario.rg || this.funcionario.rg.trim() === '') {
      alert('RG é obrigatório!');
      return false;
    }

    if (!this.funcionario.departamentoId) {
      alert('Departamento é obrigatório!');
      return false;
    }

    return true; // Todos os campos obrigatórios foram preenchidos
  }

  // Cancela a operação e redireciona o usuário para a tela anterior
  cancelar(): void {
    if (this.funcionario.departamentoId) {
      this.router.navigate(['/departamentos', this.funcionario.departamentoId, 'funcionarios']);
    } else {
      this.router.navigate(['/departamentos']);
    }
  }
}
