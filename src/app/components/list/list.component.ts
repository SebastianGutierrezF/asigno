import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
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
  filterForm: FormGroup = this.fb.group({
    search: [],
  });
  from?: NgbDate;
  to?: NgbDate;

  constructor(private us: UsersService, private ts: TaskService, private fb: FormBuilder) {
    this.update();
  }

  update() {
    this.us.getUsers();
    this.ts.getTasks();
    // Para que le de tiempo al servicio de obtener los datos y poblar la lista
    setTimeout(() => {
      this.users = this.us.users;
      this.tasks = this.ts.tasks;
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
      return task.title.includes(this.filterForm.controls['search'].value) || task.notes.includes(this.filterForm.controls['search'].value);
    });
  }

  setDateFrom(date: NgbDate) {
      this.from = date;
      this.filterByDate();
  }

  setDateTo(date: NgbDate) {
      this.to = date;
      this.filterByDate();
  }

  filterByDate() {
    // Executes search only if both from and to dates are set
    this.reset();
    if (this.to && this.from) {
      this.tasks = this.tasks.filter((task) => {
        return task.start >= this.from! && task.end <= this.to!;
      });
      this.to = this.from = undefined;
    }
  }

  filterByUser(name: string) {
    this.reset();
    this.tasks = this.tasks.filter((task) => {
      return task.name == name;
    });
  }

  filterByStatus(status: string) {
    this.reset();
    this.tasks = this.tasks.filter((task) => {
      return task.status == status;
    })
  }

  reset() {
    this.tasks = this.ts.tasks;
  }
}
