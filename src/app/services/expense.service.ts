import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Expense from '../models/Expense.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    public http: HttpClient
  ) { }

  async getExpense(id: number): Promise<any> {
    try {
      const response: any = await this.http.get(`${environment.URL_API}/expense/${id}`).toPromise();
      return Promise.resolve(response);
    } catch (err) {
      return onError(err);
    }
  }

  async getExpenses(params?: any): Promise<Expense[]> {
    try {
      const response: any = await this.http.get(`${environment.URL_API}/expense`, {
        params
      }).toPromise();
      const expenses = Expense.buildExpensesFromResponse(response);
      return Promise.resolve(expenses);
    } catch (err) {
      return onError(err);
    }
  }

  async saveExpense(expense): Promise<Expense[]> {
    try {
      const response: any = await this.http.put(`${environment.URL_API}/expense`, expense).toPromise();
      return response;
    } catch (err) {
      return onError(err);
    }
  }

  async deleteExpense(id: number): Promise<any> {
    try {
      const response: any = await this.http.delete(`${environment.URL_API}/expense/${id}`).toPromise();
      return response;
    } catch (err) {
      return onError(err);
    }
  }

}

function onError(err): Promise<any> {
  console.error('An error occurred while fetching expenses', err.stack || err);
  return Promise.reject(err);
}
