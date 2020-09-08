import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser = undefined
  
  constructor(private http:HttpClient) { }
  get IsLogin() {
    return this.currentUser != undefined;
  }

  get CurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }
  setLogoff(){
    this.currentUser=undefined;
  }
  checkUser(email:string,password:string,user:User):Observable<boolean>{//post 
user.Password=password
user.E_mail=email

    return this.http.post<boolean>(environment.url+'user/checkUser',user);
  }
  addUser(user:User): Observable<boolean>{//post
  return this.http.post<boolean>(environment.url+'user/addUser',user)
  }
  getUser():Observable<number> {//get
    return this.http.get<number>(environment.url+'user/get')
  }
}

