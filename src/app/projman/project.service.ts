import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions  } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';


import { IProject } from "./project";

@Injectable()
export class ProjectService{

    private baseUrl = 'http://localhost:8090/projects';
    constructor(private http: Http){}

    getProjects(): Observable<IProject[]> {
        return this.http.get(this.baseUrl)
        .map(this.extractData)
        .catch(this.handleError);
    }

    getProject(id:string):Observable<IProject>{
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError)
    }

    deleteProject(id:string) : Observable<Response>{
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
           .catch(this.handleError)
    }

    saveProject(project : IProject) : Observable<IProject> {

        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
        return this.http.post(this.baseUrl, project, options)
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