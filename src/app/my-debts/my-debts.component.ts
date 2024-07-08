import { Component, OnInit } from '@angular/core';
import { DebtsService } from '../services/debt.service';
import { Debt } from '../models/debt.model';

@Component({
  selector: 'app-my-debts',
  templateUrl: './my-debts.component.html',
  styleUrls: ['./my-debts.component.css']
})
export class MyDebtsComponent implements OnInit {
  deudasFiltradas: Debt[] = [];
  deudasVencidas: Debt[] = [];
  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  anios: number[] = [2022, 2023, 2024, 2025]; // Lista de años disponibles
  mesSeleccionado: string = 'Julio';
  anioSeleccionado: number = new Date().getFullYear(); // Año seleccionado por defecto

  // Mantén una copia de las deudas originales
  deudasOriginales: Debt[] = [];
  confirmacionVisible: boolean = false;
  confirmacionMensaje: string = '';
  accionPendiente: string = '';
  deudaSeleccionada: Debt | null = null;
  editIndex: number | null = null;
  editDeudaData: Debt | null = null;

  constructor(private debtsService: DebtsService) {}

  ngOnInit(): void {
    const userId = 1; // Reemplaza esto con la lógica para obtener el ID del usuario actual
    this.debtsService.getDebtsByUserId(userId).subscribe(deudas => {
      console.log('Deudas obtenidas del servicio:', deudas);
      this.deudasOriginales = deudas;
      this.filtrarDeudas();
      this.obtenerDeudasVencidas();
    });
  }

  filtrarDeudas() {
    const mesSeleccionadoIndex = this.meses.indexOf(this.mesSeleccionado);
    this.deudasFiltradas = this.deudasOriginales.filter(deuda => {
      const fechaVencimiento = new Date(deuda.dueDate);
      const mesVencimiento = fechaVencimiento.getMonth();
      const anioVencimiento = fechaVencimiento.getFullYear();
      console.log('Filtrando deuda:', deuda);
      console.log(`Mes seleccionado: ${mesSeleccionadoIndex}, Año seleccionado: ${this.anioSeleccionado}`);
      console.log(`Mes vencimiento: ${mesVencimiento}, Año vencimiento: ${anioVencimiento}`);
      return mesVencimiento === mesSeleccionadoIndex && anioVencimiento === this.anioSeleccionado;
    });
    console.log('Deudas filtradas:', this.deudasFiltradas);
  }

  obtenerDeudasVencidas() {
    this.deudasVencidas = this.deudasOriginales.filter(deuda => deuda.status === false);
    console.log('Deudas vencidas:', this.deudasVencidas);
  }

  confirmarPagar(deuda: Debt) {
    this.deudaSeleccionada = deuda;
    this.confirmacionMensaje = `¿Estás seguro de pagar la deuda ${deuda.debtId}?`;
    this.accionPendiente = 'Pagar';
    this.mostrarConfirmacion();
  }

  confirmarEliminar(deuda: Debt) {
    this.deudaSeleccionada = deuda;
    this.confirmacionMensaje = `¿Estás seguro de eliminar la deuda ${deuda.debtId}?`;
    this.accionPendiente = 'Eliminar';
    this.mostrarConfirmacion();
  }

  mostrarConfirmacion() {
    this.confirmacionVisible = true;
  }

  realizarAccion() {
    if (this.accionPendiente === 'Pagar') {
      console.log('Deuda pagada:', this.deudaSeleccionada);
    } else if (this.accionPendiente === 'Eliminar') {
      console.log('Deuda eliminada:', this.deudaSeleccionada);
    }
    this.confirmacionVisible = false;
    this.deudaSeleccionada = null;
  }

  cancelarAccion() {
    this.confirmacionVisible = false;
    this.deudaSeleccionada = null;
  }

  editDeuda(index: number) {
    this.editIndex = index;
    this.editDeudaData = { ...this.deudasFiltradas[index] }; // Clonar los datos de la deuda para editar
  }

  saveEdit() {
    if (this.editIndex !== null && this.editDeudaData) {
      // Actualiza la deuda en la lista original
      const originalIndex = this.deudasOriginales.findIndex(deuda => deuda.debtId === this.editDeudaData!.debtId);
      if (originalIndex !== -1) {
        this.deudasOriginales[originalIndex] = this.editDeudaData;
      }
      this.deudasFiltradas[this.editIndex] = this.editDeudaData;
      this.editIndex = null;
      this.editDeudaData = null;
    }
  }

  cancelEdit() {
    this.editIndex = null;
    this.editDeudaData = null;
  }

  getClass(fechaVencimiento: string, estado: boolean): string {
    const hoy = new Date();
    const fechaDeVencimiento = new Date(fechaVencimiento);
    const diferenciaDias = Math.ceil((fechaDeVencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
  
    if (estado) {
      return 'estado-deuda-verde'; // Pagada
    } else if (diferenciaDias === 0) {
      return 'estado-deuda-rojo'; // Vence hoy
    } else if (diferenciaDias <= 7 && diferenciaDias > 0) {
      return 'estado-deuda-amarillo'; // Próximo a vencer en una semana
    } else {
      return 'estado-deuda-negro'; // El resto de deudas
    }
  }
  
}
