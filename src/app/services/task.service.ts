import { Injectable } from '@angular/core';
import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TaskItem } from '../interfaces/task-item';
import { DataService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: TaskItem[] = [];

  constructor(private ds: DataService, private formater: NgbDateParserFormatter) { }

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
    this.stringsToDate();
  }

  updateTask(object: TaskItem | any) {
    if (!(typeof(object.start) === 'string' || typeof(object.end) === 'string')) {
      object.start = this.dateToString(object.start);
      object.end = this.dateToString(object.end);
    }
    this.ds.post('task', 'update', object).subscribe((dato: any) => {
      if (dato['status']) {
        // Aquí va el swal
        console.log(dato);
      }
    })
  }

  insertTask(object: TaskItem | any) {
    if (!(typeof(object.start) === 'string' || typeof(object.end) === 'string')) {
      object.start = this.dateToString(object.start);
      object.end = this.dateToString(object.end);
    }
    this.ds.post('task', 'insert', object).subscribe((dato: any) => {
      if (dato['status']) {
        // Aquí va el swal
      }   
    })
  }

  stringsToDate() {
    this.tasks.forEach(task => {
      task.start = this.formater.parse('' + task.start) as NgbDate;
      task.end = this.formater.parse('' + task.end) as NgbDate;
    })
  }

  dateToString(date: NgbDate) {
    return date.year + '-' + date.month + '-' + date.day;
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
