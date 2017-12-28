import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

import { UserEditComponent } from './user-edit.component';
import { UserService } from './user.service';
import { ProjectService } from "./project.service";
import { UserListComponent } from './user-list.component';
import { ProjectAddComponent } from './project-add.component';
import { ProjectListComponent } from './project-list.component';
import { UserFilterPipe } from "./user-filter.pipe";
import { ProjectFilterPipe } from "./project-filter.pipe";
import { UserSortPipe } from "./user-sort.pipe";
import { ProjectSortPipe } from "./project-sort.pipe";
import { TaskAddComponent } from './task-add.component';
import { TaskService } from './task.service';
import { TaskListComponent } from './task-list.component';
import { TaskSortPipe } from './task-sort.pipe';
import { TaskFilterPipe } from './task-filter.pipe';
import { PtaskService } from './ptask.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      {path:'user', component: UserEditComponent},
      {path:'project', component: ProjectAddComponent},
      {path:'task', component: TaskAddComponent},
      {path:'users', component: UserListComponent},
      {path:'tasks', component: TaskListComponent},
    ]),
    ModalModule.forRoot()
  ],
  declarations: [ UserEditComponent, UserListComponent, 
    ProjectAddComponent, ProjectListComponent, 
    UserFilterPipe, ProjectFilterPipe, UserSortPipe, 
    ProjectSortPipe, TaskAddComponent, TaskListComponent, 
    TaskSortPipe, TaskFilterPipe ],
  providers : [ UserService, ProjectService, TaskService, PtaskService ]
})
export class ProjmanModule { }
