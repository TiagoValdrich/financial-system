import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RevenueComponent } from './revenue/revenue.component';
import { RevenueEditComponent } from './revenue/revenue-edit/revenue-edit.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseEditComponent } from './expense/expense-edit/expense-edit.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'revenue', component: RevenueComponent },
  { path: 'revenue/edit', component: RevenueEditComponent },
  { path: 'revenue/edit/:id', component: RevenueEditComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'expense/edit', component: ExpenseEditComponent },
  { path: 'expense/edit/:id', component: ExpenseEditComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
