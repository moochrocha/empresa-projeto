// Importa tipos e funções essenciais do Angular
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

// Importa função que registra o sistema de rotas (navegação entre páginas/componentes)
import { provideRouter } from '@angular/router';

// Importa função que permite o uso global de requisições HTTP (HttpClient)
import { provideHttpClient } from '@angular/common/http'; // ← IMPORTANTE: Adicionar isso

// Importa o conjunto de rotas definidas no arquivo 'app.routes.ts'
import { routes } from './app.routes';

// Configuração principal da aplicação Angular
// Define todos os "providers" (serviços globais) disponíveis para toda a aplicação
export const appConfig: ApplicationConfig = {
  providers: [
    // Configura o sistema de detecção de mudanças (zone.js)
    // 'eventCoalescing: true' melhora a performance ao agrupar múltiplos eventos
    // antes de renderizar novamente a interface
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Registra o sistema de rotas, permitindo navegação com <router-outlet>
    provideRouter(routes),

    // Disponibiliza o cliente HTTP para toda a aplicação (GET, POST, PUT, DELETE)
    provideHttpClient(), // ← IMPORTANTE: Adicionar essa linha
  ],
};
