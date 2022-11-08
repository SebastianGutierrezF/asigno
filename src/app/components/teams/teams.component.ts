import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from 'src/app/interfaces/team';
import { DataService } from 'src/app/services/data-service.service';
import Swal from 'sweetalert2';

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
  swal = Swal.mixin({});

  constructor(private ds: DataService, private fb: FormBuilder) {
    this.update();
  }

  ngOnInit(): void {
  }

  update() {
    if (localStorage.getItem('admin') == '1') {
      this.ds.get('task', 'getTeams').subscribe((data: any) => {
        console.log(data);
        
        if (data) {
          this.teams = data as Team[];
        } else {
          alert('Ocurrió un error al intentar obtener los equipos');
        }
      })
      this.ds.get('task', 'getUnasigned').subscribe((data: any) => {
        console.log(data);
        if (data) {
          this.unasigned = data;
        } else {
          alert('Ocurrió un error al intentar obtener usuarios sin equipo');
        }
      })
    } else {
      this.ds.post('task', 'getTeam', {'team':localStorage.getItem('team')}).subscribe((data: any) => {
        console.log(data);
        if (data) {
          this.teams = data as Team[];
        } else {
          alert('Ocurrió un error al intentar obtener los equipos');
        }
      })
    }
    
  }

  isAdmin() {
    return localStorage.getItem('admin') == '1';
  }

  agregarEquipo() {
    this.ds.post('task', 'addTeam', this.teamForm.value).subscribe((data: any) => {
      if (data) {
        alert("Equipo agregado exitosamente.");
        this.teamForm.reset();
        this.update();
      } else {
        alert("Ocurrio un error al intentar agregar el equipo.");
      }
    })
  }

  deleteTeam(id: string) {
    this.swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.ds.post('task', 'deleteTeam', {'team': id}).subscribe((data: any) => {
          if (data) {
            this.swal.fire({
              title: "Éxito",
              text: `El equipo ha sido eliminado`,
              icon: 'success'
            }).then(() => this.update())
          } else {
            this.swal.fire({
              title: "Error",
              text: "Ha ocurrido un error al eliminar al equipo",
              icon: 'error'
            }).then(() => this.update())
          }
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.swal.fire(
          'Cancelado',
          'No se ha eliminado el equipo',
          'error'
        ).then(() => this.update())
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
