import { Component } from '@angular/core';
import { Users } from '../../../interfaces/user';
import { ApiService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { enviroment } from '../../../enviroment/enviroment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../../interfaces/booking';

@Component({
  selector: 'app-bookings.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent {
statusChange(arg0: number) {
throw new Error('Method not implemented.');
}


currency = enviroment.currency;

  
    constructor(
      private api: ApiService,
      private message: MessageService,
      private authService: AuthService
    ) {}

    loggeduser:Users={
      name: '',
      email: '',
      password: '',
      role: 'user'
    }
    user: Users={
      name: '',
      email: '',
      password: '',
      role: 'user'
    }

    currentpage=1
    pageSize=5
    totalPages=1
    pagedBooking:Booking[]=[]
    selectedBooking:Booking={
      userId: 0,
      accommodationId: 0,
      persons: 0,
      Totalprice: 0,
      status: 'pending',
      accommodation: ''
    }
    formModal: any;
    editMode=false

    
    bookings:Booking[]=[]

    activeTab: string = 'userinfo';

   ngOnInit(): void {
      this.getLoggedUser();
      this.getBookings();
    }

  getBookings() {
    this.api.selectAll('bookings/fulldata').then((res) => {
      console.log(res.data)
      this.bookings = res.data;
      this.totalPages = Math.ceil(this.bookings.length / this.pageSize);
      this.setPage(1)
    });
  }

  getLoggedUser() {
    this.loggeduser = this.authService.loggedUser();
    
  }
 setPage(page:number){
      this.currentpage =page;
      const startIndex= (page-1) * this.pageSize;
      const endIndex= startIndex + this.pageSize;
      this.pagedBooking = this.bookings.slice(startIndex, endIndex)
  }
  
  bookingDelete(arg0: number|undefined) {
  throw new Error('Method not implemented.');
  }
  editBooking(id: number) {
    const idx = this.bookings.findIndex(u => u.id === id);
      if (idx !== -1) {
        this.selectedBooking = this.bookings[idx];
        console.log(this.selectedBooking)
       //this.selectedBooking.startDate = this.selectedBooking.startDate.split('T')[0];
      //this.selectedBooking.endDate = this.selectedBooking.endDate.split('T')[0];

      } else {
        this.message.show('warning', 'Hiba', 'A felhasználó nem található!');
      }
      ;
     
  }

}
