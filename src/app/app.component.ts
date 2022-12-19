import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PocketService } from './pocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet],
})
export class AppComponent {
  title = 'pocket';
  pb = inject(PocketService);
  bananas = this.pb.bananas$;

  save(input: HTMLInputElement) {
    this.pb.setData('banana', { name: input.value });
    input.value = '';
  }
}
