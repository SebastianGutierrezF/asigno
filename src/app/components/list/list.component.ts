import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TaskItem } from 'src/app/interfaces/task-item';
import { User } from 'src/app/interfaces/user';
import { TaskService } from 'src/app/services/task.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent {
  tasks: TaskItem[] = [];
  filteredTasks: TaskItem[] = [];
  users: User[] = [];
  currentTask?: TaskItem;
  start?: Date;
  end?: Date;
  completed: TaskItem[] = [];
  loading = true;
  searchVal: string = '';

  constructor(private us: UsersService, private ts: TaskService, private fb: FormBuilder) {
    this.update();
  }

  update() {
    this.loading = true;
    this.us.getUsers();
    this.ts.getTasks();
    // Para que le de tiempo al servicio de obtener los datos y poblar la lista
    setTimeout(() => {
      this.users = this.us.users;
      this.reset();
      this.loading = false;
    }, 1000);
  }

  setCurrentTask(currentTask: TaskItem) {
    this.currentTask = currentTask;
  }

  close() {
    this.update();
  }

  search(ev: any) {
    this.reset();
    this.tasks = this.tasks.filter((task) => {
      if (task.notes && task.title) {
        const notes = task.notes.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const title = task.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        this.searchVal = ev.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return title.includes(this.searchVal.toLowerCase()) || notes.includes(this.searchVal.toLowerCase());
      }
      return false;
    });
  }

  setDateFrom(date: string) {
      this.start = new Date(date);
      this.filterByDate();
  }

  setDateTo(date: string) {
      this.end = new Date(date);
      this.filterByDate();
  }

  filterByDate() {
    // Executes search only if both from and to dates are set
    this.reset();
    if (this.start && this.end) {
      this.end.setDate(this.end.getDate() + 2);
      this.tasks = this.tasks.filter((task) => {
        const taskStart = new Date(task.start);
        const taskEnd = new Date(task.end);
        return taskStart >= this.start! && taskEnd <= this.end!;
      });
      this.start = this.end = undefined;
    }
  }

  filterByUser(name: string) {
    this.reset();
    this.tasks = this.tasks.filter((task) => {
      return task.userName == name;
    });
  }

  filterByStatus(status: string) {
    this.reset();
    if (status == 'Completada') {
      this.tasks = this.completed;
    } else {
      this.tasks = this.tasks.filter((task) => {
        return task.status == status;
      })
    }
  }

  reset() {
    this.tasks = this.ts.tasks.filter((task) => {
      return task.status == 'Asignada' || task.status == 'En proceso';
    })
    this.completed = this.ts.tasks.filter((task) => {
      return task.status == 'Completada';
    })
  }
}
