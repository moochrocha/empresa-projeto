import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Funcionario } from '../../../models/funcionario';
import { FuncionarioService } from '../../../services/funcionario';
import { DepartamentoService } from '../../../services/departamento';
import { Departamento } from '../../../models/departamento';

// Componente responsável por listar os funcionários de um determinado departamento
@Component({
  selector: 'app-listar-funcionarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './listar-funcionarios.html',
  styleUrl: './listar-funcionarios.css',
})
export class ListarFuncionariosComponent implements OnInit {
  // Lista de funcionários do departamento atual
  funcionarios: Funcionario[] = [];

  // Dados do departamento atual
  departamento: Departamento | null = null;

  // ID do departamento obtido pela rota
  departamentoId: number = 0;

  // Injeta os serviços necessários para lidar com funcionários, departamentos e rotas
  constructor(
    private funcionarioService: FuncionarioService,
    private departamentoService: DepartamentoService,
    private route: ActivatedRoute
  ) {}

  // Executado ao iniciar o componente
  // Obtém o ID do departamento da URL e carrega os dados
  ngOnInit(): void {
    // Pega o ID do departamento da URL
    this.departamentoId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarDepartamento();
    this.carregarFuncionarios();
  }

  // Carrega os dados do departamento atual pelo ID
  carregarDepartamento(): void {
    this.departamentoService.getDepartamento(this.departamentoId).subscribe({
      next: (departamento) => {
        this.departamento = departamento;
      },
      error: (erro) => {
        console.error('Erro ao carregar departamento:', erro);
      },
    });
  }

  // Carrega todos os funcionários e filtra apenas os que pertencem ao departamento atual
  carregarFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe({
      next: (funcionarios) => {
        // Filtra funcionários pelo departamento
        this.funcionarios = funcionarios.filter((f) => f.departamentoId === this.departamentoId);
      },
      error: (erro) => {
        console.error('Erro ao carregar funcionários:', erro);
        alert('Erro ao carregar funcionários!');
      },
    });
  }

  // Exclui um funcionário com base no ID informado
  // Confirma a exclusão antes de executar e recarrega a lista após concluir
  excluirFuncionario(id: number | undefined): void {
    // ← Aceita number OU undefined
    if (!id) {
      console.error('ID do funcionário é inválido');
      return;
    }

    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarioService.deleteFuncionario(id).subscribe({
        next: () => {
          console.log('Funcionário excluído com sucesso!');
          this.carregarFuncionarios();
        },
        error: (erro) => {
          console.error('Erro ao excluir funcionário:', erro);
          alert('Erro ao excluir funcionário!');
        },
      });
    }
  }
}
