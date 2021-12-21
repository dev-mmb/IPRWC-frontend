import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http : HttpService, private login : LoginService) { }


}
