import { Component } from '@angular/core';
import * as $ from 'jquery';
window["$"]=$;
window["jQuery"]=$;

@Component({
  selector: 'pm-root',
  template: `<div>  
  <div><h1>Project Manager</h1> <div>
  <nav class='navbar navbar-default'>
  <div class='container-fluid'>
    <a class='navbar-brand'>{{pageTiltle}}</a>
    <ul class='nav navbar-nav'>
      <li><a [routerLink]="['/project']">Add Project</a></li>
      <li><a [routerLink]="['/task']">Add Task</a></li>
      <li><a [routerLink]="['/user']">Add User</a></li>
      <li><a [routerLink]="['/tasks']">View Task</a></li>
    </ul>
  </div>
  </nav>
  <div class='container'>
  	<router-outlet></router-outlet>
  </div>
  
  </div>`

})
export class AppComponent {
  pageTitle:string = 'Project Manager';
}
