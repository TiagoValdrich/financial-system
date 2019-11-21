import { Component, OnInit } from '@angular/core';
import { RevenueService } from '../services/revenue.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {

  public revenues;
  public totalRevenues = 0;

  constructor(
    private revenueService: RevenueService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.revenueService
      .getRevenues()
      .then((revenues: any) => {
        this.revenues = revenues;
        this.revenues.forEach((revenue) => {
          this.totalRevenues += revenue.value;
        });
      })
      .catch((err) => {
        this.toastrService.error('Erro ao buscar receitas');
        console.error('Failed to load revenues', err);
      });
  }

  public deleteRevenue(id: number): void {
    this.revenueService.deleteRevenue(id)
      .then(() => {
        this.revenues = this.revenues.filter(revenue => {
          return revenue.id !== id;
        });
        this.toastrService.success('Receita excluida com sucesso!');
      })
      .catch((err) => {
        this.toastrService.error('Erro ao excluir receita!');
        console.error('Error to delete revenue', err);
      });
  }

}
