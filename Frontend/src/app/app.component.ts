import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/system/header/header.component";
import { NavbarComponent } from "./components/system/navbar/navbar.component";
import { FooterComponent } from "./components/system/footer/footer.component";
import { MessageComponent } from "./components/system/message/message.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    MessageComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']   
})
export class AppComponent {
  title = 'Pihenőpont';
  subtitle = 'Kényelmesen és egyszerűen egy magának tetsző szálloda választása';
  company = 'TÁJOB';
  author = 'ÁcsBenjámin/TardosOrsolya';
}

