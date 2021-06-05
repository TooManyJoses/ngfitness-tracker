import { Component, OnInit,  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Exercise } from '../exercise.module';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exerciseList: Observable<Exercise[]>;

  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.exerciseList =
    this.db
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
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }
}
