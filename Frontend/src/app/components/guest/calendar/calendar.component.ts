import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { Users } from '../../../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [],
    eventContent: function(info) {
      return { html: info.event.title.replace(/\n/g, '<br>') };
    }
  };

  loading = true;
  errorMessage = '';

  constructor(private api: ApiService,
  private authService: AuthService,
  private router:Router,
  ) {}

loggedUser:Users={
  id:0,
  name: '',
  password: '',
  email: ''
}
//User model
User:Users ={
  name:"",
  email:"",
  password:"",
  role:"user"
}

  async ngOnInit() {
    this.User = this.authService.loggedUser()
    if(!this.User){
      this.router.navigate(['/main']);
      return
    }
  
    this.loggedUser=this.authService.loggedUser()
    if (this.authService.isAdmin()) {
    try {
      const res = await this.api.selectAll('bookings/fulldata');
      if (res.status === 200 && Array.isArray(res.data)) {
        const events: EventInput[] = res.data.map((b: any) => ({
          id: b.id?.toString(),
          title: `${b.accommodation || ''}\n${b.email || ''}`.trim() || 'Foglalás',
          start: b.startDate,
          end: b.endDate,
          extendedProps: { status: b.status }
        }));
        this.calendarOptions = { ...this.calendarOptions, events };
      } else {
        this.errorMessage = 'Nem érkezett foglalás adat a szerverről.';
        console.warn('Unexpected bookings response', res);
      }
    } catch (err) {
      console.error('Calendar load error', err);
      this.errorMessage = 'Hiba történt a foglalások lekérésekor.';
    } finally {
      this.loading = false;
    }
  }
  else{
    try {
      const res = await this.api.selectAll(`bookings/fulldata/${this.loggedUser.id}`);
      if (res.status === 200 && Array.isArray(res.data)) {
        const events: EventInput[] = res.data.map((b: any) => ({
          id: b.id?.toString(),
          title: `${b.accommodation || ''}\n${b.email || ''}`.trim() || 'Foglalás',
          start: b.startDate,
          end: b.endDate,
          extendedProps: { status: b.status }
        }));
        this.calendarOptions = { ...this.calendarOptions, events };
      } else {
        this.errorMessage = 'Nem érkezett foglalás adat a szerverről.';
        console.warn('Unexpected bookings response', res);
      }
    } catch (err) {
      console.error('Calendar load error', err);
      this.errorMessage = 'Hiba történt a foglalások lekérésekor.';
    } finally {
      this.loading = false;
    }
  }
}
}
