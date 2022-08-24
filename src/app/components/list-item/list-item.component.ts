import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TaskItem } from 'src/app/interfaces/task-item';
import { DataService } from 'src/app/services/data-service.service';

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
    const now: Date = new Date(Date.now());
    const nowNgb: NgbDate = new NgbDate(now.getFullYear(), now.getMonth(), now.getDate());
    return (this.task.start > nowNgb) ? 'itemInactive' : '';
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
