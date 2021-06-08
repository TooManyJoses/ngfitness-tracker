import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() links: any;
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus
    })
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

}
