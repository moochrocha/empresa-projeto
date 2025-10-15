// ----------------------------------------------------------------------------
// Program.cs
//
// Ponto de entrada principal da aplicação ASP.NET Core Web API.
//
// Responsável por:
//  - Configurar serviços da aplicação (DbContext, Controllers, CORS, Swagger).
//  - Montar e executar o pipeline HTTP (middlewares).
//  - Determinar comportamento de execução (ex: ambiente de desenvolvimento).
//
// Framework: .NET 8 / ASP.NET Core Web API
// Banco de dados: SQLite (configurado em Data/AppDbContext.cs)
// Frontend autorizado: Angular (localhost:4200)
// ----------------------------------------------------------------------------

using EmpresaApi.Data;                  // Importa o contexto de banco de dados (AppDbContext)
using Microsoft.EntityFrameworkCore;    // Permite configuração do EF Core (UseSqlite, etc.)

// Cria o construtor da aplicação (WebApplicationBuilder)
// É o ponto inicial para registrar serviços e configurar o ambiente.
var builder = WebApplication.CreateBuilder(args);

// Configura o Entity Framework Core para usar SQLite como banco de dados.
// A string de conexão é buscada em appsettings.json → "ConnectionStrings:DefaultConnection".
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Adiciona suporte a Controllers.
// Isso permite que a aplicação interprete classes [ApiController] como endpoints REST.
builder.Services.AddControllers();

// Configura o CORS (Cross-Origin Resource Sharing).
// Necessário para permitir que o frontend Angular (em outra porta) acesse a API.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy
            .WithOrigins("http://localhost:4200") // porta do app Angular
            .AllowAnyHeader()                     // permite qualquer cabeçalho HTTP
            .AllowAnyMethod());                   // permite todos os métodos (GET, POST, PUT, DELETE)
});

// Configura o Swagger (ferramenta interativa de testes da API).
// Cria documentação automática e permite testar endpoints pelo navegador.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CONSTRUÇÃO DO APP (gera a instância WebApplication)
var app = builder.Build();


// Habilita Swagger apenas em ambiente de desenvolvimento.
// O Swagger não deve estar disponível em produção por segurança.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// Redireciona automaticamente HTTP → HTTPS.
app.UseHttpsRedirection();

// Habilita o uso da política CORS antes da autorização.
// Isso garante que as requisições externas sejam aceitas antes de validar autenticação.
app.UseCors("AllowAngularApp");

// Middleware de autorização.
// (Atualmente não há autenticação configurada, mas isso é o ponto de extensão para JWT futuramente.)
app.UseAuthorization();

// Mapeia automaticamente todos os Controllers da aplicação.
// Ou seja, classes decoradas com [ApiController] terão suas rotas habilitadas.
app.MapControllers();

// Inicia o servidor da aplicação.
app.Run();
