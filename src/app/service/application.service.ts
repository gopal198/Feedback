import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ApplicationService {
  constructor() {}
  project:any = [
    {"id" : "d1", "name":"demo 1"},
    {"id" : "d2", "name":"demo 2"},
    {"id" : "d3", "name":"demo 3"}
 ];

  getProjectName():any {
    return this.project;
  }

  setFeedbackData(data){
    localStorage.setItem('feedbackData', JSON.stringify(data));
  }
  getFeedbackData(){
    return JSON.parse(localStorage.getItem("feedbackData")) ? JSON.parse(localStorage.getItem("feedbackData")) : [];
  }
  removeFeedbackData(){
    localStorage.removeItem('feedbackData');
  }
}

