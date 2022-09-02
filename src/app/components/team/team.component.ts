import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  teamForm: FormGroup = this.fb.group({
    team: new FormArray([]),
    id: [,],
    name: [, Validators.required],
    email: [, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    pass: [, [Validators.required, Validators.minLength(8)]],
    color: [, Validators.required],
    admin: [0,]
  })

  constructor(private fb: FormBuilder, private us: UsersService, private ts: TaskService, private router: Router) {
    this.update();
    
  }
  
  update() {
    this.us.getUsers();
    setTimeout(() => {
      this.teamArray.clear();
      this.us.users.forEach((team) => {
        const user = this.fb.group({
          id: [team.id],
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

  isAdmin(i: number) {
    return this.teamArray.controls[i].value.admin == '1';
  }

  editCheckboxChange(i: number, event: any) {
    if (event.target.checked) {
      this.teamArray.controls[i].value.admin = 1;
    } else {
      this.teamArray.controls[i].value.admin = 0;
    }
  }

  submitCheckboxChange(event: any) {
    if (event.target.checked) {
      this.teamForm.controls['admin'].setValue(1);
    } else {
      this.teamForm.controls['admin'].setValue(0);
    }
  }
  
  addUser() {
    this.us.addUser(this.teamForm.value);
  }
  
  editUser(i: number) {
    this.us.editUser(this.teamArray.controls[i].value);
  }
  
  deleteUser(index: number) {
    this.us.deleteUser(this.teamArray.controls[index].value.id);
  }

  notValid() {
    return this.teamForm.invalid && this.teamForm.touched;
  }

}
