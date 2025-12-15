import { Component } from '@angular/core';
import { Resp } from '../../../interfaces/apiresponse';
import { Users } from '../../../interfaces/user';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {

  constructor(    
    private api: ApiService,
    private router: Router,
    private message: MessageService
  ) {}

  // Form fields
  confirmpassword: string = "";

  // Ellenőrzések
  passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // User model
  NewUser: Users = {
    name: "",
    email: "",
    password: "",
    role: "user"
  };

  AllUsers: Users[] = [];

  register() {
    //Hiányzó adatok nézése
    if (!this.NewUser.email || !this.NewUser.password || !this.NewUser.name || !this.confirmpassword) {
      this.message.show('danger', 'Hiba', "Nem adtál meg minden adatot!");
      return;
    }
    //Email ellenőrzése
    if (!this.emailRegExp.test(this.NewUser.email)) {
      this.message.show('danger', 'Hiba', "Érvénytelen email formátum!");
      return;
    }
    //Jelszó ellenőrzése
    if (!this.passwdRegExp.test(this.NewUser.password)) {
      this.message.show(
        'danger',
        'Hiba',
        "A jelszónak legalább 8 karakterből kell állnia, tartalmaznia kell kis- és nagybetűt, valamint számot!"
      );
      return;
    }

    //Jelszavak ugyanazok-e
    if (this.NewUser.password !== this.confirmpassword) {
      this.message.show('danger', 'Hiba', "Nem ugyanaz a kettő jelszó!");
      return;
    }
    // Regisztráció
    this.api.register('users', this.NewUser).then((res: Resp) => {

      if (res.status === 400) {
        this.message.show('danger', 'Hiba', `${res.message}`);
        return;
      }
      this.message.show('success', 'Ok', `Sikeresen létrehozott egy fiókot!`);
      let data ={
        
        "to":this.NewUser.email,
        "subject":"Regisztráció sikeres",
        "template":"registration",
        "data":{
          "username": this.NewUser.name,
          "email": this.NewUser.email,
          "password": this.NewUser.password,
          "loginUrl": "http://localhost:4200/login",
          "company": "Pihenőpont"
        }
      }
      this.api.sendEmail(data)
      this.NewUser = {
        name: "",
        email: "",
        password: "",
        role: "user"
      };
      this.confirmpassword = "";
      this.router.navigate(['/login']);
    });
  }
}
