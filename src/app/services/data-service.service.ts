import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'http://localhost/asignowebservice/controller/';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  get(model: string, action: string) {
    return this.http.get(`${this.baseUrl}${model}.php?option=${action}`);
  }

  post(model: string, action: string, datos: any) {
    console.log(`${this.baseUrl}${model}.php?option=${action}`);
    return this.http.post(`${this.baseUrl}${model}.php?option=${action}`, datos);
  }
}
