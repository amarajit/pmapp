import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { IUser } from "./user";
import { GenericValidator } from "../shared/generic-validator";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';



@Component({
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errorMessage: string;
  successMessage: string;
  userForm: FormGroup;
  user: IUser;
  private sub: Subscription;
  oper: string = 'Add';
  pageTitle: string = ' User';

  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private userService: UserService) {
    this.validationMessages = {
      firstName: { required: 'First Name is required.' },
      lastName: { required: 'Last Name is required.' },
      employeeId: { required: 'Employee ID is required.' }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      id: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      employeeId: ['', Validators.required],
      projectId: '',
      taskId: ''
    })
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.userForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.userForm);
    });
  }

  saveUser(): void {
    let p = Object.assign({}, this.user, this.userForm.value);
    this.userService.saveUser(p)
      .subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.errorMessage = <any>error
      );
  }

  onSaveComplete(): void {
    this.userForm.reset();
    this.successMessage = 'Success';
    this.router.navigate(['/'],{skipLocationChange:true}).then(
      () => { this.router.navigate(['/user']); });
  }

  ngOnDestroy(): void {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  onNotify(user: IUser): void {
    this.userForm = this.fb.group({
      id: user.id,
      firstName: [user.firstName , Validators.required],
      lastName: [user.lastName, Validators.required],
      employeeId: [user.employeeId, Validators.required],
      projectId: user.projectId,
      taskId: user.taskId
    })
  }

  onOperation(oper: string): void {
    this.oper = oper;
  }

  onResetClick(){
    this.oper = 'Add';
  }

}
