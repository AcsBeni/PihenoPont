import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Users } from '../../../interfaces/user';

@Component({
  selector: 'app-userlist.component',
  imports: [FormsModule, CommonModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss',
})
export class UserlistComponent {
  
  constructor(
    private router:Router,
    private api: ApiService,
    private message: MessageService,
    private auth: AuthService
  ) {}

  IsAdmin=false;
  Users:Users[]=[]


  ngOnInit(): void {
    this.IsAdmin = this.auth.isAdmin()
    if(!this.IsAdmin){
      this.router.navigate(['/main']);
      return
    }
      this.getUsers();

    }
  getUsers(){
    this.api.selectAll('users').then((res) => {
      this.Users = res.data;
      console.log(res.data)
    });
  }
}
