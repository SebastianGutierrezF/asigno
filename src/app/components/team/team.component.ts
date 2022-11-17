import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {
  @ViewChild("photo", {static: false}) logoInput: ElementRef | undefined;
  teamForm: FormGroup = this.fb.group({
    team: new FormArray([]),
    id: [,],
    name: [, Validators.required],
    email: [, [Validators.required, Validators.email]],
    pass: [, [Validators.required, Validators.minLength(8)]],
    color: [, Validators.required],
    admin: [0,],
    photo: [, [Validators.required]]
  })
  img: string = "";

  constructor(private fb: FormBuilder, private us: UsersService, private http: HttpClient) {
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
          photo: [team.photo]
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
    this.teamForm.controls['photo'].setValue(this.img);
    this.us.addUser(this.teamForm.value);
  }
  
  editUser(i: number) {
    this.teamArray.controls[i].patchValue({
      photo: this.img
    })
    this.us.editUser(this.teamArray.controls[i].value);
  }
  
  deleteUser(index: number) {
    this.us.deleteUser(this.teamArray.controls[index].value.id);
  }

  notValid() {
    return this.teamForm.invalid && this.teamForm.touched;
  }

  subirArchivo(event: any) {
    let data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('upload_preset', 'asigno');
    data.append('cloud_name', 'duz7dfwse')
    if (event.target.files && event.target.files.length) { 
      this.http.post('https://api.cloudinary.com/v1_1/duz7dfwse/image/upload', data).subscribe((response: any) => {
        if (response.url) {          
          this.img = response.url;
          this.teamForm.controls['photo'].setValue(this.img);
        } else {
          alert("Ocurrio un error al subir la imagen.");
        }
      });
    }
  }
}
