import { Component, OnInit } from '@angular/core';
import { RevenueService } from '../services/revenue.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { FinancialResourceService } from '../services/financial-resource.service';
import * as moment from 'moment';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    title: new FormControl(null, []),
    date: new FormControl(null, []),
    category: new FormControl(null, []),
    financialResource: new FormControl(null, [])
  });
  public revenues;
  public categories;
  public financialResources;
  public totalRevenues = 0;

  constructor(
    private revenueService: RevenueService,
    private categoryService: CategoryService,
    private financialResourceService: FinancialResourceService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  public async initialize(): Promise<any> {
    try {
      this.revenues = await this.revenueService.getRevenues();
      this.categories = await this.categoryService.getCategories();
      this.financialResources = await this.financialResourceService.getFinancialResources();

      this.revenues.forEach((revenue) => {
        this.totalRevenues += revenue.value;
      });

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public deleteRevenue(id: number): void {
    this.revenueService.deleteRevenue(id)
      .then(() => {
        this.revenues = this.revenues.filter(revenue => {
          return revenue.id !== id;
        });
        this.totalRevenues = 0;
        this.revenues.forEach(revenue => {
          this.totalRevenues += revenue.value;
        });
        this.toastrService.success('Receita excluida com sucesso!');
      })
      .catch((err) => {
        this.toastrService.error('Erro ao excluir receita!');
        console.error('Error to delete revenue', err);
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

      this.revenues = await this.revenueService.getRevenues(params);

      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  public clearFilter(): void {
    this.form.reset();
  }

}
