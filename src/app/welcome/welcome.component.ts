import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  @ViewChild('name') nameKey!: ElementRef;
  @ViewChild('mobile') mobileKey!: ElementRef;
  @ViewChild('email') emailKey!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
    localStorage.setItem('mobile', this.mobileKey.nativeElement.value);
    localStorage.setItem('email', this.emailKey.nativeElement.value);
  }
}
