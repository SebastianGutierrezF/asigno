import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/interfaces/user';
import { TaskService } from 'src/app/services/task.service';

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
    end: [, Validators.required],
    startTime: [, Validators.required],
    endTime: [, Validators.required]
  })

  @Input() users: User[] = [];

  constructor(private fb: FormBuilder, private ts: TaskService) {
  }

  ngOnInit(): void {
  }

  add() {
    // Adjunta el tiempo inicial a la fecha inicial
    const startDate = this.addForm.controls['start'].value;
    const startTime = this.addForm.controls['startTime'].value;
    this.addForm.controls['start'].patchValue(startDate + ' ' + startTime);

    // Adjunta el tiempo final a la fecha final
    const endDate = this.addForm.controls['end'].value;
    const endTime = this.addForm.controls['endTime'].value;
    this.addForm.controls['end'].patchValue(endDate + ' ' + endTime);
    
    // Envia los datos con el servicio
    const obj = {
      title: this.addForm.controls['title'].value,
      start: this.addForm.controls['start'].value,
      end: this.addForm.controls['end'].value,
      asignment: this.addForm.controls['asignment'].value,
      notes: this.addForm.controls['notes'].value
    }
    this.ts.insertTask(obj).then(() => {
      this.addForm.reset();
    });
  }

  setFrom(date: string) {
    this.addForm.controls['start'].patchValue(date);
  }

  setTo(date: string) {
    this.addForm.controls['end'].patchValue(date);
  }

  setStartTime(time: string) {
    this.addForm.controls['startTime'].patchValue(time);
  }

  setEndTime(time: string) {
    this.addForm.controls['endTime'].patchValue(time);
  }

  notValid(control: string) {
    return this.addForm.controls[control].touched && this.addForm.controls[control].errors;
  }
}
