import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
// import { ConexionService } from 'src/app/services/conexion.service';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup = this.fb.group({
    email: [, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    pass: [, [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {}

  constructor(private router: Router, private fb: FormBuilder, private as: AuthService) {
  }

  login() {
    this.as.login(this.formulario.value);
  }

  notValid(campo: string) {
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched
  }
}
