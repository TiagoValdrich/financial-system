import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  formatDate(data: Date): string {
    return `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`;
  }

}
