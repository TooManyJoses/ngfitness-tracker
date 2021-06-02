import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links = [
    {path: '/signup', title: 'Sign Up', icon: 'face'},
    {path: '/login', title: 'Log In', icon: 'login'},
    {path: '/training', title: 'Training', icon: 'rowing'},
  ]
}
