import { Component, inject } from '@angular/core';
import {  FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { GenreApiService } from '../services/api/genre-api.service';
import { Genre } from '../../shared/models/genre.model';
import { NotificationsService } from 'angular2-notifications';

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
  genreApiService = inject(GenreApiService);
  notifications = inject(NotificationsService);

  genresForm = this.formBuilder.group({
    name: ['', Validators.required],
    state: ['', Validators.required]
  })

  status: Status[] = [
    {value: true, viewValue: 'ACTIVO'},
    {value: false, viewValue: 'INACTIVO'}
  ];

  onSubmit() {
    console.warn(this.genresForm.value);
    this.createGenre();
  }

  private createGenre() {
    const requestGenre: Genre = {
      name: this.nameField.value,
      status: this.stateField.value
    }
    this.genreApiService.createGenre(requestGenre).subscribe(response => {
      console.log('response', response);
      if (response && response.success) {
        this.notifications.success('Género creado', 'El género se ha creado correctamente');
      } else {
        this.notifications.warn('Error', response.errorMessage);
      }
    });
  }

  get nameField(): FormControl {
    return this.genresForm.get('name') as FormControl;
  }

  get stateField(): FormControl {
    return this.genresForm.get('state') as FormControl;
  }
}
