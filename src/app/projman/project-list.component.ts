import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ProjectService } from './project.service';
import { IProject } from './project';
import { TaskService } from './task.service'; 

@Component({
  selector: 'pm-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  pageTitle: string = 'Projects List';
  projects: IProject[];
  errorMessage: string;
  listFilter: string;
  sortFilter: string;
  
  @Output() notify: EventEmitter<IProject> = new EventEmitter<IProject>();
  @Output() operation: EventEmitter<string> = new EventEmitter<string>();

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(
      projects => this.projects = projects,
      error => this.errorMessage = <any>error);  
  }

  clickedOn(sortBasedOn: string) {
    this.sortFilter = sortBasedOn;
  }

  onClick(project: IProject, oper: string) {
    if (oper === 'Delete') {
      this.projectService.deleteProject(project.id).subscribe(
        () => this.onDeleteComplete(),
        error => this.errorMessage = <any>error);

    } else {
      this.notify.emit(project);
      this.operation.emit(oper);
    }
  }

  onDeleteComplete() {
    this.projectService.getProjects().subscribe(
      projects => this.projects = projects,
      error => this.errorMessage = <any>error);      
  }
}
