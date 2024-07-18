import { Component, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EventCardComponent } from "../shared/components/event-card/event-card.component";
import { PruebaService } from "../prueba.service";
import { HomeService } from "./home.service";
import { Concert, emptyConcert } from "../shared/models/concert.model";
import { emptyGenre, Genre } from "../shared/models/genre.model";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    MatSelectModule,
    MatFormFieldModule,
    EventCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  homeService = inject(HomeService);
  concertTest: Concert = emptyConcert;
  genreTest: Genre = emptyGenre;

  ngOnInit(): void {
    this.homeService.getData().subscribe((response) => {
      console.log(response);
      this.concertTest = response.concerts[0];
      this.genreTest = response.genres[0];
    });
  }

}
