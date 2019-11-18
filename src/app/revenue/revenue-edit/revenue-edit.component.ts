import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { RevenueService } from 'src/app/services/revenue.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { CategoryService } from 'src/app/services/category.service';
import { FinancialResourceService } from 'src/app/services/financial-resource.service';

@Component({
  selector: 'app-revenue-edit',
  templateUrl: './revenue-edit.component.html',
  styleUrls: ['./revenue-edit.component.scss']
})
export class RevenueEditComponent implements OnInit {

  public isEdit = false;
  public revenueId: number;
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
    private revenueService: RevenueService,
    private toastrService: ToastrService,
    private categoryService: CategoryService,
    private financialResourceService: FinancialResourceService
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().then(categories => {
      this.categories = categories;

      this.financialResourceService.getFinancialResources().then(financialResources => {
        this.financialResources = financialResources;

        this.activatedRoute.params.subscribe(params => {
          if (params.id) {
            this.revenueId = params.id;
            this.isEdit = true;
            this.revenueService.getRevenue(params.id)
              .then((revenue) => {
                this.form.get('title').setValue(revenue.title);
                this.form.get('value').setValue(parseFloat(revenue.value));
                this.form.get('date').setValue(moment.utc(revenue.date).format('YYYY-MM-DD'));
                this.form.get('CategoryId').setValue(revenue.CategoryId);
                this.form.get('FinancialResourceId').setValue(revenue.FinancialResourceId);
              })
              .catch((err) => {
                this.toastrService.error('Erro ao obter receita.');
                console.error('Error to fetch revenue', err);
              });
          }
        });
      });
    });
  }

  public save(): void {
    const data = this.form.value;

    if (this.revenueId) {
      data.id = this.revenueId;
    }

    if (data.value.indexOf(',') > 0) {
      data.value = data.value.replace(',', '.');
    }

    this.revenueService.saveRevenue(data)
      .then((response) => {
        this.toastrService.success('Receita salva com sucesso!');
        this.router.navigate(['revenue']);
      })
      .catch((err) => {
        this.toastrService.error('Erro ao salvar receita');
        console.error('Error to save revenue', err);
      });
  }

}
