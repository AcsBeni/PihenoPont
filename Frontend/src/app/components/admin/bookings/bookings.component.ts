import { Component } from '@angular/core';
import { Users } from '../../../interfaces/user';
import { ApiService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { enviroment } from '../../../enviroment/enviroment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../../interfaces/booking';
import { Resp } from '../../../interfaces/apiresponse';
import { Accommodations } from '../../../interfaces/accommodation';

@Component({
  selector: 'app-bookings.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
})
export class BookingsComponent {

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
      totalPrice: 0,
      status: 'pending',
      accommodation: ''
    }
    formModal: any;
    editMode=false

    accommodations:Accommodations[]=[]
    bookings:Booking[]=[]

    activeTab: string = 'userinfo';

   ngOnInit(): void {
      this.getLoggedUser();
      this.getBookings();
      this.getAccommodations();
      
    }
  getAccommodations(){
    this.api.selectAll('accommodations').then((res) => {
      console.log(res.data)
      this.accommodations = res.data;
     
      
    });
  }
  updateAccommodationId(selectedname: string) {
  this.selectedBooking.accommodationId = Number(this.accommodations.find(acc => acc.name === selectedname)?.id || null);
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
  
  
  editBooking(id: number) {
  const booking = this.bookings.find(b => b.id === id);

  if (!booking) {
    this.message.show('warning', 'Error', 'Booking not found!');
    return;
  }
  this.selectedBooking = { ...booking };
  this.updateAccommodationId(this.selectedBooking.accommodation);
  }

    confirmEdit() {
      this.api.update("bookings", Number(this.selectedBooking.id), this.selectedBooking).then((res:Resp)=>{
          if(res.status===400){
            this.message.show('danger', 'Hiba',  `${res.message}`)
            return
          }
          
          if(res.status===200){
            this.message.show('success','Ok', `${res.message}`)
            this.getBookings();
          }
        })
      
    }
    
    setDeleteId(id: number) {
       const idx = this.bookings.findIndex(u => u.id === id);
      if (idx !== -1) {
        this.selectedBooking = this.bookings[idx];
      } else {
        this.message.show('warning', 'Hiba', 'A felhasználó nem található!');
      };
    }
    confirmDelete() {
      this.api.delete("bookings", Number(this.selectedBooking.id)).then(res=>{
          if(res.status===400){
            this.message.show('danger', 'Hiba',  `${res.message}`)
            return
          }
          
          if(res.status===200){
            this.message.show('success','Ok', `${res.message}`)
            this.getBookings();
          }
        })
    }
      
    



}
