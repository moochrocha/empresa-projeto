// Importa a função bootstrapApplication do Angular.
// Essa função é responsável por inicializar a aplicação Angular no navegador,
// substituindo o método tradicional de inicialização usado em versões anteriores (baseado em módulos).
import { bootstrapApplication } from '@angular/platform-browser';

// Importa a configuração principal da aplicação.
// 'appConfig' contém todos os providers globais, como rotas, serviços HTTP e detecção de mudanças.
import { appConfig } from './app/app.config';

// Importa o componente raiz da aplicação (App).
// Este é o primeiro componente renderizado ao iniciar a aplicação Angular.
import { App } from './app/app';

// Inicia (bootstrap) a aplicação Angular.
// Parâmetros:
// 1. App → componente raiz da aplicação.
// 2. appConfig → configuração global com serviços e rotas.
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
// Trata possíveis erros que podem ocorrer durante o processo de inicialização.
