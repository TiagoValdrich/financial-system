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

  async getExpenses(): Promise<Expense[]> {
    try {
      const response: any = await this.http.get(`${environment.URL_API}/expense`).toPromise();
      const expenses = Expense.buildExpensesFromResponse(response);
      return Promise.resolve(expenses);
    } catch (err) {
      return onError(err);
    }
  }

}

function onError(err): Promise<any> {
  console.error('An error occurred while fetching expenses', err.stack || err);
  return Promise.reject(new Error(err));
}
