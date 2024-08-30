import { Component, inject } from '@angular/core';
import {  FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

interface Status {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule
  ],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent {
  formBuilder = inject(FormBuilder);

  genresForm = this.formBuilder.group({
    description: [''],
    state: ['']
  })

  status: Status[] = [
    {value: true, viewValue: 'ACTIVO'},
    {value: false, viewValue: 'INACTIVO'}
  ];

  onSubmit() {
    console.warn(this.genresForm.value);
  }
}
