import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { DataService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];

  constructor(private ds: DataService) { }

  getUsers() {
    if (localStorage.getItem('admin') == '1') {
      this.ds.get('task', 'getAllUsers').subscribe((dato: any) => {
        this.users = dato as User[];
      })
    } else {
      this.ds.post('task', 'getUsers', { id: localStorage.getItem('id') }).subscribe((dato: any) => {
        this.users = dato as User[];
      })
    }
       
  }

  addUser(data: User) {
    this.ds.post('task', 'insertUser', data).subscribe((dato: any) => {
      if (dato['status']) {
        console.log(dato);
        // Aqui va el swall
      }
    })
  }

  deleteUser(id: number) {
    this.ds.post('task', 'deleteUser', {id: id}).subscribe((dato: any) => {
      if (dato['status']) {
        console.log(dato);
        // Aquí va el swal
      }
    })
  }
  
}
