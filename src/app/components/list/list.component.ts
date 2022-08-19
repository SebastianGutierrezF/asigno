import { Component, OnInit } from '@angular/core';
import { TaskItem } from 'src/app/interfaces/task-item';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  items: TaskItem[] = [];

  constructor(private ds: DataService) {
    // Obtiene todos los registros
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

}
