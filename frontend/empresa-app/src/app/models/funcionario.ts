// Importa a interface Departamento para estabelecer o relacionamento bidirecional
// Isso permite que um Funcionário conheça seu Departamento e vice-versa
import { Departamento } from './departamento';

// Esta interface espelha exatamente a entidade Funcionario do backend ASP.NET
export interface Funcionario {
  // id único do funcionário (PK). Opcional pois é gerado atumaticamente pelo Sqlite (AI)
  id?: number;

  // Nome do funcionário (obrigatório)
  nome: string;

  // Foto do funcionário (opcional) via URL
  foto?: string | null;

  // RG do funcionário (opcional)
  rg?: string | null;

  // Chave estrangeira (FK) liga o funcionário a um departamento (obrigatório). Representa a relação N:1
  departamentoId: number;

  // Objeto Departamento completo (propriedade de navegação). Campo OPCIONAL - carregado apenas quando necessário (lazy loading)
  departamento?: Departamento | null;
}
