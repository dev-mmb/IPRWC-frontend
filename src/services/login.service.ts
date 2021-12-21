import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpService) { }

  isLoggedIn() : boolean {
    return true;
  }
}
