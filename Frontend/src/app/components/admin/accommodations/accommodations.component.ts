import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Accommodations } from '../../../interfaces/accommodation';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-accommodations',
  imports: [CommonModule, FormsModule],
  templateUrl: './accommodations.component.html',
  styleUrl: './accommodations.component.scss',
})
export class AccommodationsComponent {
updateAccommodation() {
throw new Error('Method not implemented.');
}

search() {
}
  constructor(
    private api:ApiService,
    private auth:AuthService,
    private message:MessageService
  ){

  }
  selectedAccommodation:Accommodations={
    id: 0,
    name: '',
    description: '',
    address: '',
    capacity: 0,
    basePrice: 0,
    active: false
  }
  accommodations:Accommodations[]=[];
  accommodation:Accommodations={
    id: 0,
    name: '',
    description: '',
    address: '',
    capacity: 0,
    basePrice: 0,
    active: false,
    createdAt: undefined
  }
  
  acco = [
    {
      id: 1,
      name: 'Lakeview Apartment',
      location: 'Balatonfüred, Hungary',
      description: 'Beautiful apartment with a stunning lake view, perfect for couples and families.',
      price: 85,
      imageUrl: 'assets/accommodations/lakeview.jpg'
    },
    {
      id: 2,
      name: 'Mountain Cabin',
      location: 'Mátra Mountains',
      description: 'Cozy wooden cabin surrounded by nature, ideal for a peaceful getaway.',
      price: 65,
      imageUrl: 'assets/accommodations/cabin.jpg'
    },
    {
      id: 3,
      name: 'City Center Studio',
      location: 'Budapest',
      description: 'Modern studio apartment in the heart of the city, close to attractions.',
      price: 95,
      imageUrl: 'assets/accommodations/city.jpg'
    }
  ];
  searchText=""
  edit(_t8: any) {
  }
  delete(arg0: any) {
  }

}
