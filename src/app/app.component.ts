import { JsonPipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

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
export class AppComponent {
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
}
