import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ApplicationService } from '../service/application.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  name: any;
  employeeform: any;
  rating: number = 0;
  projects: any;
  projectForm: FormGroup;
  editData: string = "";
  fillrating: string = "";
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private appservice: ApplicationService
  ) { }

  displayedColumns: string[] = ['projectName', 'rating', 'comments', 'action'];
  dataSource: any = [];

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('username');
    this.employeeform = this.fb.group({
      empName: ['', Validators.required],
      empId: ['', Validators.required],
      project: ['', Validators.required],
      comment: ["", Validators.required]
    });

    this.projects = this.appservice.getProjectName();

    this.dataSource = this.appservice.getFeedbackData();

    this.projectForm = this.fb.group({
      projectDetails: this.fb.array([])
    });

    this.seedEmployeeFormArray();


  }

  seedEmployeeFormArray() {
    if (Array.isArray(this.dataSource) && this.dataSource.length > 0) {
      this.dataSource.forEach(seedDatum => {
        const formGroup = this.createFilterGroup();
        formGroup.patchValue(seedDatum);
        this.filtersFormArray.push(formGroup);
      });
    }
  }

  createFilterGroup() {
    return this.fb.group({
      project: [],
      comment: ['', Validators.required],
      rating: [],
      empName: [],
      empId: []
    });
  }

  addFilterToFiltersFormArray(data) {
    const formGroup = this.createFilterGroup();
    formGroup.patchValue(data);
    this.filtersFormArray.push(formGroup);
  }

  removeFilterFromFiltersFormArray(index) {
    this.filtersFormArray.removeAt(index);
    this.dataSource.splice(index, 1);
    this.appservice.setFeedbackData(this.dataSource);
  }

  get filtersFormArray() {
    return (<FormArray>this.projectForm.get('projectDetails'));
  }

  getFilterGroupAtIndex(index) {
    return (<FormGroup>this.filtersFormArray.at(index));
  }

  editRowData(data, index) {
    if (this.projectForm.invalid) {
      return;
    }
    this.dataSource[index]["project"] = data.project;
    this.dataSource[index]["comment"] = data.comment;
    this.dataSource[index]["rating"] = data.rating;
    this.editData = "Project Data updated sucessfully";
    this.appservice.removeFeedbackData();
    this.appservice.setFeedbackData(this.dataSource);
    setTimeout(() => {
      this.editData = "";
    }, 3000)

  }

  onRatingChanged(rating) {
    console.log(rating);
    this.rating = rating;
  }

  saveEmployee(data, rating) {
    if (rating) {
      data.rating = rating;
      console.log(rating, data);
      this.dataSource.push(data);
      this.addFilterToFiltersFormArray(data);
      this.employeeform.reset();
      this.appservice.setFeedbackData(this.dataSource);
      this.fillrating = "";
      this.rating = 0;
    } else {
      this.fillrating = "Please Provide rating";
    }
  }

}


