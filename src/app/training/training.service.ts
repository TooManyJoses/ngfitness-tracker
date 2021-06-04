import { Subject } from 'rxjs';
import { Exercise } from "./exercise.module";

export class TrainingService {
  exerciseChanged = new Subject<Exercise>()
  private availableExercises: Exercise[] = [
    {id: 'deadlifts', name: 'Deadlifts', reps: 5, sets: 5, duration: 120 },
    {id: 'backsquats', name: 'Back Squats', reps: 5, sets: 5, duration: 60 },
    {id: 'benchpress', name: 'Bench Press', reps: 5, sets: 5, duration: 120 },
    {id: 'logpress', name: 'Log Press', reps: 5, sets: 5, duration: 30 },
  ]
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice();
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
}
