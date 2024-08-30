import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  titulo = new FormControl('');
  registerEventForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    date:new FormControl(''),
    hour: new FormControl(''),
    numberOfEntries: new FormControl(''),
    price: new FormControl(''),
    gender: new FormControl(''),
    state: new FormControl('')
  });

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  onSubmit() {
    console.warn(this.registerEventForm.value);
  }
  updateTitulo() {
    this.titulo.setValue('Angular 12');
  }
}
