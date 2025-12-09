import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { Users } from '../../../interfaces/user';
import { Resp } from '../../../interfaces/apiresponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(    
    private api:ApiService,
    private router:Router,
    private auth:AuthService,
    private message:MessageService
    ){
  }
  
  User:Users ={
    ID:0,
    name:"",
    email:"",
    password:"",
    role:"user"
  }

  rememberMe:boolean=false
  login(){
    if(this.User.email == "" || this.User.password ==""){
      this.message.show('danger', 'Hiba', "Nem adtál meg minden adatot!")
      return;
    }

    this.api.login('users/login',this.User).then((res:Resp)=>{
       if(res.status===500){
        this.message.show('danger', 'Hiba',  `${res.message}`)
        return
      }
      if(res.status===400){
        this.message.show('danger', 'Hiba',  `${res.message}`)
        return
      }
      if(this.rememberMe){
        this.auth.storeUser(JSON.stringify(res.data))
      }
      if(res.status===200){
        this.auth.login(JSON.stringify(res.data))
        this.message.show('success','Ok', `${res.message}`)
       
        this.router.navigate(['/main']);
      }
    })
    
  }
}
