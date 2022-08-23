import { Injectable } from '@angular/core';
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
}
