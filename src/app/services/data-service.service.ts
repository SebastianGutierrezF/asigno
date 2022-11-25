import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Cambiar a remoto asignowebservice.herokuapp.com
  baseUrl = 'https://asigno-dist-nyvi7.ondigitalocean.app/controller/';
  // baseUrl = 'http://localhost/asignowebservice/controller/';
  // public options = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json; charset=utf-8',
  //     'Access-Control-Request-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  //     'Access-Control-Request-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  //   })
  // };

  constructor(private http: HttpClient) { }

  get(model: string, action: string) {
    return this.http.get(`${this.baseUrl}${model}.php?option=${action}`);
  }

  post(model: string, action: string, datos: any) {
    return this.http.post(`${this.baseUrl}${model}.php?option=${action}`, datos);
  }
}
