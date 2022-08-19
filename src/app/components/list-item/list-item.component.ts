import { Component, Input, OnInit } from '@angular/core';
import { TaskItem } from 'src/app/interfaces/task-item';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() item: TaskItem = {
    title: "",
    start: "",
    end: "",
    status: "",
    name: "",
    notes: ""
  }  
  

  constructor() {
  }

  ngOnInit(): void {
  }

  // Cambia el estilo si la actividad aún no empieza
  checkActive() {
    const start: Date = new Date(this.item.start);
    const now: Date = new Date(Date.now());
    return (start > now) ? 'itemInactive' : '';
  }

}
