// 1. IMPORTAÇÕES - "Ferramentas que vou usar"
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

// 2. CONFIGURAÇÃO DO SERVIÇO - "Preparando o entregador"
@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = 'http://localhost:5015/api/funcionarios';

  constructor(private http: HttpClient) { }

  // 3. MÉTODOS - "Ações que posso fazer"

  // GET - "Buscar todos os funcionários"
  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  // GET - "Buscar funcionário por id"
  getFuncionario(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }

  // POST - "Criar um funcionário"
  createFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  // PUT - "Atualizar um funcionário"
  updateFuncionario(id: number, funcionario: Funcionario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, funcionario);
  }

  // DELETE - "Exclui um funcionário"
  deleteFuncionario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getFuncionariosPorDepartamento(departamentoId: number): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}?departamentoId=${departamentoId}`);
  }
}