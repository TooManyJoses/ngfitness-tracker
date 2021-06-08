import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.module';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    exercises: Exercise[];
    exerciseSubscription: Subscription;
    isLoading = true;

    constructor(private trainingService: TrainingService) {
    }

    ngOnInit() {
      this.exercises = this.trainingService.getAvailableExercises();
      this.exerciseSubscription = this.trainingService.availableExercisesChanged
        .subscribe(exercises => {
          this.exercises = exercises;
          this.isLoading = false;
        });
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }

    ngOnDestroy() {
      this.exerciseSubscription.unsubscribe();
    }

}
