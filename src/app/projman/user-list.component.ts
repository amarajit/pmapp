import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { UserService } from './user.service';
import { IUser } from './user';

@Component({
  selector: 'pm-user-list',
  templateUrl: './user-list.component.html'

})
export class UserListComponent implements OnInit {
  pageTitle: string = 'Users List';
  users: IUser[];
  errorMessage: string;
  sortFilter: string;


  @Output() notify: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() operation: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => this.errorMessage = <any>error);
  }

  clickedOn(sortBasedOn: string) {
    this.sortFilter = sortBasedOn;
  }

  onClick(user: IUser, oper: string) {
    if (oper === 'Delete') {
      this.userService.deleteUser(user.id).subscribe(
        () => this.onDeleteComplete(),
        error => this.errorMessage = <any>error);
        
    } else {
      this.notify.emit(user);
      this.operation.emit(oper);
    }
  }

  onDeleteComplete() {
    this.userService.getUsers().subscribe(
      users => this.users = users,
      error => this.errorMessage = <any>error);      
  }

}
