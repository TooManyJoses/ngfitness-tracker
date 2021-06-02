import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email]}),
    password: new FormControl('', { validators : [Validators.required]}),
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: Form) {
    console.log(form)
  }
}
