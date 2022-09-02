import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TaskItem } from 'src/app/interfaces/task-item';
import { User } from 'src/app/interfaces/user';
import { TaskService } from 'src/app/services/task.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
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
  filterForm: FormGroup = this.fb.group({
    search: [],
  });
  start?: Date;
  end?: Date;
  completed: TaskItem[] = [];
  loading = true;

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

  search() {
    this.reset();
    this.tasks = this.tasks.filter((task) => {
      const notes = task.notes.toLowerCase();
      const title = task.title.toLowerCase();
      return title.includes(((this.filterForm.controls['search'].value) as string).toLowerCase()) || notes.includes((this.filterForm.controls['search'].value as string).toLowerCase());
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
      this.tasks = this.tasks.filter((task) => {
        const taskStart = new Date(task.start);
        const taskEnd = new Date(task.end);
        this.end?.setDate(this.end?.getDate() + 1);
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
