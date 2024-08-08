import { JsonPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, fromEvent, Observable, Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    UpperCasePipe,
    JsonPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  titleWithSignal = signal("musical-events");
  testFunctionSignal() {
    this.titleWithSignal.set("musical-events dos");
  }
  title = 'musical-events';
  age = 18;
  mayorDeEdad = false;
  objetoGlobal = {
    title: 'musical-events',
    age: 30
  }
  test() {
    return 'test';
  }
  classSeleccionado = 'seleccionado';
  testClick() {
    console.log('click');
  }
  titleNgModel = 'musical-events';

  // crear un observable
  observable$ = new Observable();
  suscription = new Subscription();
  bsubject = new BehaviorSubject(0);

  constructor() {
    const authService = inject(AuthService);
    authService.verifyLocalStorage();
  }

  ngOnInit(): void {
    // this.observable$.subscribe(() => {
    //   console.log('observable emitted a new value');
    // });
    this.observable$ = fromEvent(window, 'click');
    this.suscription = this.observable$.subscribe(() => {
      console.log('observable emitted a new value click');
    });

    setTimeout(() => {
      console.log('unsubscribe');
      this.suscription.unsubscribe();
    }, 5000);

    this.bsubject.subscribe({
      next: (v) => console.log(`observerA: ${v}`),
      error: (err) => console.log(`observerA: ${err}`),
      complete: () => console.log('observerA: complete')
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
