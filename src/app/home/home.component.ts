import { Component, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EventCardComponent } from "../shared/components/event-card/event-card.component";
import { HomeService } from "./home.service";
import { Concert } from "../shared/models/concert.model";
import { NgClass, NgFor, NgIf, NgSwitch } from "@angular/common";
import { Genre } from "../shared/models/genre.model";

const MODULES = [
  MatSelectModule,
  MatFormFieldModule
]

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  EventCardComponent
]

const DIRECTIVES = [
  NgClass,
  NgIf,
  NgFor,
  NgSwitch
]

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ ...MODULES, ...COMPONENTS, ...DIRECTIVES ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  homeService = inject(HomeService);
  concerts: Concert[] = [];
  genres: Genre[] = [];

  ngOnInit(): void {
    this.homeService.getData().subscribe((response) => {
      console.log(response);
      this.concerts = response.concerts;
      this.genres = response.genres;
    });
  }

}
