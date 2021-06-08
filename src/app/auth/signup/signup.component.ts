import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui-service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date = new Date();
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(loadingState => {
      this.isLoading = loadingState;
    });

    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    })
  }

}
