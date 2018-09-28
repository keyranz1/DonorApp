import { Injectable, OnDestroy } from "@angular/core";
import { User } from "../../types/user";

@Injectable()
export class SessionManager implements OnDestroy{

  private currentUser: User;
  constructor(){
  }

  ngOnDestroy(){
    this.currentUser = undefined;
  }

  setCurrentUser(user: User){
    this.currentUser = user;
  }

  getCurrentUser(){
    return this.currentUser;
  }
}
