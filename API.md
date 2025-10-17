# 📘 Documentação da API – EmpresaApi

Esta documentação descreve os **endpoints disponíveis na API REST** desenvolvida em **ASP.NET Core** para gerenciamento de **departamentos** e **funcionários**.

---

## ⚙️ Tecnologias Utilizadas
- **ASP.NET Core 8.0**
- **Entity Framework Core**
- **SQLite**
- **C#**
- **Swagger** (opcional para testes)

---

## 🌐 URL Base da API
Durante o desenvolvimento:
- https://localhost:5001/api


Em produção, a URL base pode variar conforme o servidor.

---

## 🧩 Endpoints

### 🏢 Departamentos

#### ➕ Criar Departamento

**POST** `/api/departamentos`

```json
{
  "nome": "Tecnologia da Informação",
  "sigla": "TI"
}
```
Resposta (201 - Created):
```json
{
  "id": 1,
  "nome": "Tecnologia da Informação",
  "sigla": "TI"
}
```
---
📋 Listar Departamentos

**GET** `/api/departamentos`

Resposta (200 - OK):

```json
[
  { "id": 1, "nome": "Tecnologia da Informação", "sigla": "TI" },
  { "id": 2, "nome": "Recursos Humanos", "sigla": "RH" }
]
```
---
🔍 Buscar Departamento por ID

**GET** `/api/departamentos/{id}`
Resposta (200 - OK):
```json
{
  "id": 3,
  "nome": "Recursos Humanos",
  "sigla": "RH",
  "funcionarios": [
    {
      "id": 3,
      "nome": "Moises Rocha de Holanda",
      "foto": "https://fwmedia.fandomwire.com/wp-content/uploads/2023/10/03110035/Monkey-D.-Luffy.jpg",
      "rg": "999",
      "departamentoId": 3
    }
```
---
✏️ Atualizar Departamento

**PUT** `/api/departamentos/{id}`
```json
{
  "id": 1,
  "nome": "TI - Tecnologia",
  "sigla": "TEC"
}
```
Resposta (204 - No Content)  
Departamento atualizado com sucesso.
---
🗑️ Excluir Departamento

**DELETE** `/api/departamentos/{id}`

Resposta (204 - No Content)  
Departamento excluído com sucesso.
---
##👩‍💼 Funcionários

➕ Criar Funcionário

**POST** `/api/funcionarios`
```json
{
  "nome": "João Silva",
  "rg": "123456789",
  "foto": "https://exemplo.com/foto.jpg",
  "departamentoId": 1
}
```
Resposta (201 - Created)
---
📋 Listar Funcionários

**GET** `/api/funcionarios`

Resposta (200 - OK):
```json
{
    "id": 3,
    "nome": "Moises Rocha de Holanda",
    "foto": "https://fwmedia.fandomwire.com/wp-content/uploads/2023/10/03110035/Monkey-D.-Luffy.jpg",
    "rg": "999",
    "departamentoId": 3
  }
  ```
---
🔍 Buscar Funcionário por ID

**GET** `/api/funcionarios/{id}`

Resposta (200 - OK):
```json
{
    "id": 3,
    "nome": "Moises Rocha de Holanda",
    "foto": "https://fwmedia.fandomwire.com/wp-content/uploads/2023/10/03110035/Monkey-D.-Luffy.jpg",
    "rg": "999",
    "departamentoId": 3
}
```
---
✏️ Atualizar Funcionário

**PUT** `/api/funcionarios/{id}`
```json
{
  "id": 1,
  "nome": "João S. Silva",
  "rg": "123456789",
  "foto": "https://exemplo.com/foto.jpg",
  "departamentoId": 1
}
```
Resposta (204 - No Content)  
Funcionário atualizado com sucesso.
---
🗑️ Excluir Funcionário

**DELETE** `/api/funcionarios/{id}`

Resposta (204 - No Content)  
Funcionário excluído com sucesso.
---

🧪 Testando a API

Você pode testar os endpoints usando:

- Postman
- Insomnia
- Swagger UI (/swagger)

🔐 Códigos de Resposta Comuns
```
| Código | Significado                                              |
| ------ | -------------------------------------------------------- |
| 200    | OK – Requisição bem-sucedida                             |
| 201    | Created – Recurso criado com sucesso                     |
| 204    | No Content – Operação bem-sucedida sem corpo de resposta |
| 400    | Bad Request – Erro de validação ou formato incorreto     |
| 404    | Not Found – Recurso não encontrado                       |
| 500    | Internal Server Error – Erro interno no servidor         |
```
