import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { BudgetItemsResponse, MonthlyBudget } from "../models/budget";

@Injectable({
  providedIn: 'root'
})

export class BudgetService {
  public monthlyBudget$ = new BehaviorSubject<MonthlyBudget>({} as MonthlyBudget);

  constructor(
    private http: HttpClient) {
  }

  public getMonthlyBudget = (): void => {
    this.http.get<BudgetItemsResponse>('api/budget')
      .pipe(map(resp => ({
        credits: resp.budgetItems.filter(x => x.transactionType === 'Credit'),
        debits: resp.budgetItems.filter(x => x.transactionType === 'Debit')
      } as MonthlyBudget)))
      .subscribe((resp) => {
        this.monthlyBudget$.next(resp);
      });
  }
}
