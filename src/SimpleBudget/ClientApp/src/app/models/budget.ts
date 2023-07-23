export interface BudgetItemDto {
  id?: number;
  name: string;
  notes?: string | undefined;
  amount: number;
  dayOfMonth: number;
  transactionType?: 'Credit' | 'Debit';
  isTransacted: boolean;
  monthBudgetId: number;
}

export interface BudgetItemsResponse {
  budgetItems: BudgetItemDto[];
}

export interface MonthlyBudget {
  credits: BudgetItemDto[];
  debits: BudgetItemDto[];
}
