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
  selector: 'app-bookinglist',
  imports: [CommonModule,FormsModule],
  templateUrl: './bookinglist.component.html',
  styleUrl: './bookinglist.component.scss',
})
export class BookinglistComponent {
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

  // Ellenőrzések
  emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  //User model
  User:Users ={
  name:"",
  email:"",
  password:"",
  role:"user"
}

  // Booking form fields
  selectedAccommodationId: string = '0';
  startDate: string = '';
  endDate: string = '';
  persons: number = 1;
  totalPrice: number = 0;


    accommodations:Accommodations[]=[]

    ngOnInit(): void {
      this.getLoggedUser();
      this.User = this.loggeduser;
      this.loadAccommodations();
    }
  


  getLoggedUser() {
    this.loggeduser = this.authService.loggedUser();
    
  }

  async loadAccommodations() {
    const resp: Resp = await this.api.selectAll('accommodations');
    if (resp.status === 200) {
      this.accommodations = resp.data;
    } else {
      this.message.show('danger', 'HIBA', 'Hiba a szállások betöltésekor');
    }
  }

  calculatePrice() {
    const selectedAcc = this.accommodations.find(acc => acc.id === +this.selectedAccommodationId);
    if (selectedAcc && this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      if (end <= start) {
        this.totalPrice = 0;
        return;
      }
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      this.totalPrice = selectedAcc.basePrice * nights * this.persons;
    } else {
      this.totalPrice = 0;
    }
  }

  async submitBooking() {
    if (!this.User.email || !this.emailRegExp.test(this.User.email) || !this.User.name || !this.startDate || !this.endDate || !this.selectedAccommodationId || this.persons < 1) {
      this.message.show('danger', 'HIBA', 'Kérjük, töltse ki helyesen az összes mezőt!');
      return;
    }

    const selectedAcc = this.accommodations.find(acc => acc.id === +this.selectedAccommodationId);
    if (!selectedAcc) {
      this.message.show('danger','HIBA','Érvénytelen szállás kiválasztva!');
      return;
    }

    const bookingData: Booking = {
      userId: this.loggeduser.id || 0, // assuming loggeduser has id
      accommodationId: +this.selectedAccommodationId,
      startDate: new Date(this.startDate),
      endDate: new Date(this.endDate),
      persons: this.persons,
      totalPrice: this.totalPrice,
      status: 'pending',
      accommodation: selectedAcc.name,
      email: this.User.email
    };

   this.api.insert('bookings', bookingData).then(res => {
      if (res.status === 200) {
        this.message.show('success', 'Sikeres foglalás', 'Foglalása sikeresen elküldve!');
        this.resetForm();
      } else {
        this.message.show('danger', 'HIBA', 'Hiba történt a foglalás során. Kérjük, próbálja újra!');
      }
    });
  }
  getSelectedAccommodationPrice(): number {
    const selectedAcc = this.accommodations.find(acc => acc.id === +this.selectedAccommodationId);
    return selectedAcc?.basePrice || 0;
  }
  resetForm() {
    this.selectedAccommodationId = '0';
    this.startDate = '';
    this.endDate = '';
    this.persons = 1;
    this.totalPrice = 0;
  }
}
