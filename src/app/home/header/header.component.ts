import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { debounceTime, fromEvent } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  search(event: KeyboardEvent) {
    console.log('searching for: ' + event.key);
  }

  ngOnInit(): void {
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(debounceTime(1000))
      .subscribe((event: KeyboardEvent) => {
        console.log('searching for: ' + event.key);
      })
  }
}
