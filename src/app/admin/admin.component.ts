import { Component } from '@angular/core';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoggedInHeaderComponent } from '../shared/components/logged-in-header/logged-in-header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    LoggedInHeaderComponent,
    FooterComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
