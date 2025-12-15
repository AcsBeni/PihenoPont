import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  searchQuery: string = '';
  checkInDate!: string;
  checkOutDate!: string;
  guests: number = 1;

  featuredPlaces = [
    { name: 'Budapest', image: '', description: 'Historic city with thermal baths.' },
    { name: 'Balaton', image: '', description: 'Relax by the lake.' },
    { name: 'Eger', image: '', description: 'Famous for wines and castle.' },
  ];

  testimonials = [
    { text: 'Great experience, highly recommend!', author: 'Anna K.' },
    { text: 'Best hotels and service!', author: 'Gabor L.' },
    { text: 'Easy booking and friendly staff.', author: 'Maria T.' },
  ];

  search() {
    // Implement search logic here
    console.log('Searching for:', this.searchQuery, this.checkInDate, this.checkOutDate, this.guests);
  }
}
