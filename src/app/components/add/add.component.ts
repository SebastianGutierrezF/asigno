import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/interfaces/user';
import { DataService } from 'src/app/services/data-service.service';
import { TaskService } from 'src/app/services/task.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm: FormGroup = this.fb.group({
    title: [, [Validators.required, Validators.maxLength(50)]],
    asignment: [, Validators.required],
    notes: [, Validators.required],
    start: [, Validators.required],
    end: [, Validators.required]
  })

  @Input() users: User[] = [];

  constructor(private fb: FormBuilder, private ds: DataService, private ts: TaskService) {
  }

  ngOnInit(): void {
  }

  add() {    
    this.ds.post('task', 'insert', this.addForm.value).subscribe((dato: any) => {
      if (dato['status']) {
        // Aquí va el swal
      }   
    })
  }

  setFrom(date: NgbDate) {    
    this.addForm.controls['start'].patchValue(date);
  }
  
  setTo(date: NgbDate) {
    this.addForm.controls['end'].patchValue(date);
  }

  notValid(control: string) {
    return this.addForm.controls[control].touched && this.addForm.controls[control].errors;
  }
}
