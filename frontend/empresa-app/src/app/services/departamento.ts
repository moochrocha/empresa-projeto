// 1. IMPORTAÇÕES - "Ferramentas que vou usar"
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../models/departamento';

// 2. CONFIGURAÇÃO DO SERVIÇO - "Preparando o entregador"
@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  // URL base da API de departamentos
  private apiUrl = 'http://localhost:5015/api/departamentos'; // ← Endereço da API

  // Injeta o HttpClient para realizar as requisições HTTP
  constructor(private http: HttpClient) {}

  // 3. MÉTODOS - "Ações que posso fazer"

  // GET - "Buscar todos os departamentos"
  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }

  // GET - "Buscar departamento por id"
  getDepartamento(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}/${id}`);
  }

  // POST - "Criar novo departamento"
  createDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento);
  }

  // PUT - "Atualizar departamento existente"
  updateDepartamento(id: number, departamento: Departamento): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, departamento);
  }

  // DELETE - "Excluir departamento"
  deleteDepartamento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
