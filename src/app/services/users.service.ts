import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user';
import { DataService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];
  swal = Swal.mixin({});

  constructor(private ds: DataService) { }

  getUsers() {
    if (localStorage.getItem('admin') == '1') {
      this.ds.get('task', 'getAllUsers').subscribe((dato: any) => {
        this.users = dato as User[];
      })
    } else {
      this.ds.post('task', 'getUsers', { team: localStorage.getItem('team') }).subscribe((dato: any) => {
        this.users = dato as User[];
      })
    }
       
  }

  addUser(data: User) {
    this.ds.post('task', 'addUser1', data).subscribe((dato: any) => {
      if (dato) {
        this.swal.fire({
          title: "Éxito",
          text: `El usuario ${data.name} ha sido agregado`,
          icon: 'success'
        }).then(() => location.reload())
      } else {
        this.swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al agregar al usuario",
          icon: 'error'
        }).then(() => location.reload())
      }
    })
  }

  editUser(data: User) {
    this.ds.post('task', 'editUser', data).subscribe((dato: any) => {
      if (dato) {
        this.swal.fire({
          title: "Éxito",
          text: `El usuario ${data.name} ha sido actualizado`,
          icon: 'success'
        }).then(() => location.reload())
      } else {
        this.swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al actualizar al usuario",
          icon: 'error'
        }).then(() => location.reload())
      }
    })
  }

  deleteUser(id: number) {
    this.swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.ds.post('task', 'deleteUser', {id: id}).subscribe((dato: any) => {
          if (dato['status']) {
            this.swal.fire({
              title: "Éxito",
              text: `El usuario ha sido eliminado`,
              icon: 'success'
            }).then(() => location.reload())
          } else {
            this.swal.fire({
              title: "Error",
              text: "Ha ocurrido un error al eliminar al usuario",
              icon: 'error'
            }).then(() => location.reload())
          }
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.swal.fire(
          'Cancelado',
          'No se ha eliminado el usuario',
          'error'
        ).then(() => location.reload())
      }
    })
  }
  
}
