import { ChangeDetectorRef, Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { reduce } from 'rxjs';
import { TaskItem } from 'src/app/interfaces/task-item';
import { User } from 'src/app/interfaces/user';
import { DataService } from 'src/app/services/data-service.service';
import { TaskService } from 'src/app/services/task.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class EditComponent implements OnInit {
  editForm: FormGroup = this.fb.group({
    id: [],
    title: [, [Validators.required, Validators.maxLength(50)]],
    asignment: [, Validators.required],
    notes: [, Validators.required],
    start: [, Validators.required],
    end: [, Validators.required],
    status: [, Validators.required]
  })

  users: User[] = [];
  
  constructor(private us: UsersService, private fb: FormBuilder, private ds: DataService, private ts: TaskService, private router: Router) {
    this.users = this.us.getUsers();
    this.editForm.patchValue({
    id: this.ts.currentTask?.id,
    title: this.ts.currentTask?.title,
    // asignment: this.ts.currentTask?.name,
    notes: this.ts.currentTask?.notes,
    // start: this.ts.currentTask?.start,
    // end: this.ts.currentTask?.end,
    status: this.ts.currentTask?.status
    })   
  }

  ngOnInit(): void {
  }

  update() {
    this.ds.post('task', 'update', this.editForm.value).subscribe((dato: any) => {
      if (dato['status']) {
        location.reload();
      }
    })
  }
  
  delete() {
    this.ds.post('task', 'delete', {id: this.editForm.controls['id'].value}).subscribe((dato: any) => {
      if (dato['status']) {
        location.reload();
      }
    })
  }

  isAdmin() {
    return localStorage['admin'] == 1 ? true : false; 
  }

  setFrom(date: string) {    
    this.editForm.controls['start'].patchValue(date);
  }
  
  setTo(date: string) {
    this.editForm.controls['end'].patchValue(date);
  }

  notValid(control: string) {
    return this.editForm.controls[control].touched && this.editForm.controls[control].errors;
  }

}
