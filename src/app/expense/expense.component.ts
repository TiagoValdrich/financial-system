import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { FinancialResourceService } from '../services/financial-resource.service';
import * as moment from 'moment';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    title: new FormControl(null, []),
    date: new FormControl(null, []),
    category: new FormControl(null, []),
    financialResource: new FormControl(null, [])
  });
  public expenses;
  public categories;
  public financialResources;
  public totalExpenses = 0;

  constructor(
    private expenseService: ExpenseService,
    private categoryService: CategoryService,
    private financialResourceService: FinancialResourceService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  public async initialize(): Promise<any> {
    try {
      this.expenses = await this.expenseService.getExpenses();
      this.categories = await this.categoryService.getCategories();
      this.financialResources = await this.financialResourceService.getFinancialResources();

      this.expenses.forEach((expense) => {
        this.totalExpenses += expense.value;
      });

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id)
      .then(() => {
        this.expenses = this.expenses.filter(expense => {
          return expense.id !== id;
        });
        this.totalExpenses = 0;
        this.expenses.forEach(expense => {
          this.totalExpenses += expense.value;
        });
        this.toastrService.success('Despesa excluida com sucesso!');
      })
      .catch((err) => {
        this.toastrService.error('Erro ao excluir despesa!');
        console.error('Error to delete expense', err);
      });
  }

  public async filter(): Promise<any> {
    try {
      const params = {
        title: null,
        date: null,
        CategoryId: null,
        FinancialResourceId: null
      };

      if (this.form.get('title').value) {
        params.title = this.form.get('title').value;
      }

      if (this.form.get('date').value) {
        params.date = this.form.get('date').value;
      }

      if (this.form.get('category').value) {
        params.CategoryId = this.form.get('category').value;
      }

      if (this.form.get('financialResource').value) {
        params.FinancialResourceId = this.form.get('financialResource').value;
      }

      this.expenses = await this.expenseService.getExpenses(params);

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public clearFilter(): void {
    this.form.reset();
  }

}
