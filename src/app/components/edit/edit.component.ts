import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TaskItem } from 'src/app/interfaces/task-item';
import { User } from 'src/app/interfaces/user';
import { DataService } from 'src/app/services/data-service.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnChanges {
  editForm: FormGroup = this.fb.group({
    id: [],
    title: [, [Validators.required, Validators.maxLength(50)]],
    asignment: [, Validators.required],
    notes: [, Validators.required],
    start: [, Validators.required],
    end: [, Validators.required],
    status: [, Validators.required],
    startTime: [, Validators.required],
    endTime: [, Validators.required]
  })

  @Input() users: User[] = [];
  @Input() currentTask?: TaskItem;

  constructor(private fb: FormBuilder, private ts: TaskService) { }

  // Activada cuando el input de currentTask cambie
  ngOnChanges() {    
    this.editForm.patchValue({
      id: this.currentTask?.id,
      title: this.currentTask?.title,
      asignment: this.currentTask?.userID,
      notes: this.currentTask?.notes,
      start: this.currentTask?.start,
      end: this.currentTask?.end,
      status: this.currentTask?.status,
      startTime: this.currentTask?.start.split(' ')[1],
      endTime: this.currentTask?.end.split(' ')[1]
    })
  }

  ngOnInit(): void {
  }

  update() {
    // Adjunta el tiempo inicial a la fecha inicial
    const startDate = (this.editForm.controls['start'].value as string).split(' ')[0];
    const startTime = this.editForm.controls['startTime'].value;
    this.editForm.controls['start'].patchValue(startDate + ' ' + startTime);

    // Adjunta el tiempo final a la fecha final
    const endDate = (this.editForm.controls['end'].value as string).split(' ')[0];
    const endTime = this.editForm.controls['endTime'].value;
    this.editForm.controls['end'].patchValue(endDate + ' ' + endTime);
    
    // Envia los datos con el servicio
    this.ts.updateTask(this.editForm.value);
    this.editForm.reset();
  }

  setStartTime(time: string) {
    this.editForm.controls['startTime'].patchValue(time);
  }
  
  setEndTime(time: string) {
    this.editForm.controls['endTime'].patchValue(time);
  }
  
  delete() {
    this.ts.deleteTask(this.editForm.controls['id'].value);
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
