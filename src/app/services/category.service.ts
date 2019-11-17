import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Category from '../models/Category.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    public http: HttpClient
  ) { }

  async getCategory(id: number): Promise<any> {
    try {
      const response: any = await this.http.get(`${environment.URL_API}/category/${id}`).toPromise();
      return Promise.resolve(response);
    } catch (err) {
      return onError(err);
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response: any = await this.http.get(`${environment.URL_API}/category`).toPromise();
      const categories = Category.buildCategoriesFromResponse(response);
      return Promise.resolve(categories);
    } catch (err) {
      return onError(err);
    }
  }

  async saveCategory(category): Promise<Category[]> {
    try {
      const response: any = await this.http.put(`${environment.URL_API}/category`, category).toPromise();
      return response;
    } catch (err) {
      return onError(err);
    }
  }

  async deleteCategory(id: number): Promise<any> {
    try {
      const response: any = await this.http.delete(`${environment.URL_API}/category/${id}`).toPromise();
      return response;
    } catch (err) {
      return onError(err);
    }
  }

}

function onError(err): Promise<any> {
  console.error('An error occurred on categories service', err.stack || err);
  return Promise.reject(new Error(err));
}
