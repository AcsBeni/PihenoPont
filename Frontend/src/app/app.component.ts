import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Türr Pizzeria';
  subtitle = 'Ha megéhezel programozás közben :)';
  company = 'Bajai SZC Türr István Technikum';
  author = '13.a szoftverfejlesztő'
}
