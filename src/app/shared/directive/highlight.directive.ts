import {Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector:'[highlight]'
})
export class HighlightDirective{
  constructor(private elementRef :ElementRef){

  }

  ngOnInit(){
    this.elementRef.nativeElement.style.background = "orange";
    this.elementRef.nativeElement.style.textAlign = "center";
  }

}