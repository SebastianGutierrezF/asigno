import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from 'src/app/interfaces/team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  teamForm: FormGroup = this.fb.group({
    team: new FormArray([]),
    name: [, Validators.required],
    email: [, Validators.required],
    pass: [, Validators.required],
    admin: [,]
  })

  newMember: FormControl = this.fb.control('', Validators.required);
  team: Team[] = [];

  constructor(private fb: FormBuilder, private ts: TeamService) {
    this.ts.getTeam();
    this.team = this.ts.team;
  }  

  get teamArray() {
    return this.teamForm.get('team') as FormArray;
  }

  addTeam() {
    this.teamArray.push(this.fb.control(this.newMember, Validators.required));
  }

}
