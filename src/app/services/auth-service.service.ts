import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../interfaces/user-login';
import { DataService } from './data-service.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  swal = Swal.mixin({});

  constructor(private ds: DataService, private router: Router) { }

  login(data: UserLogin) {
    this.ds.post('task', 'login', data).subscribe((dato: any) => {
      if (dato.id != 0) {
        localStorage.setItem('id', dato.id);
        // Divide el nombre completo por espacio y regresa sólo el nombre
        localStorage.setItem('name', ((dato.name as string).split(' '))[0]);
        localStorage.setItem('admin', dato.admin);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El usuario o contraseña es incorrecto!',
          footer: '<a href="mailto:sebask811@gmail.com">Contacta al administrador del sistema</a>'
        })
      }
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
