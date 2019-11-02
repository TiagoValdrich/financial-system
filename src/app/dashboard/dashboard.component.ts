import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { RevenueService } from '../services/revenue.service';
import { ExpenseService } from '../services/expense.service';
import Revenue from '../models/Revenue.model';
import Expense from '../models/Revenue.model';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public revenuesTotals = 0;
  public expensesTotals = 0;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public revenueBarChartLabels: Label[] = [];
  public expenseBarChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public revenuesChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Receitas'
    }
  ];
  public expensesChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Despesas'
    }
  ];

  constructor(
    private revenueService: RevenueService,
    private expenseService: ExpenseService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.revenueService.getRevenues()
      .then((revenues: Revenue[]) => {
        const data = {};

        revenues.forEach((revenue: Revenue) => {
          const revenueDate: string = this.utilsService.formatDate(revenue.date);

          this.revenuesTotals += revenue.value;

          if (!data.hasOwnProperty(revenueDate)) {
            data[revenueDate] = revenue.value;
          } else {
            data[revenueDate] += revenue.value;
          }
        });

        const values: Array<number> = Object.values(data);
        const dates: Array<string> = Object.keys(data);

        this.revenuesChartData[0] = ({ data: values, label: 'Receitas' });
        this.revenueBarChartLabels = dates;
      }).catch((err) => {
        console.error(err);
      });

    this.expenseService.getExpenses()
      .then((expenses: Expense[]) => {
        const data = {};

        expenses.forEach((expense: Expense) => {
          const expenseDate: string = this.utilsService.formatDate(expense.date);

          this.expensesTotals += expense.value;

          if (!data.hasOwnProperty(expenseDate)) {
            data[expenseDate] = expense.value;
          } else {
            data[expenseDate] += expense.value;
          }
        });

        const values: Array<number> = Object.values(data);
        const dates: Array<string> = Object.keys(data);

        this.expensesChartData[0] = ({ data: values, label: 'Despesas' });
        this.expenseBarChartLabels = dates;
      }).catch((err) => {
        console.error(err);
      });
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
