import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TaskItem } from 'src/app/interfaces/task-item';
import { DataService } from 'src/app/services/data-service.service';
import { TaskService } from 'src/app/services/task.service';
import { EditComponent } from '../edit/edit.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() task!: TaskItem;
  @Output() outTask = new EventEmitter<TaskItem>;
  
  constructor(private ds: DataService) {
  }

  ngOnInit(): void {
  }

  // Cambia el estilo si la actividad aún no empieza
  checkActive() {
    const start: Date = new Date(this.task.start);
    const now: Date = new Date(Date.now());
    return (start > now) ? 'itemInactive' : '';
  }

  checkDone() {    
    return this.task.status == "Completada";
  }

  sendCurrentItem() {
    this.outTask.emit(this.task);
  }

  delete() {
    this.ds.post('task', 'delete', {id: this.task.id}).subscribe((dato: any) => {
      if (dato['status']) {
      }
    })
  }

  isAdmin() {
    return localStorage['admin'] == 1 ? true : false;
  }

}
