import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { IProject } from './project';
import { IUser } from './user';
import { ProjectService } from './project.service';
import { UserService } from './user.service';

import { GenericValidator } from "../shared/generic-validator";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'pm-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  currentDate;
  defaultEndDate;
  chosen: boolean = false;
  projectForm: FormGroup;
  project: IProject;
  errorMessage: string;
  private sub: Subscription;
  private oper : string = 'Add';
  pageTitle: string = ' Project';
  managerId : string;
  modalRef: BsModalRef;
 
  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };
  
  users : IUser[];
 
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private projectService: ProjectService,
    private modalService: BsModalService, private userService: UserService) {
    this.validationMessages = {
      project: { required: 'Project title is required.' }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.currentDate = new Date();
    this.defaultEndDate = new Date(this.currentDate.getTime() + (1000*60*60*24));
       
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => this.errorMessage = <any>error);
  
      this.projectForm = this.fb.group({
      id: '',
      project: ['', Validators.required],
      startDate: [{value: this.currentDate,disabled:true}],
      endDate: [{value:'',disabled:true}],
      priority: '0',
      managerId : [{value:'', disabled:true}, Validators.required],
      taskCount : 0,
      completedTaskCount : 0
    });

  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.projectForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.projectForm);
    });
  }

  saveProject() : void {
    let p = Object.assign({}, this.project, this.projectForm.value);
    p.managerId=this.projectForm.controls['managerId'].value;
    this.projectService.saveProject(p)
    .subscribe(
      () => this.onSaveComplete(),
      (error : any) => this.errorMessage = <any> error
    );

  } 

  onSaveComplete(): void {
    this.projectForm.reset();
    this.router.navigate(['/'],{skipLocationChange:true}).then(
      () => { this.router.navigate(['/project']); });
  }

  ngOnDestroy(): void {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  onNotify(project : IProject):void{
      this.projectForm = this.fb.group({
          id : [project.id, Validators.required],
          priority : project.priority,
          endDate : project.endDate,
          startDate : project.startDate,
          project : [project.project, Validators.required],
          managerId : [project.managerId, Validators.required],
          taskCount:[project.taskCount]
        })
    
  }

  onOperation(oper: string) : void{
        this.oper = oper;
  }

  onResetClick(){
      this.oper = 'Add';
  }  

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  selectUser(user:any): void{
    this.managerId = user.id;
    this.projectForm.patchValue({managerId: user.id});
  }

  checkDates(e) : void{
    if(e.target.checked){
        this.projectForm.controls['startDate'].enable();
        this.projectForm.controls['endDate'].enable();
    } else {
      this.projectForm.controls['startDate'].disable();
      this.projectForm.controls['startDate'].reset();
      this.projectForm.controls['endDate'].disable();
      this.projectForm.controls['endDate'].reset();
    }
  }
  
}
