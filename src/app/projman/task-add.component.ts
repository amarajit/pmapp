import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';

import { IPTask } from './ptask';
import { ITask } from './task';
import { IProject } from './project';
import { IUser } from './user';
import { PtaskService } from './ptask.service';
import { TaskService } from './task.service';
import { ProjectService } from './project.service';
import { UserService } from './user.service';
import { GenericValidator } from "../shared/generic-validator";

@Component({
  selector: 'pm-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle: string = 'Add Task';
  chosen: boolean = false;
  taskForm: FormGroup;
  task: ITask;
  errorMessage: string;
  private sub: Subscription;
  modalRef: BsModalRef;
  projects: IProject[];
  ptasks: IPTask[];
  ptask: IPTask;
  users: IUser[];
  isParentTask: boolean = false;

  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidator;
  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private ptaskService: PtaskService,
    private projectService: ProjectService, private modalService: BsModalService,
    private userService: UserService, private taskService: TaskService) {
    this.validationMessages = {
      task: { required: 'Task is required.' },
      project: { required: 'Project must be selected.' }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    this.taskForm = this.fb.group({
      id: '',
      task: ['', Validators.required],
      startDate: '',
      endDate: '',
      priority: '0',
      status: '',
      parentId: '',
      project: [{ value: '', disabled: true }],
      user: [{ value: '', disabled: true }]
    });

    this.sub = this.route.params.subscribe(
      params => {
        let taskId = +params['id'];
        if (taskId !== undefined) {
          this.getTaskToBeUpdated(taskId);
        }
      });
  }

  getTaskToBeUpdated(taskId: number): void {
    this.taskService.getTask(taskId.toString()).subscribe(
      (task : ITask) => this.onTaskRetrieved(task),
      error => this.errorMessage = <any>error);
     }
     
  onTaskRetrieved(task : ITask) : void{
    if(this.taskForm){
      this.taskForm.reset();
    }
    this.task=task;
    this.pageTitle = 'Update Task';
    this.taskForm.patchValue({
      id: this.task.id,
      task: this.task.task,
      startDate: this.task.startDate,
      endDate: this.task.endDate,
      priority: this.task.priority,
      status: this.task.status,
      parentId: this.task.parentId,
      project: this.task.project,
      user: this.task.user
    });
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.taskForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.taskForm);
    });
  }

  saveTask(): void {
    if (this.isParentTask) {
      let p = Object.assign({}, this.ptask, this.taskForm.value);
      this.ptaskService.savePTask(p)
        .subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.errorMessage = <any>error
        );
    } else {
      let p = Object.assign({}, this.task, this.taskForm.value);
      p.project = this.taskForm.controls['project'].value;
      p.user = this.taskForm.controls['user'].value;
      this.taskService.saveTask(p)
        .subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.errorMessage = <any>error
        );
    }

  }

  onSaveComplete(): void {
    this.taskForm.reset();
    this.router.navigate(['/task']);
  }

  ngOnDestroy(): void {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }

  openModal(template: TemplateRef<any>, type: string) {
    if (type === 'prj') {
      this.projectService.getProjects().subscribe(
        projects => this.projects = projects,
        error => this.errorMessage = <any>error);
    } else if (type === 'ptsk') {
      this.ptaskService.getPTasks().subscribe(
        ptasks => this.ptasks = ptasks,
        error => this.errorMessage = <any>error);
    } else if (type === 'usr') {
      this.userService.getUsers().subscribe(
        users => this.users = users,
        error => this.errorMessage = <any>error);
    }
    this.modalRef = this.modalService.show(template);
  }

  selectProject(project: any): void {
    this.taskForm.patchValue({ project: project.id });
  }

  selectTask(ptask: any): void {
    this.taskForm.patchValue({ parentId: ptask.id });
  }

  selectUser(user: any): void {
    this.taskForm.patchValue({ user: user.id });
  }

  checkPTask(e) {
    if (e.target.checked) {
      this.isParentTask = true;
      this.taskForm.controls['priority'].disable();
      this.taskForm.controls['startDate'].disable();
      this.taskForm.controls['endDate'].disable();
    } else {
      this.isParentTask = false;
      this.taskForm.controls['priority'].enable();
      this.taskForm.controls['startDate'].enable();
      this.taskForm.controls['endDate'].enable();
    }
  }

}
