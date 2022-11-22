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
  complete: number = 0;
  toDo: number = 0;

  constructor(private ds: DataService) { }

  getTasks() {
    if (localStorage['admin'] == 1) {
      this.ds.get('task', 'getAll').subscribe((dato: any) => {
        this.tasks = dato as TaskItem[];
        this.countDone();
      })
    } else {
      this.ds.post('task', 'getAllowed', {team: localStorage['team']}).subscribe((dato: any) => {
        this.tasks = dato as TaskItem[];
        this.countDone();
      })
    }
  }

  countDone() {
    this.complete = 0;
    this.toDo = 0;
    this.tasks.forEach((task) => {
      if (task.status == "Completada") this.complete++;
      this.toDo++;
    })
  }

  updateTask(object: TaskItem | any) {
    this.ds.post('task', 'updateTask', object).subscribe((dato: any) => {
      if (dato) {
        this.swalAdd.fire({
          title: "Éxito",
          text: `La tarea ${object.title} ha sido actualizada`,
          icon: 'success'
        }).then(() => this.getTasks())
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
    this.ds.post('task', 'addTask1', object).subscribe((dato: any) => {
      if (dato) {
        this.swalAdd.fire({
          title: "Éxito",
          text: `La tarea ${object.title} ha sido agregada`,
          icon: 'success'
        }).then(() => this.getTasks())
      } else {
        this.swalAdd.fire({
          title: "Error",
          text: "Ha ocurrido un error al agregar la tarea",
          icon: 'error'
        })
      }
    }, error=>{console.log(error);
    })
  }

  deleteTask(id: string) {
    this.ds.post('task', 'deleteTask', { id: id }).subscribe((dato: any) => {
      if (dato) {
        this.swalAdd.fire({
          title: "Éxito",
          text: `La tarea ha sido eliminada`,
          icon: 'success'
        }).then(() => this.getTasks())
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
