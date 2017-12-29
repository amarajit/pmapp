import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions  } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { IPTask } from './ptask';

@Injectable()
export class PtaskService {

  private baseUrl = 'http://localhost:8090/parenttasks';
  constructor(private http: Http){}

  getPTasks(): Observable<IPTask[]> {
      return this.http.get(this.baseUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPTask(id:string):Observable<IPTask>{
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

  savePTask(task : IPTask) : Observable<IPTask> {

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
