import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden. Inténtalo de nuevo.');
      return;
    }

    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe(
      response => {
        alert('Usuario registrado exitosamente');
        // Redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      },
      error => {
        alert('Se registró correctamente.');
        console.error('Error:', error);
        this.router.navigate(['/login']);
      }
    );
  }
}
