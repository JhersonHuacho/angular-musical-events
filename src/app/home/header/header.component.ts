import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { debounceTime, fromEvent, map, startWith } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { SearchBarService } from '../services/search-bar.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  searchBarFormControl = new FormControl('');
  searchBarService = inject(SearchBarService);
  authService = inject(AuthService);

  constructor() {
    this.searchBarService.currentValue$ =
      this.searchBarFormControl.valueChanges.pipe(
        map((value) => (value ? value : '')),
        debounceTime(300),
        startWith('')
      );
  }

  // search(event: KeyboardEvent) {
  //   console.log('searching for: ' + event.key);
  // }

  // ngOnInit(): void {
  //   fromEvent<KeyboardEvent>(document, 'keydown')
  //     .pipe(debounceTime(1000))
  //     .subscribe((event: KeyboardEvent) => {
  //       console.log('searching for: ' + event.key);
  //     })
  // }


}
