export interface Debt {
    debtId?: number;
    debtType: string;
    documentNumber: string;
    company: string;
    dueDate?: string; // Asegúrate de que este sea un string
    amount?: number;
    status: boolean;
    capital?: number;
    interes?: number;
    cuota?: number;
    daysBetweenInstallments?: number;
    numberOfInstallments?: number;
    installments?: any[];
  }
  