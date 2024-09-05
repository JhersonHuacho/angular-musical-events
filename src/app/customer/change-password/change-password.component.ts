import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  authService = inject(AuthService);

  formGroupChangePassword = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
  });

  guardar() {
    console.log(this.formGroupChangePassword.value);
    const oldPassword = this.formGroupChangePassword.controls.oldPassword.value!;
    const newPassword = this.formGroupChangePassword.controls.newPassword.value!;

    this.authService.changePassword(oldPassword, newPassword).subscribe(response => {
      if (response.success) {
        console.log('Contraseña cambiada correctamente');
      } else {
        console.error(response.errorMessage);
      }
    })
  }
}
