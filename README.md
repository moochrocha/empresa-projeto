# 🏢 EmpresaApp - Sistema de Cadastro de Funcionários e Departamentos

Este projeto é uma aplicação **Full Stack** desenvolvida como parte de um desafio, composta por um **backend em ASP.NET Core** e um **frontend em Angular**.  
O objetivo é gerenciar **Departamentos** e **Funcionários** de uma empresa, permitindo cadastro, listagem, edição e exclusão.

---

## 🚀 Tecnologias Utilizadas

### 🖥️ Backend
- **ASP.NET Core 8**
- **Entity Framework Core**
- **SQLite**
- **C#**

### 💻 Frontend
- **Angular**
- **TypeScript**
- **Bootstrap 5**
- **HTML5 / CSS3**

### 🔧 Outras Ferramentas
- **Visual Studio 2022** (para o backend)
- **Visual Studio Code** (para o frontend)
- **Git + GitHub** (para versionamento)
- **Postman** (para testes da API)

### 🎨 Estilos e Layout
O projeto utiliza o **Bootstrap 5** para estilização e responsividade, garantindo uma interface moderna e adaptável a diferentes tamanhos de tela.

Instalação:
```bash
npm install bootstrap
---

## ⚙️ Como Executar o Projeto

### 1️⃣ Clonar o repositório
```
git clone https://github.com/<seu-usuario>/empresa-projeto.git
cd empresa-projeto
```

### ✅ Executar Backend
```bash
cd backend/EmpresaApi
dotnet restore
dotnet ef database update
dotnet run
```
A API será iniciada em:

- https://localhost:7117
- http://localhost:5117

### ✅ Executar Frontend
```bash
cd frontend/empresa-app
npm install
npm start
```
A aplicação estará disponível em:
- http://localhost:4200

empresa-projeto
│
├── backend/
│   └── EmpresaApi/
│       ├── Controllers/
│       ├── Data/
│       ├── Migrations/
│       ├── Models/
│       ├── Program.cs
│       ├── appsettings.json
│       └── EmpresaApi.csproj
│
├── frontend/
│   └── empresa-app/
│       ├── src/
│       │   ├── app/
│       │   │   ├── components/
│       │   │   ├── models/
│       │   │   └── services/
│       │   ├── index.html
│       │   └── main.ts
│       ├── package.json
│       └── angular.json
│
├── .gitignore
├── README.md
└── API.md
