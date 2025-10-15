// Importa a interface Funcionario para estabelecer o relacionamento entre entidades
// Isso permite que um Departamento conheça seus Funcionários (relacionamento 1-N)
import { Funcionario } from './funcionario';

// Esta interface espelha exatamente a entidade Departamento do backend
export interface Departamento {
  // ID único do departamento (PK). O backend (SQLite com auto-increment) gera o ID automaticamente
  id?: number;

  // Nome do departamento (ex: "Recursos Humanos", "Tecnologia da Informação")
  nome: string;

  // Sigla abreviada do departamento (ex: "RH", "TI", "VENDAS"). Campo OBRIGATÓRIO usado para identificação rápida
  sigla: string;

  // Coleção de funcionários associados a este departamento. Representa o relacionamento "UM departamento para MUITOS funcionários"
  funcionarios?: Funcionario[] | null;
}
