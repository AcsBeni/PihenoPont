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
  const text = this.searchText.toLowerCase();

  this.accommodations = this.accommodations.filter(acc =>
    acc.name.toLowerCase().includes(text) ||
    acc.address.toLowerCase().includes(text)
  );
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
  
  ngOnInit(): void {
  this.loadAccommodations();
}
editMode = false;

loadAccommodations() {
  this.api.selectAll('accommodations').then(res => {
    this.accommodations = res.data;
  });
}
openAddModal() {
  this.editMode = false;

  this.selectedAccommodation = {
    id: 0,
    name: '',
    description: '',
    address: '',
    capacity: 0,
    basePrice: 0,
    active: true
  };
}


  searchText=""
  edit(_t8: any) {
  }
  delete(arg0: any) {
  }

}
