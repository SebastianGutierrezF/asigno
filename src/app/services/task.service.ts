import { Injectable } from '@angular/core';
import { TaskItem } from '../interfaces/task-item';
import { DataService } from './data-service.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: TaskItem[] = [];
  swalAdd = Swal.mixin({});
  constructor(private ds: DataService) { }

  getTasks() {
    if (localStorage['admin'] == 1) {
      this.ds.get('task', 'getAll').subscribe((dato: any) => {
        this.tasks = dato as TaskItem[];
      })
    } else {
      this.ds.post('task', 'getAllowed', {id: localStorage['id']}).subscribe((dato: any) => {
        this.tasks = dato as TaskItem[];
      })
    }
  }

  updateTask(object: TaskItem | any) {
    this.ds.post('task', 'update', object).subscribe((dato: any) => {
      if (dato['status']) {
        this.swalAdd.fire({
          title: "Éxito",
          text: `La tarea ${object.title} ha sido actualizada`,
          icon: 'success'
        })
      } else {
        this.swalAdd.fire({
          title: "Error",
          text: "Ha ocurrido un error al actualizar la tarea",
          icon: 'error'
        })
      }
    })
  }
  
  insertTask(object: TaskItem | any) {
    this.ds.post('task', 'insert', object).subscribe((dato: any) => {
      if (dato['status']) {
        this.swalAdd.fire({
          title: "Éxito",
          text: `La tarea ${object.title} ha sido agregada`,
          icon: 'success'
        })
      } else {
        this.swalAdd.fire({
          title: "Error",
          text: "Ha ocurrido un error al agregar la tarea",
          icon: 'error'
        })
      }
    })
  }

  deleteTask(id: string) {
    this.ds.post('task', 'delete', { id: id }).subscribe((dato: any) => {
      if (dato['status']) {
        this.swalAdd.fire({
          title: "Éxito",
          text: `La tarea ha sido eliminada`,
          icon: 'success'
        })
      } else {
        this.swalAdd.fire({
          title: "Error",
          text: "Ha ocurrido un error al eliminar la tarea",
          icon: 'error'
        })
      }
    })
  }
  
}
