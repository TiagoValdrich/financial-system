import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  public expenses;

  constructor(
    private expenseService: ExpenseService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.expenseService
      .getExpenses()
      .then((expenses: any) => {
        this.expenses = expenses;
      })
      .catch((err) => {
        this.toastrService.error('Erro ao buscar despesas');
        console.error('Failed to load expenses', err);
      });
  }

  public deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id)
      .then(() => {
        this.expenses = this.expenses.filter(expense => {
          return expense.id !== id;
        });
        this.toastrService.success('Despesa excluida com sucesso!');
      })
      .catch((err) => {
        this.toastrService.error('Erro ao excluir despesa!');
        console.error('Error to delete expense', err);
      });
  }

}
