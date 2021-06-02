import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() links: any;
  @Output() sideNavToggle = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }

}
