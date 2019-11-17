import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Revenue from '../models/Revenue.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  constructor(
    public http: HttpClient
  ) { }

  async getRevenue(id: number): Promise<any> {
    try {
      const response: any = await this.http.get(`${environment.URL_API}/revenue/${id}`).toPromise();
      return Promise.resolve(response);
    } catch (err) {
      return onError(err);
    }
  }

  async getRevenues(): Promise<Revenue[]> {
    try {
      const response: any = await this.http.get(`${environment.URL_API}/revenue`).toPromise();
      const revenues = Revenue.buildRevenuesFromResponse(response);
      return Promise.resolve(revenues);
    } catch (err) {
      return onError(err);
    }
  }

  async saveRevenue(revenue): Promise<Revenue[]> {
    try {
      const response: any = await this.http.put(`${environment.URL_API}/revenue`, revenue).toPromise();
      return response;
    } catch (err) {
      return onError(err);
    }
  }

  async deleteRevenue(id: number): Promise<any> {
    try {
      const response: any = await this.http.delete(`${environment.URL_API}/revenue/${id}`).toPromise();
      return response;
    } catch (err) {
      return onError(err);
    }
  }

}

function onError(err): Promise<any> {
  console.error('An error occurred on revenues service', err.stack || err);
  return Promise.reject(new Error(err));
}
