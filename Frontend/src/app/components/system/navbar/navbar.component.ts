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
  isAdmin = false
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
      this.isAdmin =this.auth.isAdmin()
      this.setupMenu(res);
    })
    
    
   
  }

  setupMenu(Isloggedin:boolean) {
    
    this.navItems = [
      { name: 'Foglalás', url: 'bookinglist', icon: 'bi-journal-text' },
    
      ...(Isloggedin
        ? [
            ...(this.isAdmin
              ? [
                  
                  { name: 'Foglalások', url: 'bookings', icon: 'bi-journal-plus'},
                  { name: 'Szállások', url: 'accommodations', icon: ' bi-house-add' },
                  { name: 'Felhasználók', url: 'userlist', icon: ' bi-person-lines-fill' },
                ]
              : []),
            { name: 'Naptár', url: 'calendar', icon: 'bi-calendar' },
            { name: 'Profil', url: 'profile', icon: 'bi-person-circle' },
            { name: 'Kilépés', url: 'logout', icon: 'bi-box-arrow-right' },
          ]
        : [
            { name: 'Regisztráció', url: 'registration', icon: 'bi-arrow-up-circle' },
            { name: 'Bejelentkezés', url: 'login', icon: 'bi-box-arrow-up-left' },
          ]
      ),
    ];
    
  }

}
