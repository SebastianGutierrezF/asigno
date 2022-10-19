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

}
