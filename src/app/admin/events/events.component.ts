import { AfterViewInit, Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import { GenreApiService } from '../services/api/genre-api.service';
import { GenreResponse } from '../../shared/models/genre.model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConcertGetApiResponseDto, ConcertPostApiRequest } from '../../shared/models/concert.model';
import { ConcertApiService } from '../services/api/concert.api.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgIf } from '@angular/common';

interface Food {
  value: string;
  viewValue: string;
}

interface Status {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit, AfterViewInit {

  genreApiService = inject(GenreApiService);
  listGenres: GenreResponse[] = [];
  titulo = new FormControl('');
  registerEventForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    date:new FormControl(''),
    hour: new FormControl(''),
    numberOfEntries: new FormControl(0),
    price: new FormControl(0),
    gender: new FormControl(0),
    state: new FormControl(true),
    imageUrl: new FormControl(''),
    imageName: new FormControl(''),
  });
  status: Status[] = [
    {value: true, viewValue: 'ACTIVO'},
    {value: false, viewValue: 'INACTIVO'}
  ];

  /** Table */
  concertApiService = inject(ConcertApiService);
  listConcerts: ConcertGetApiResponseDto[] = [];

  displayedColumns: string[] = [
    'title', 'description', 'dateEvent', 'ticketsQuantity', 'unitPrice', 'genre', 'status', 'action'
  ];
  dataSource = new MatTableDataSource<ConcertGetApiResponseDto>(this.listConcerts);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  /* end table*/

  selectedImage: string | ArrayBuffer | null = null;
  selectedFileImage: File | null = null;

  ngOnInit(): void {
    this.genreApiService.getGenres().subscribe(response => {
      console.log('response', response);
      if (response && response.success) {
        this.listGenres = response.data;
      }
    });

    this.concertApiService.getConcerts().subscribe(response => {
      console.log('response', response);
      if (response && response.success) {
        this.listConcerts = response.data;
        this.dataSource.data = this.listConcerts;
      }
    })

  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  onSubmit() {
    console.warn(this.registerEventForm.value);
    if (this.registerEventForm.valid) {
      const formData: ConcertPostApiRequest = {
        title: this.registerEventForm.controls.title.value!,
        description: this.registerEventForm.controls.description.value!,
        place: "Lima",
        unitPrice: this.registerEventForm.controls.price.value!,
        genreId: this.registerEventForm.controls.gender.value!,
        dateEvent: this.registerEventForm.controls.date.value!,
        timeEvent: this.registerEventForm.controls.hour.value!,
        imageUrl: this.registerEventForm.controls.imageUrl.value!,
        imageName: this.registerEventForm.controls.imageName.value!,
        imageFile: this.selectedFileImage!,
        ticketsQuantity: this.registerEventForm.controls.numberOfEntries.value!,
        status: this.registerEventForm.controls.state.value!
      }

      console.log("formData => ", formData);
      this.concertApiService.postConcert(formData).subscribe(response => {
        console.log('response', response);
        if (response && response.success) {
          const formDataResponse: ConcertGetApiResponseDto = {
            title: formData.title,
            description: formData.description,
            place: formData.place,
            unitPrice: formData.unitPrice,
            genreId: formData.genreId,
            genre: "",
            dateEvent: formData.dateEvent,
            timeEvent: formData.dateEvent,
            imageUrl: formData.imageUrl,
            ticketsQuantity: formData.ticketsQuantity,
            status: formData.status,
            finalized: false
          };
          this.listConcerts.push(formDataResponse);
          this.dataSource.data = this.listConcerts;
        }
      });
    }
  }
  updateTitulo() {
    this.titulo.setValue('Angular 12');
  }

  createEvent() {}

  onFileSelected(event: Event) {
    console.log('file selected');
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFileImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.registerEventForm.patchValue({
          imageUrl: reader.result as string,
          imageName: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  }
}
