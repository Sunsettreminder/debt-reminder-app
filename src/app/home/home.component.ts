import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string;
  currentDate: Date;
  formattedDate: string;
  deudasAPagarHoy: any[];
  deudasCercanas: any[];
  showConfirmation: boolean = false;
  deudaSeleccionada: any;

  constructor() { }

  ngOnInit() {
    this.username = 'Edward Castillo';
    this.currentDate = new Date();
    this.formattedDate = this.capitalizeFirstLetter(this.currentDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }));
    const hoy = this.formatDate(this.currentDate);

    const todasLasDeudas = [
      { id: 1, empresa: 'Empresa A', fechaVencimiento: '2024-07-07', monto: 100 },
      { id: 2, empresa: 'Empresa B', fechaVencimiento: '2024-07-07', monto: 150 },
      { id: 3, empresa: 'Empresa C', fechaVencimiento: '2024-07-08', monto: 200 },
      { id: 4, empresa: 'Empresa D', fechaVencimiento: '2024-07-09', monto: 200 },
      { id: 5, empresa: 'Empresa E', fechaVencimiento: '2024-07-07', monto: 200 },
      { id: 6, empresa: 'Empresa F', fechaVencimiento: '2024-07-10', monto: 250 },
      { id: 7, empresa: 'Empresa G', fechaVencimiento: '2024-07-14', monto: 300 },
      { id: 8, empresa: 'Empresa H', fechaVencimiento: '2024-07-16', monto: 300 },
    ];

    // Filtrar deudas a pagar hoy
    this.deudasAPagarHoy = todasLasDeudas.filter(deuda => deuda.fechaVencimiento === hoy);

    // Filtrar deudas cercanas (en los próximos 7 días)
    const proximos7Dias = new Date();
    proximos7Dias.setDate(proximos7Dias.getDate() + 7);
    const fechaLimite = this.formatDate(proximos7Dias);
    this.deudasCercanas = todasLasDeudas.filter(deuda => deuda.fechaVencimiento >= hoy && deuda.fechaVencimiento <= fechaLimite);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  confirmarPagar(deuda: any) {
    this.deudaSeleccionada = deuda; // Guardar la deuda seleccionada
    this.showConfirmation = true; // Mostrar el popup de confirmación
  }

  confirmAction() {
    console.log('Pagar deuda confirmada:', this.deudaSeleccionada);
    // Aquí iría tu lógica para pagar la deuda
    this.closePopup();
  }

  cancelAction() {
    console.log('Acción cancelada');
    this.closePopup();
  }

  closePopup() {
    this.showConfirmation = false;
    this.deudaSeleccionada = null; // Limpiar la deuda seleccionada
  } 
}
