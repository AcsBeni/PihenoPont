import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Navitem } from '../../../interfaces/navitem';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent { 
  @Input() title =''
  navItems: Navitem[] = [];
  isLoggedIn = false
  loggedUserName=''

  constructor(   
    private auth: AuthService
  ){
  }


  ngOnInit(): void {
    this.auth.Isloggedin$.subscribe(res=>{
      this.isLoggedIn= res
      if(this.isLoggedIn){
        this.loggedUserName= this.auth.loggedUser().name
      }
      
      this.setupMenu(res);
    })
  }

  setupMenu(Isloggedin:boolean) {
    
    this.navItems = [
          { name: 'Calendar', url: 'calendar', icon: '' },
          { name: 'Booking', url: 'booking', icon: '' },
          
    ...(Isloggedin
      ? [
          
          { name: 'Profile', url: 'profile', icon: '' },
          { name: 'Kilépés', url: 'logout', icon: '' },
        ]
      : [
        { name: 'Sign up', url: 'registration', icon: '' },
        { name: 'Sign in', url: 'login', icon: '' },
        ]),
          
  ];
  }

}
