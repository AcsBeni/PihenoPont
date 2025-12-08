import { Routes } from '@angular/router';
import { AccommodationsComponent } from './components/admin/accommodations/accommodations.component';
import { BookingsComponent } from './components/admin/bookings/bookings.component';
import { UsersComponent } from './components/admin/users/users.component';
import { BookingComponent } from './components/user/booking/booking.component';
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { LostpassComponent } from './components/user/lostpass/lostpass.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { BookinglistComponent } from './components/guest/bookinglist/bookinglist.component';
import { FooterComponent } from './components/system/footer/footer.component';
import { HeaderComponent } from './components/system/header/header.component';
import { LightboxComponent } from './components/system/lightbox/lightbox.component';
import { MessageComponent } from './components/system/message/message.component';
import { NavbarComponent } from './components/system/navbar/navbar.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';

export const routes: Routes = [

    //ADMIN
    {path: 'accommodations', component:AccommodationsComponent},
    {path: 'bookings', component:BookingsComponent},
    {path: 'users', component:UsersComponent},

    //USER
    {path: 'booking', component:BookingComponent},
    {path: 'login', component:LoginComponent},
    {path: 'logout', component:LogoutComponent},
    {path: 'lostpass', component:LostpassComponent},
    {path: 'profile', component:ProfileComponent},
    {path: 'registration', component:RegistrationComponent},
    
    //GUEST
    {path: 'bookinglist', component:BookinglistComponent},

    //SYSTEM
    {path: 'footer', component:FooterComponent},
    {path: 'header', component:HeaderComponent},
    {path: 'lightbox', component:LightboxComponent},
    {path: 'message', component:MessageComponent},
    {path: 'navbar', component:NavbarComponent},
    {path: 'notfound', component:NotfoundComponent},
];
