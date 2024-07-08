import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Redirigir al usuario a la página de inicio
        this.router.navigate(['/home']);
      },
      error => {
        alert('Credenciales inválidas. Inténtalo de nuevo.');
        console.error('Error:', error);
      }
    );
  }
}
