import { Component } from '@angular/core';
import { Users } from '../../../interfaces/user';
import { ApiService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Resp } from '../../../interfaces/apiresponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.scss',
})
export class UserlistComponent {
  users: Users[] = [];
  pagedUsers: Users[] = [];
  selectedUser: Users = {
    name: '',
    email: '',
    password: '',
    role:'user'
  };
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  IsAdmin = false;
  loggedUserId?: number;

  constructor(
    private api: ApiService,
    private message: MessageService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.IsAdmin = this.auth.isAdmin();
    if (!this.IsAdmin) {
      this.router.navigate(['/main']);
      return;
    }

    const logged = this.auth.loggedUser();
    this.loggedUserId = logged.id;

    this.getUsers();
  }

  getUsers() {
    this.api.selectAll('users').then((res: Resp) => {
      this.users = res.data;
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
      this.setPage(1);
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }

  editUser(id: number) {
    if (id === this.loggedUserId) {
      this.message.show('warning', 'Művelet megtagadva', "Nem szerkesztheted magad!");
      return;
    }
    const user = this.users.find(u => u.id === id);
    if (!user) {
      this.message.show('warning', 'Error', 'User not found!');
      return;
    }
    this.selectedUser = { ...user };
  }

  confirmEdit() {
    this.api.update('users', this.selectedUser.id!, this.selectedUser).then((res: Resp) => {
      if (res.status === 400) {
        this.message.show('danger', 'Error', res.message!);
        return;
      }
      if (res.status === 200) {
        this.message.show('success', 'Ok', res.message!);
        this.getUsers();
      }
    });
  }

  setDeleteId(id: number) {
    if (id === this.loggedUserId) {
      this.message.show('warning', 'Művelet megtagadva', "Nem törölheted magad!");
      return;
    }
    const user = this.users.find(u => u.id === id);
    if (!user) {
      this.message.show('warning', 'Error', 'Felhasználó nem található!');
      return;
    }
    this.selectedUser = user;
  }

  confirmDelete() {
    this.api.delete('users', this.selectedUser.id!).then(res => {
      if (res.status === 400) {
        this.message.show('danger', 'Error', res.message!);
        return;
      }
      if (res.status === 200) {
        this.message.show('success', 'Ok', res.message!);
        this.getUsers();
      }
    });
  }
}
