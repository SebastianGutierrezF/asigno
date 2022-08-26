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
    name: [, Validators.required],
    email: [, Validators.required],
    pass: [, Validators.required],
    color: [, Validators.required],
    admin: [,]
  })

  team: User[] = [];

  constructor(private fb: FormBuilder, private us: UsersService) {
    this.update();
  }
  
  update() {
    this.us.getUsers();
    setTimeout(() => {
      this.team = this.us.users;
    }, 1000);    
  }

  // get teamArray() {
  //   return this.teamForm.get('team') as FormArray;
  // }

  addUser() {
    this.us.addUser(this.teamForm.value);
    this.update();
  }

  deleteUser(index: string) {
    this.us.deleteUser(index);
    this.update();
  }

  notValid() {
    return this.teamForm.invalid && this.teamForm.touched;
  }

}
