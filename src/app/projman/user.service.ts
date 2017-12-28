import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions  } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';


import { IUser } from "./user";

@Injectable()
export class UserService{

    private baseUrl = 'http://localhost:8090/users';
    //private baseUrl = '/assets/mock-data/user.json';
    constructor(private http: Http){}

    getUsers(): Observable<IUser[]> {
        return this.http.get(this.baseUrl)
        .map(this.extractData)
        //.do(body => console.log('getUsers: '+JSON.stringify(body)))
        .catch(this.handleError);
    }

    getUser(id:string):Observable<IUser>{
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError)
    }

    deleteUser(id:string) : Observable<Response>{
        let headers = new Headers(
            {
        
        'Content-Type':'application/json'
        });
        let options = new RequestOptions({headers : headers});
        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
           
           .catch(this.handleError)
    }

    saveUser(user : IUser) : Observable<IUser> {

        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers : headers});
        //if(user.id == null){
        //        return this.createUser(user, options);
        //}
       // return this.updateUser(user, options);

       return this.http.post(this.baseUrl, user, options)
                .map(this.extractData)
                .catch(this.handleError)

    }

   /* private createUser(user : IUser, options: RequestOptions) : Observable<IUser>{
        user.id=undefined;
        return this.http.post(this.baseUrl, user, options)
        .map(this.extractData)
        .catch(this.handleError)

        
    }

    private updateUser(user : IUser, options: RequestOptions) :Observable<IUser>{
        const url = `${this.baseUrl}/${user.id}`;
        return this.http.put(url, user, options)
        .map(this.extractData)
        .catch(this.handleError)
    } */

    private extractData(response: Response){
        let body = response.json();
        return body || {};
    }

    private handleError(error : Response): Observable<any>{
        return Observable.throw(error.json().error || "Server Error");
    }

}