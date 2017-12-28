import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { TaskService } from './task.service';
import { ITask } from './task';

@Component({
  selector: 'pm-task-list',
  templateUrl: './task-list.component.html',
  
})
export class TaskListComponent implements OnInit {
  pageTitle: string = 'Tasks List';
  tasks: ITask[];
  errorMessage: string;
  sortFilter: string;

  //@Output() notify: EventEmitter<ITask> = new EventEmitter<ITask>();
  //@Output() operation: EventEmitter<string> = new EventEmitter<string>();


  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      tasks => this.tasks = tasks,
      error => this.errorMessage = <any>error);
  }

  clickedOn(sortBasedOn: string) {
    this.sortFilter = sortBasedOn;
  }

  // onClick(task: ITask, oper: string) {
  //   if (oper === 'Edit') {
  //     this.taskService.saveTask().subscribe(
  //       () => this.onDeleteComplete(),
  //       error => this.errorMessage = <any>error);
        
  //   } else {
  //     this.notify.emit(task);
  //     this.operation.emit(oper);
  //   }
  // }


}
