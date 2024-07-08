import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Debt } from '../models/debt.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DebtsService {

  private baseUrl = 'http://localhost:8080/api/debts'; // URL de tu backend

  constructor(private http: HttpClient, private authService: AuthService) { }

  getDebtsByUserId(userId: number): Observable<Debt[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Debt[]>(`${this.baseUrl}/user/${userId}`, { headers });
  }

  addDebt(debt: Debt, userId: number): Observable<Debt> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Debt>(`${this.baseUrl}/user/${userId}`, debt, { headers });
  }
}
