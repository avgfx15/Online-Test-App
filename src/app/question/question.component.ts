import { Component, OnInit } from '@angular/core';
import {
  faClock,
  faChevronCircleLeft,
  faChevronCircleRight,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { interval } from 'rxjs';
import { QuestionServiceService } from '../service/question-service.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  public name: string = '';
  public mobile: string = '';
  public email: string = '';

  public questionList: any = [];

  public currentQuestion: number = 0;

  public points: number = 0;

  counter = 60;

  correctAnswer: number = 0;

  inCorrectAnswer: number = 0;

  interval: any;

  progress: string = '0';

  isQuizCompleted: boolean = false;

  constructor(private questionService: QuestionServiceService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.mobile = localStorage.getItem('mobile')!;
    this.email = localStorage.getItem('email')!;
    this.getAllQuestion();
    this.startCounter();
  }

  faClock = faClock;
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;
  faRefresh = faRefresh;

  getAllQuestion() {
    this.questionService.getQuestionJson().subscribe((res) => {
      this.questionList = res.questions;
    });
  }

  nextQuestion() {
    this.currentQuestion++;
    this.counter = 60;
  }
  previousQuestion() {
    this.currentQuestion--;
  }

  answer(currentQuestionNo: number, option: any) {
    if (currentQuestionNo === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }

    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgress();
      }, 1000);
    } else {
      this.points -= 5;
      this.inCorrectAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgress();
      }, 1000);
    }
  }

  startCounter() {
    this.interval = interval(1000).subscribe((val) => {
      this.counter--;

      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 5;
      }
    });
    setTimeout(() => {
      this.interval.unsubscribe();
    }, 60000);
  }

  stopCounter() {
    this.interval.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
    this.progress = '0';
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestion();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
  }

  getProgress() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
    return this.progress;
  }
}
