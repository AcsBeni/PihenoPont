import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Accommodations } from '../../../interfaces/accommodation';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';
import { Resp } from '../../../interfaces/apiresponse';
import { enviroment } from '../../../enviroment/enviroment';
import { Router } from '@angular/router';
import { LightboxComponent } from '../../system/lightbox/lightbox.component';

@Component({
  selector: 'app-accommodations',
  imports: [CommonModule, FormsModule, LightboxComponent],
  templateUrl: './accommodations.component.html',
  styleUrl: './accommodations.component.scss',
})
export class AccommodationsComponent {

  serverUrl = enviroment.serverUrl

  constructor(
    private router:Router,
    private api:ApiService,
    private auth:AuthService,
    private message:MessageService
  ){
    
  }
  searchText=""
  editMode = false;
  lightboxVisible = false;
  lightboxImage = '';

  IsAdmin =false
      
  addImageFile?: File | null = null;
  editImageFile?: File | null = null;
    
  selectedAccommodation:Accommodations={
    id: 0,
    name: '',
    description: '',
    address: '',
    capacity: 0,
    basePrice: 0,
    active: false
  }
  newAccommodation:Accommodations={
    id: 0,
    name: '',
    description: '',
    address: '',
    capacity: 0,
    basePrice: 0,
    active: false,
  }
  accommodations:Accommodations[]=[];
  Allaccommodation:Accommodations[]=[]
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
  this.getAccommodations();
  this.IsAdmin = this.auth.isAdmin()
  
}


onAddFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.addImageFile = file;
  }
}
onEditFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    this.editImageFile = file;
  }
}

getAccommodations() {
  this.api.selectAll('accommodations/accommodation_admin').then(res => {
    this.Allaccommodation = res.data;
    this.accommodations = res.data
  });
}
search() {
  const text = this.searchText.toLowerCase();
  
  this.accommodations = this.Allaccommodation.filter(acc =>
    acc.name.toLowerCase().includes(text) ||
    acc.address.toLowerCase().includes(text)
  );
}
//EDIT

  editAccommodation(id: number) {
    const accommodation = this.accommodations.find(b => b.id === id);
    this.editImageFile = null
    if (!accommodation) {
      this.message.show('warning', 'Error', 'accommodations not found!');
      return;
    }
    this.selectedAccommodation = { ...accommodation };
    this.updateAccommodationId(this.selectedAccommodation.name);
  }
  updateAccommodationId(selectedname: string) {
    this.selectedAccommodation.id = Number(this.accommodations.find(acc => acc.name === selectedname)?.id || null);
  }
  async confirmEdit() {
  if (this.editImageFile) {
    const formData = new FormData();
    formData.append('image', this.editImageFile);

    const res = await this.api.imgUpdate("upload",Number(this.selectedAccommodation.id),formData);
    if (res.status !== 200) {
      this.message.show('danger', 'Hiba', res.message!);
      return;
    }
  }
  
  this.api.update("accommodations",Number(this.selectedAccommodation.id),this.selectedAccommodation).then((res: Resp) => {
    if (res.status === 400) {
      this.message.show('danger', 'Hiba', res.message!);
      return;
    }

    if (res.status === 200) {
      this.message.show('success', 'Ok', res.message!);
      this.selectedAccommodation={
        id: 0,
        name: '',
        description: '',
        address: '',
        capacity: 0,
        basePrice: 0,
        active: false
      }
      this.getAccommodations();
    }
  });
}

  
  //Delete
  setDeleteId(id: number) {
    const idx = this.accommodations.findIndex(u => u.id === id);
    if (idx !== -1) {
      this.selectedAccommodation = this.accommodations[idx];
    } else {
      this.message.show('warning', 'Hiba', 'A felhasználó nem található!');
    };
  }
  confirmDelete() {
    this.api.imgDelete("upload", this.selectedAccommodation.id).then(res=>{
      if(res.status===400){
          this.message.show('danger', 'Hiba',  `${res.message}`)
          return
      }
    })
    this.api.delete("accommodations", Number(this.selectedAccommodation.id)).then(res=>{
        if(res.status===400){
          this.message.show('danger', 'Hiba',  `${res.message}`)
          return
        }
          
        if(res.status===200){
          this.message.show('success','Ok', `${res.message}`)
          this.getAccommodations();
        }
    })

  }
  //ADDNEW
  
  async addNewAccommodation() {
    if (this.addImageFile) {
      const formData = new FormData();
      formData.append('image', this.addImageFile);

      const res = await this.api.imgUpload("upload", formData);
      if (res.status !== 200) {
        this.message.show('danger', 'Hiba', res.message!);
        return;
      }
      
      this.newAccommodation.imagePath =  `/uploads/${res.data.filename}`;
     
    }
    this.api.insert("accommodations/accommodation_admin", this.newAccommodation)
      .then(res => {
        if(res.status===400){
          this.message.show('danger', 'Hiba',  `${res.message}`);
          return;
        }
        if(res.status===200){
          this.message.show('success','Ok', `${res.message}`);
          this.getAccommodations();
          this.newAccommodation={
              id: 0,
              name: '',
              description: '',
              address: '',
              capacity: 0,
              basePrice: 0,
              active: false,
          }
        }
    });
  }
  //Lightbox
  openLightbox(image: string){
    this.lightboxImage = this.serverUrl + image;
    this.lightboxVisible = true;
  }
}