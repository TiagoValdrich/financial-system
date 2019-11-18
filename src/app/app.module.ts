import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { RevenueService } from './services/revenue.service';
import { ExpenseService } from './services/expense.service';
import { CategoryService } from './services/category.service';
import { FinancialResourceService } from './services/financial-resource.service';
import { UtilsService } from './services/utils.service';
import { RevenueComponent } from './revenue/revenue.component';
import { RevenueEditComponent } from './revenue/revenue-edit/revenue-edit.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseEditComponent } from './expense/expense-edit/expense-edit.component';
import { CategoryComponent } from './category/category.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { FinancialResourceComponent } from './financial-resource/financial-resource.component';
import { FinancialResourceEditComponent } from './financial-resource/financial-resource-edit/financial-resource-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    RevenueComponent,
    RevenueEditComponent,
    ExpenseComponent,
    ExpenseEditComponent,
    CategoryComponent,
    CategoryEditComponent,
    FinancialResourceComponent,
    FinancialResourceEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    RevenueService,
    ExpenseService,
    UtilsService,
    CategoryService,
    FinancialResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
