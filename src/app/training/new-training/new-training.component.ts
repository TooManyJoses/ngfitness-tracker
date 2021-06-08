import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.module';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { UIService } from 'src/app/shared/ui-service';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    exercises: Exercise[] | void;
    isLoading = true;
    private exerciseSubscription: Subscription;
    private loadingSubscription: Subscription;

    constructor(private trainingService: TrainingService, private uiService: UIService) {
    }

    ngOnInit() {
      this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(loadingState => {
        this.isLoading = loadingState;
      });

      this.exerciseSubscription = this.trainingService.availableExercisesChanged
        .subscribe(exercises => {
          this.exercises = exercises;
          this.isLoading = false;
        });

      this.fetchExercises();
    }

    fetchExercises() {
      this.exercises = this.trainingService.fetchAvailableExercises();
    }

    onStartTraining(form: NgForm) {
        this.trainingService.startExercise(form.value.exercise);
    }

    ngOnDestroy() {
      if (this.exerciseSubscription){
        this.exerciseSubscription.unsubscribe();
      }

      if (this.loadingSubscription) {
        this.loadingSubscription.unsubscribe();
      }
    }

}
