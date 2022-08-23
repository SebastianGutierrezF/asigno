import { Injectable } from '@angular/core';
import { Team } from '../interfaces/team';
import { DataService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  team: Team[] = [];

  constructor(private ds: DataService) { }

  getTeam() {
    // this.ds.get('task', 'getTeam').subscribe((dato: any) => {
    //   this.team = dato as Team[];
    // })
    this.ds.get('task', 'getAll').subscribe((dato: any) => {
      this.team = dato as Team[];
    })
  }
}
