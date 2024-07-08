import { Component } from '@angular/core';
import { DebtsService } from '../services/debt.service';
import { Debt } from '../models/debt.model';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent {
  tipoPago: string = '';
  empresa: string = '';
  fechaVencimiento: string = ''; // Cambiado a string para el manejo del date input
  monto?: number;
  periodoPago?: number;
  cuotas?: number;
  numeroDocumento: string = '';
  interes?: number;

  constructor(private debtsService: DebtsService) {}

  submitForm() {
    const newDebt: Debt = {
      debtType: this.mapDebtType(this.tipoPago),
      documentNumber: this.numeroDocumento,
      company: this.empresa,
      dueDate: this.fechaVencimiento,
      amount: this.monto,
      status: false,
      capital: this.tipoPago === 'EnCuotas' ? this.monto : undefined,
      interes: this.tipoPago === 'EnCuotas' ? this.interes : undefined,
      cuota: this.tipoPago === 'EnCuotas' ? this.monto : undefined,
      daysBetweenInstallments: this.tipoPago === 'EnCuotas' ? this.periodoPago : undefined,
      numberOfInstallments: this.tipoPago === 'EnCuotas' ? this.cuotas : undefined,
      installments: []
    };

    const userId = 1; // Reemplaza esto con la lógica para obtener el ID del usuario actual

    this.debtsService.addDebt(newDebt, userId).subscribe(response => {
      console.log('Pago registrado correctamente:', response);
      alert('Pago registrado correctamente');
      this.resetForm();
    }, error => {
      console.error('Error al registrar el pago:', error);
      alert('Error al registrar el pago');
    });
  }

  onChangeTipoPago() {
    if (this.tipoPago !== 'EnCuotas') {
      this.periodoPago = null;
      this.interes = null;
      this.cuotas = null;
    } else {
      this.fechaVencimiento = '';
    }
  }

  resetForm() {
    this.tipoPago = '';
    this.empresa = '';
    this.fechaVencimiento = '';
    this.monto = null;
    this.periodoPago = null;
    this.cuotas = null;
    this.numeroDocumento = '';
    this.interes = null;
  }

  mapDebtType(tipoPago: string): string {
    switch (tipoPago) {
      case 'Boleta':
        return 'INVOICE';
      case 'Factura':
        return 'SERVICE';
      case 'EnCuotas':
        return 'INSTALLMENT';
      default:
        return '';
    }
  }
}
