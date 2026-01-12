import { Routes } from '@angular/router';
import { AccommodationsComponent } from './components/admin/accommodations/accommodations.component';
import { BookingsComponent } from './components/admin/bookings/bookings.component';
import { LoginComponent } from './components/user/login/login.component';
import { LogoutComponent } from './components/user/logout/logout.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { BookinglistComponent } from './components/guest/bookinglist/bookinglist.component';
import { FooterComponent } from './components/system/footer/footer.component';
import { HeaderComponent } from './components/system/header/header.component';
import { LightboxComponent } from './components/system/lightbox/lightbox.component';
import { MessageComponent } from './components/system/message/message.component';
import { NavbarComponent } from './components/system/navbar/navbar.component';
import { NotfoundComponent } from './components/system/notfound/notfound.component';
import { MainComponent } from './components/guest/main/main.component';
import { CalendarComponent } from './components/guest/calendar/calendar.component';
import { UserlistComponent } from './components/admin/userlist/userlist.component';

export const routes: Routes = [

    //ADMIN
    {path: 'accommodations', component:AccommodationsComponent},
    {path: 'bookings', component:BookingsComponent},
    {path: 'userlist', component:UserlistComponent},

    //USER
    {path: 'login', component:LoginComponent},
    {path: 'logout', component:LogoutComponent},
    {path: 'profile', component:ProfileComponent},
    {path: 'registration', component:RegistrationComponent},
    
    //GUEST
    {path: 'bookinglist', component:BookinglistComponent},
    {path: 'main', component:MainComponent},
    {path: 'calendar', component:CalendarComponent},
    
    //SYSTEM
    {path: 'footer', component:FooterComponent},
    {path: 'header', component:HeaderComponent},
    {path: 'lightbox', component:LightboxComponent},
    {path: 'message', component:MessageComponent},
    {path: 'navbar', component:NavbarComponent},
    { path: '', redirectTo: '/main', pathMatch: 'full'},
    {path: '**', component:NotfoundComponent},

];
