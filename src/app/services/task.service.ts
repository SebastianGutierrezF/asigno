import { Injectable } from '@angular/core';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TaskItem } from '../interfaces/task-item';
import { DataService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: TaskItem[] = [];

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
        // Aquí va el swal
        console.log(dato);
      }
    })
  }

  insertTask(object: TaskItem | any) {
    this.ds.post('task', 'insert', object).subscribe((dato: any) => {
      if (dato['status']) {
        // Aquí va el swal
      }   
    })
  }

  // getByDate() {
  //   if (localStorage['admin'] == 1) {
  //     this.ds.get('task', 'getAllByDate').subscribe((dato: any) => {
  //       this.tasks = dato as TaskItem[];
  //     })
  //   } else {
  //     this.ds.post('task', 'getAllowed', {id: localStorage['id']}).subscribe((dato: any) => {
  //       this.tasks = dato as TaskItem[];
  //     })
  //   }
  // }
}
