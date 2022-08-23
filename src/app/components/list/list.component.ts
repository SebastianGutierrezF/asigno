import { AfterViewInit, Component, ElementRef, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  users: User[] =  [];
  currentTask?: TaskItem;
  filterForm: FormGroup = this.fb.group({
    search: [],
  });

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
    this.tasks = this.tasks.filter((task) => {
      return task.title.includes(this.filterForm.controls['search'].value);
    });
  }

  reset() {
    this.tasks = this.ts.tasks;
  }
}
