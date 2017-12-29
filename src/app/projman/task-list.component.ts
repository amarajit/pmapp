import { Component, OnInit, EventEmitter, Output, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskService } from './task.service';
import { ProjectService } from './project.service';
import { ITask } from './task';
import { IProject } from './project';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'pm-task-list',
  templateUrl: './task-list.component.html',

})
export class TaskListComponent implements OnInit {
  pageTitle: string = 'Tasks List';
  tasks: ITask[];
  errorMessage: string;
  sortFilter: string;
  projects: IProject[];
  modalRef: BsModalRef;
  projectForm: FormGroup;
  projectId : string;

  constructor(private fb: FormBuilder, private taskService: TaskService,
    private projectService: ProjectService,
    private modalService: BsModalService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectId: [{ value: '', disabled: true }],
    })   
  }

  openModal(template: TemplateRef<any>) {
    this.projectService.getProjects().subscribe(
      projects => this.projects = projects,
      error => this.errorMessage = <any>error);

    this.modalRef = this.modalService.show(template);
  }

  clickedOn(sortBasedOn: string) {
    this.sortFilter = sortBasedOn;
  }

  selectProject(project: any): void {
    this.projectId = project.id;
    this.projectForm.patchValue({ projectId: project.id });
    this.taskService.getProjectSpecificTasks(this.projectId).subscribe(
      tasks => this.tasks = tasks,
      error => this.errorMessage = <any>error);
  }

  updateTask(e, taskId:string) : void{
    this.router.navigate(['/'],{skipLocationChange:true}).then(
      () => { this.router.navigate(['/task/'+taskId]); });
  }

  endTask(e, task:ITask){
    task.status = 'Completed';
    this.taskService.saveTask(task).subscribe(
     () => this.onSaveComplete(),
      error => this.errorMessage = <any>error);
  }

  onSaveComplete():void {
    
  }
}
