// Importa funcionalidades principais do Angular
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// O decorator @Component define este arquivo como um componente Angular
@Component({
  // 'selector' é o nome da tag HTML usada para renderizar este componente no index.html
  selector: 'app-root',
  // 'imports' lista os recursos que este componente usa — aqui, o RouterOutlet que serve para carregar rotas (páginas) dinamicamente dentro deste componente
  imports: [RouterOutlet],
  // 'templateUrl' aponta para o arquivo HTML que define o layout visual deste componente
  templateUrl: './app.html',
  // 'styleUrl' (ou 'styleUrls' em versões antigas) define o arquivo CSS que estiliza o componente
  styleUrl: './app.css',
})

// A classe App é o componente raiz da aplicação Angular. É o primeiro componente carregado quando a aplicação inicia
export class App {
  // Cria uma propriedade reativa 'title' usando 'signal'
  // 'signal' é uma forma moderna do Angular para gerenciar estado reativo
  protected readonly title = signal('frontend');
}
