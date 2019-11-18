import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import FinancialResource from '../models/FinancialResource.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialResourceService {

  constructor(
    public http: HttpClient
  ) { }

  async getFinancialResource(id: number): Promise<any> {
    try {
      const response: any = await this.http.get(`${environment.URL_API}/financial-resource/${id}`).toPromise();
      return Promise.resolve(response);
    } catch (err) {
      return onError(err);
    }
  }

  async getFinancialResources(): Promise<FinancialResource[]> {
    try {
      const response: any = await this.http.get(`${environment.URL_API}/financial-resource`).toPromise();
      const financialResources = FinancialResource.buildCategoriesFromResponse(response);
      return Promise.resolve(financialResources);
    } catch (err) {
      return onError(err);
    }
  }

  async saveFinancialResource(financialResource): Promise<FinancialResource[]> {
    try {
      const response: any = await this.http.put(`${environment.URL_API}/financial-resource`, financialResource).toPromise();
      return response;
    } catch (err) {
      return onError(err);
    }
  }

  async deleteFinancialResource(id: number): Promise<any> {
    try {
      const response: any = await this.http.delete(`${environment.URL_API}/financial-resource/${id}`).toPromise();
      return response;
    } catch (err) {
      return onError(err);
    }
  }

}

function onError(err): Promise<any> {
  console.error('An error occurred on financial resource service', err.stack || err);
  return Promise.reject(new Error(err));
}
