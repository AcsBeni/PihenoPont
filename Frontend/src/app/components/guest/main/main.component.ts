import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { Accommodations } from '../../../interfaces/accommodation';
import { enviroment } from '../../../enviroment/enviroment';
import { Router, RouterModule } from '@angular/router';
import { LightboxComponent } from '../../system/lightbox/lightbox.component';

@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule, RouterModule, LightboxComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {

  serverUrl = enviroment.serverUrl

  
  
  constructor(
      private router:Router,
      private api:ApiService,
      private message:MessageService
    ){
      
    }
  searchQuery: string = '';
  checkInDate!: string;
  checkOutDate!: string;
  guests: number = 1;
  featuredPlaces:Accommodations[]=[]
  
  lightboxVisible = false;
  lightboxImage = '';

  ngOnInit(): void {
    this.getAccommodations();
  }
  getAccommodations() {
    this.api.selectAll('accommodations/home').then(res => {
      this.featuredPlaces = res.data;
  });
  }


  testimonials = [
    { text: 'Great experience, highly recommend!', author: 'Anna K.' },
    { text: 'Best hotels and service!', author: 'Gabor L.' },
    { text: 'Easy booking and friendly staff.', author: 'Maria T.' },
  ];

  search() {
    // Implement search logic here
    console.log('Searching for:', this.searchQuery, this.checkInDate, this.checkOutDate, this.guests);
  }
    //Lightbox
  openLightbox(image: string){
    this.lightboxImage = this.serverUrl + image;
    this.lightboxVisible = true;
  }
}
