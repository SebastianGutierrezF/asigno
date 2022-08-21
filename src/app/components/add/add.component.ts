import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { DataService } from 'src/app/services/data-service.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.maxLength(50)]],
    asignment: [, Validators.required],
    id: [],
    notes: [, Validators.required],
    start: [, Validators.required],
    end: [, Validators.required]
  })

  users: User[] = [];

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router, private us: UsersService) {
    this.users = this.us.getUsers();
  }

  ngOnInit(): void {
  }

  add() {
    this.ds.post('task', 'insert', this.addForm.value).subscribe((dato: any) => {
        this.router.navigateByUrl("/list");      
    })
  }

  setFrom(date: string) {    
    this.addForm.controls['start'].patchValue(date);
  }
  
  setTo(date: string) {
    this.addForm.controls['end'].patchValue(date);
  }

  notValid(control: string) {
    return this.addForm.controls[control].touched && this.addForm.controls[control].errors;
  }
}
