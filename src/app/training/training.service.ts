import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { Exercise } from "./exercise.module";

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>()
  availableExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = []
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {

  }

  fetchAvailableExercises() {
    return this.db
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
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id == selectedId);
    this.exerciseChanged.next({...this.runningExercise})
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
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

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }

  getAvailableExercises() {
    return [...this.availableExercises];
  }
}
