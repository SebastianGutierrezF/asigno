import { ChangeDetectorRef, Component, Injectable, Input, OnInit } from '@angular/core';
import { TaskItem } from 'src/app/interfaces/task-item';
import { DataService } from 'src/app/services/data-service.service';
import { TaskService } from 'src/app/services/task.service';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ListComponent implements OnInit {
  items: TaskItem[] = [];
  currentItem = false;

  constructor(private ds: DataService, private ts: TaskService) {
    // Obtiene todos los registros de tareas
    if (localStorage['admin'] == 1) {
      this.ds.get('task', 'getAll').subscribe((dato: any) => {
        this.items = dato;
      })
    } else {
      this.ds.post('task', 'getAllowed', {id: localStorage['id']}).subscribe((dato: any) => {
        this.items = dato;
      })
    }
  }

  ngOnInit(): void {
  }

  setCurrentItem(item: TaskItem) {
    this.ts.currentTask = item;
    this.currentItem = true;
    // this.currentItem = false;
  }

  closeEdit() {
    this.currentItem = false;
    this.ts.currentTask = undefined;
  }

}
