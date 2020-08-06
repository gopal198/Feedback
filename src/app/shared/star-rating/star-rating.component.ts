import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue:number;

  @Input() rating: number;
  @Output() ratingUpdated = new EventEmitter();

  constructor(private snackBar: MatSnackBar) {
  }


  ngOnInit() {
    this.selectedValue = this.rating;
  }
  
  countStar(star) {
    this.selectedValue = star;
    this.ratingUpdated.emit(star);
  }
}

export enum StarRatingColor {
  one = "bad",
  two = "poor",
  three = "average",
  four = "good",
  five = "excellent"
}
