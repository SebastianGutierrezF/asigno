import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TaskItem } from 'src/app/interfaces/task-item';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() task!: TaskItem;
  @Output() outTask = new EventEmitter<TaskItem>;
  
  constructor(private ts: TaskService) {
  }

  ngOnInit(): void {
  }

  // Cambia el estilo si la actividad aún no empieza
  checkActive() {
    const now: Date = new Date(Date.now());
    const nowNgb: NgbDate = new NgbDate(now.getFullYear(), now.getMonth(), now.getDate());    
    return (false) ? 'itemInactive' : '';
  }

  checkDone() {    
    return this.task.status == "Completada";
  }

  editCheckboxChange(event: any) {
    if (event.target.checked) {
      this.task.status = 'Completada';
    } else {
      this.task.status = 'Asignada';
    }
    const object = {
      'id': this.task.id,
      'title': this.task.title,
      'start': this.task.start,
      'end': this.task.end,
      'asignment': this.task.user,
      'status': this.task.status,
      'notes': this.task.notes
    }
    this.ts.updateTask(object);
  }

  sendCurrentItem() {
    this.outTask.emit(this.task);
  }

  isAdmin() {
    return localStorage['admin'] == 1 ? true : false;
  }

}
