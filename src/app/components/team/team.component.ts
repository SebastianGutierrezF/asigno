import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  teamForm: FormGroup = this.fb.group({
    team: new FormArray([], Validators.required),
    name: [, Validators.required],
    email: [, Validators.required],
    pass: [, Validators.required],
    color: [, Validators.required],
    admin: [,]
  })

  constructor(private fb: FormBuilder, private us: UsersService) {
    this.update();
  }
  
  update() {
    this.us.getUsers();
    setTimeout(() => {
      this.teamArray.clear();
      this.us.users.forEach((team) => {
        const user = this.fb.group({
          name: [team.name, Validators.required],
          email: [team.email, Validators.required],
          pass: [team.pass, Validators.required],
          color: [team.color, Validators.required],
          admin: [team.admin, Validators.required],
        })
        this.teamArray.push(user);
      });
    }, 1000);    
  }
  
  get teamArray() {
    return this.teamForm.controls['team'] as FormArray;
  }
  
  addUser() {
    this.us.addUser(this.teamForm.value);
    this.update();
  }

  deleteUser(index: number) {
    this.us.deleteUser(index);
    this.update();
  }

  notValid() {
    return this.teamForm.invalid && this.teamForm.touched;
  }

}
