import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ExpenseService } from 'src/app/services/expense.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.scss']
})
export class ExpenseEditComponent implements OnInit {

  public isEdit = false;
  public expenseId: number;
  public form: FormGroup = new FormGroup({
    title: new FormControl(null, []),
    value: new FormControl(null, []),
    date: new FormControl(null, [])
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.expenseId = params.id;
        this.isEdit = true;
        this.expenseService.getExpense(params.id)
          .then((expense) => {
            this.form.get('title').setValue(expense.title);
            this.form.get('value').setValue(parseFloat(expense.value));
            this.form.get('date').setValue(moment.utc(expense.date).format('YYYY-MM-DD'));
          })
          .catch((err) => {
            this.toastrService.error('Erro ao obter despesa.');
            console.error('Error to fetch expense', err);
          });
      }
    });
  }

  public save(): void {
    const data = this.form.value;

    if (this.expenseId) {
      data.id = this.expenseId;
    }

    if (data.value.indexOf(',') > 0) {
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
