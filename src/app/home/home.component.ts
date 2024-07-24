import { Component, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EventCardComponent } from "../shared/components/event-card/event-card.component";
import { HomeService } from "./home.service";
import { Concert } from "../shared/models/concert.model";
import { AsyncPipe, NgClass, NgFor, NgIf, NgSwitch } from "@angular/common";
import { Genre } from "../shared/models/genre.model";
import { HighlightableDirective } from "../shared/directives/highlightable.directive";
import { map, Observable, shareReplay } from "rxjs";

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
  NgSwitch,
  HighlightableDirective,
  AsyncPipe
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

  concerts$ = new Observable<Concert[]>();
  genres$ = new Observable<Genre[]>();

  ngOnInit(): void {
    this.homeService.getData().subscribe((response) => {
      console.log(response);
      this.concerts = response.concerts;
      this.genres = response.genres;
    });

    const data$ = this.homeService.getData().pipe(shareReplay());

    this.concerts$ = data$.pipe(map((response) => response.concerts));
    this.genres$ = data$.pipe(map((response) => response.genres));
  }

}



















