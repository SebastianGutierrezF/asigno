import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Cambiar a remoto asignowebservice.herokuapp.com
  baseUrl = 'http://asignowebservice.herokuapp.com/controller/';
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
    return this.http.post(`${this.baseUrl}${model}.php?option=${action}`, datos);
  }
}
