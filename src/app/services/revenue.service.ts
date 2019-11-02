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

  async getRevenues(): Promise<Revenue[]> {
    try {
      const response: any = await this.http.get(`${environment.URL_API}/revenue`).toPromise();
      const revenues = Revenue.buildRevenuesFromResponse(response);
      return Promise.resolve(revenues);
    } catch (err) {
      return onError(err);
    }
  }

}

function onError(err): Promise<any> {
  console.error('An error occurred while fetching revenues', err.stack || err);
  return Promise.reject(new Error(err));
}
