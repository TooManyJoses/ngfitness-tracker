import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Exercise } from "./exercise.module";
import { Subscription } from 'rxjs';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>()
  availableExercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private fbSubs: Subscription[] = [];
  private availableExercises: Exercise[] = []
  private runningExercise: Exercise;

  constructor(private db: AngularFirestore) {
    this.fetchAvailableExercises();
    this.fetchCompletedOrCancelledWorkouts()
  }

  fetchAvailableExercises() {
    this.fbSubs.push(this.db
      .collection("availableExercises")
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              id: doc.payload.doc.id,
              ...(doc.payload.doc.data() as Exercise),
            };
          });
        })
      )
      .subscribe((exerciseList: Exercise[]) => {
        this.availableExercises = exerciseList
        this.availableExercisesChanged.next([...this.availableExercises])
      })
    )
  }

  startExercise(selectedId: string) {
    this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(ex => ex.id == selectedId);
    this.exerciseChanged.next({...this.runningExercise})
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration *(progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise}
  }

  fetchCompletedOrCancelledWorkouts() {
    this.fbSubs.push(this.db
      .collection('finishedWorkouts')
      .valueChanges()
      .subscribe(
        (exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises)
        }
      )
    );
  }

  getAvailableExercises() {
    return [...this.availableExercises];
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedWorkouts').add(exercise);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach( sub => sub.unsubscribe());
  }
}
