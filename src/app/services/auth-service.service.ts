import { Injectable } from '@angular/core';
import { UserLogin } from '../interfaces/user-login';
import { DataService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private ds: DataService) { }

  login(data: UserLogin) {
    this.ds.post('task', 'login', data).subscribe((dato: any) => {
      localStorage.setItem('id', dato.id);
      // Divide el nombre completo por espacio y regresa sólo el nombre
      localStorage.setItem('name', ((dato.name as string).split(' '))[0]);
      localStorage.setItem('admin', dato.admin);
    })
  }

  logout() {
    localStorage.clear();
  }
}
