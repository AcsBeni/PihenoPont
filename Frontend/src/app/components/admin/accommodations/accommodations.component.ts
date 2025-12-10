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

search() {
}
  constructor(
    private api:ApiService,
    private auth:AuthService,
    private message:MessageService
  ){

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

  searchText=""
  edit(_t8: any) {
  }
  delete(arg0: any) {
  }

}
