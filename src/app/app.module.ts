import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ComponentsModule } from './components/components.module';

// Servicios
import { AuthService } from './services/auth.service';
import { DebtsService } from './services/debt.service';

// Registrar el locale 'es'
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    AuthService,
    DebtsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
