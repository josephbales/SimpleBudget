import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BudgetService } from '../../../services/budget.service';
import { BudgetItemDto } from '../../../models/budget';

@Component({
  selector: 'sb-budget-item-table',
  templateUrl: './budget-item-table.component.html',
  styleUrls: ['./budget-item-table.component.scss']
})
export class BudgetItemTableComponent implements OnInit, OnDestroy {

  credits: BudgetItemDto[] = [];
  debits: BudgetItemDto[] = [];
  displayedColumns: string[] = ['name','amount','note', 'dayOfMonth', 'isTransacted'];

  constructor(
    private _budgetService: BudgetService
  ) {

  }

  ngOnInit(): void {
    this._budgetService.getMonthlyBudget();
    this._budgetService.monthlyBudget$.subscribe((mb) => {
      this.credits = mb.credits;
      this.debits = mb.debits;
    });
  }

  ngOnDestroy(): void {
    
  }
}
