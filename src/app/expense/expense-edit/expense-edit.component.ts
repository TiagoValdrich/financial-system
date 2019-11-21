import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ExpenseService } from 'src/app/services/expense.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { CategoryService } from 'src/app/services/category.service';
import { FinancialResourceService } from 'src/app/services/financial-resource.service';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.scss']
})
export class ExpenseEditComponent implements OnInit {

  public isEdit = false;
  public expenseId: number;
  public categories: Array<any> = [];
  public financialResources: Array<any> = [];
  public form: FormGroup = new FormGroup({
    title: new FormControl(null, []),
    value: new FormControl(null, []),
    date: new FormControl(null, []),
    CategoryId: new FormControl(null, []),
    FinancialResourceId: new FormControl(null, [])
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private financialResourceService: FinancialResourceService,
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().then(categories => {
      this.categories = categories;

      this.financialResourceService.getFinancialResources().then(financialResources => {
        this.financialResources = financialResources;

        this.activatedRoute.params.subscribe(params => {
          if (params.id) {
            this.expenseId = params.id;
            this.isEdit = true;
            this.expenseService.getExpense(params.id)
              .then((expense) => {
                this.form.get('title').setValue(expense.title);
                this.form.get('value').setValue(parseFloat(expense.value));
                this.form.get('date').setValue(moment.utc(expense.date).format('YYYY-MM-DD'));
                this.form.get('CategoryId').setValue(expense.CategoryId);
                this.form.get('FinancialResourceId').setValue(expense.FinancialResourceId);
              })
              .catch((err) => {
                this.toastrService.error('Erro ao obter despesa.');
                console.error('Error to fetch expense', err);
              });
          }
        });
      });
    });
  }

  public save(): void {
    const data = this.form.value;

    if (this.expenseId) {
      data.id = this.expenseId;
    }

    if (typeof data.value === 'string' && data.value.indexOf(',') > 0) {
      data.value = data.value.replace(',', '.');
    }

    this.expenseService.saveExpense(data)
      .then((response) => {
        this.toastrService.success('Despesa salva com sucesso!');
        this.router.navigate(['expense']);
      })
      .catch((err) => {
        this.toastrService.error('Erro ao salvar despesa');
        console.error('Error to save expense', err);
      });
  }

}
