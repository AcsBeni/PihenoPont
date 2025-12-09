import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../interfaces/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent implements OnInit { 
  message: Message | null = null;
  icon: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.message$.subscribe(msg => {
      this.message = msg;

      switch (msg?.severity) {
        case 'info':
          this.icon = 'bi bi-info-circle';
          break;
        case 'warning':
          this.icon = 'bi bi-radioactive';
          break;
        case 'danger':
          this.icon = 'bi bi-x-circle';
          break;
        case 'success':
          this.icon = 'bi bi-check-circle';
          break;
        default:
          this.icon = 'bi bi-patch-question';
          break;
      }
    });
  }
}
