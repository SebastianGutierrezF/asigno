import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from 'src/app/interfaces/team';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  unasigned: Team[] = [];
  teamForm: FormGroup = this.fb.group({
    name: [, Validators.required]
  })
  draggedMember: number = 0;
  selectedTeam: string = '0';

  constructor(private ds: DataService, private fb: FormBuilder) {
    this.update();
  }

  ngOnInit(): void {
  }

  update() {
    this.ds.get('task', 'getTeams').subscribe((data: any) => {
      if (data) {
        this.teams = data as Team[];
      } else {
        alert('Ocurrió un error al intentar obtener los equipos');
      }
    })
    this.ds.get('task', 'getUnasigned').subscribe((data: any) => {
      if (data) {
        this.unasigned = data;
      } else {
        alert('Ocurrió un error al intentar obtener usuarios sin equipo');
      }
    })
  }

  agregarEquipo() {
    this.ds.post('task', 'addTeam', this.teamForm.value).subscribe((data: any) => {
      if (data) {
        alert("Equipo agregado exitosamente.");
        this.update();
      } else {
        alert("Ocurrio un error al intentar agregar el equipo.");
      }
    })
  }

  onDrop(event: Event) {    
    event.preventDefault();
    this.ds.post('task', 'addToTeam', {'idTeam': this.selectedTeam, 'idUser': this.draggedMember}).subscribe((data: any) => {
      if (data) {
        this.update();
      } else {
        alert("Ocurrio un error al intentar cambiar de equipo")
      }
    })
  }

  dragEnter(team: string) {    
    this.selectedTeam = team;
  }

  dragStart(user: any) {
    this.draggedMember = user.id;
  }

}
