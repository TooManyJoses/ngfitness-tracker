import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises = [
    {value: 'deadlift', viewValue: 'Deadlift', target: "back"},
    {value: 'logpress', viewValue: 'Log Press', target: "Shoulders"},
    {value: 'backsquat', viewValue: 'Back Squat', target: "Legs"},
    {value: 'benchpress', viewValue: 'Bench Press', target: "Chest"},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
