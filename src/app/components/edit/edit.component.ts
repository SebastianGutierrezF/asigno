import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TaskItem } from 'src/app/interfaces/task-item';
import { User } from 'src/app/interfaces/user';
import { DataService } from 'src/app/services/data-service.service';

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
    status: [, Validators.required]
  })

  @Input() users: User[] = [];
  @Input() currentTask?: TaskItem;

  constructor(private fb: FormBuilder, private ds: DataService) { }

  // Activada cuando el input de currentTask cambie
  ngOnChanges() {
    this.editForm.patchValue({
      id: this.currentTask?.id,
      title: this.currentTask?.title,
      asignment: this.currentTask?.name,
      notes: this.currentTask?.notes,
      start: this.currentTask?.start,
      end: this.currentTask?.end,
      status: this.currentTask?.status
    })
  }

  ngOnInit(): void {
  }

  update() {
    this.ds.post('task', 'update', this.editForm.value).subscribe((dato: any) => {
      if (dato['status']) {
        // Aquí va el swal
      }
    })
  }
  
  delete() {
    this.ds.post('task', 'delete', { id: this.editForm.controls['id'].value }).subscribe((dato: any) => {
      if (dato['status']) {
        // Aquí va el swal
      }
    })
  }

  isAdmin() {
    return localStorage['admin'] == 1 ? true : false;
  }

  setFrom(date: NgbDate) {
    this.editForm.controls['start'].patchValue(date);
  }

  setTo(date: NgbDate) {
    this.editForm.controls['end'].patchValue(date);
  }

  notValid(control: string) {
    return this.editForm.controls[control].touched && this.editForm.controls[control].errors;
  }

}
