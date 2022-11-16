import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'asigno';

  constructor(public ts: TaskService) {
    this.ts.getTasks();
  }

  celebrate() {
    Swal.fire({
      title: `!Felicidades, su equipo ha completado ${this.ts.complete} tareas!`,
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#fff',
      backdrop: `url("/assets/confeti.webp")`
    })
  }

  isLogged() {
    return localStorage['id'];
  }
}
