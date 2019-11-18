import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RevenueComponent } from './revenue/revenue.component';
import { RevenueEditComponent } from './revenue/revenue-edit/revenue-edit.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseEditComponent } from './expense/expense-edit/expense-edit.component';
import { CategoryComponent } from './category/category.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { FinancialResourceComponent } from './financial-resource/financial-resource.component';
import { FinancialResourceEditComponent } from './financial-resource/financial-resource-edit/financial-resource-edit.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'revenue', component: RevenueComponent },
  { path: 'revenue/edit', component: RevenueEditComponent },
  { path: 'revenue/edit/:id', component: RevenueEditComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'expense/edit', component: ExpenseEditComponent },
  { path: 'expense/edit/:id', component: ExpenseEditComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/edit', component: CategoryEditComponent },
  { path: 'category/edit/:id', component: CategoryEditComponent },
  { path: 'financial-resource', component: FinancialResourceComponent },
  { path: 'financial-resource/edit', component: FinancialResourceEditComponent },
  { path: 'financial-resource/edit/:id', component: FinancialResourceEditComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
