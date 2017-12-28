import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions  } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import { ITask } from "./task";


@Injectable()
export class TaskService {

  private baseUrl = 'http://localhost:8090/tasks';
  constructor(private http: Http){}

  getTasks(): Observable<ITask[]> {
      return this.http.get(this.baseUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTask(id:string):Observable<ITask>{
      const url = `${this.baseUrl}/${id}`;
      return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError)
  }

  deleteTask(id:string) : Observable<Response>{
      let headers = new Headers({'Content-Type':'application/json'});
      let options = new RequestOptions({headers : headers});

      const url = `${this.baseUrl}/${id}`;
      return this.http.delete(url, options)
         .catch(this.handleError)
  }

  saveTask(task : ITask) : Observable<ITask> {

      let headers = new Headers({'Content-Type':'application/json'});
      let options = new RequestOptions({headers : headers});
      return this.http.post(this.baseUrl, task, options)
              .map(this.extractData)
              .catch(this.handleError)

  } 

  private extractData(response: Response){
      let body = response.json();
      return body || {};
  }

  private handleError(error : Response): Observable<any>{
      return Observable.throw(error.json().error || "Server Error");
  }

}
