import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  @Input() company = '';
  @Input() author = '';

  constructor(   
    private auth: AuthService
  ){
  }
    isLoggedIn = false
    ngOnInit(): void {
      this.auth.Isloggedin$.subscribe(res=>{
        this.isLoggedIn= res
      })    
    }
}
