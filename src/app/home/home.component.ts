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
import { combineLatest, map, Observable, shareReplay, startWith, switchMap } from "rxjs";
import { SearchBarService } from "./services/search-bar.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

const MODULES = [
  MatSelectModule,
  MatFormFieldModule,
  ReactiveFormsModule
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
  AsyncPipe,
  RouterLink
]

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ ...MODULES, ...COMPONENTS, ...DIRECTIVES ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  genres$ = new Observable<Genre[]>();
  filteredConcerts$ = new Observable<Concert[]>();

  homeService = inject(HomeService);
  searchBarService = inject(SearchBarService);

  currentGenre = new FormControl(0);

  ngOnInit() {
    const data$ = this.homeService.getData().pipe(shareReplay(1));

    this.genres$ = data$.pipe(
      map((data) => data.genres.filter((genre) => genre.status))
    );

    const initialConcerts$ = data$.pipe(map((data) => data.concerts));

    const filterByGenre$ = this.currentGenre.valueChanges.pipe(
      startWith(0),
      switchMap((genreId) =>
        initialConcerts$.pipe(
          map((concerts) =>
            genreId === 0
              ? concerts
              : concerts.filter((concert) => concert.genreId === genreId)
          )
        )
      )
    );

    this.filteredConcerts$ = combineLatest([
      filterByGenre$,
      this.searchBarService.currentValue$,
    ]).pipe(
      map(([concerts, searchValue]) =>
        concerts.filter((concert) =>
          searchValue === ''
            ? true
            : concert.description
                .toLowerCase()
                .includes(searchValue.toLowerCase())
        )
      )
    );
  }

}



















