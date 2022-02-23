import {EventEmitter, Injectable} from '@angular/core';
import {HttpResponse} from "../app/HttpResponse";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import jwt_decode from "jwt-decode";
import {lastValueFrom, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public static readonly RESPONSE_SUCCESS_CODE = "SUCCESS";
  public static readonly RESPONSE_FAILURE_CODE = "FAILURE";
  onErrorEvent : EventEmitter<string> = new EventEmitter<string>();
  onSuccesfulRequestEvent = new EventEmitter<null>();

  // https://limitless-bastion-9783240.herokuapp.com
  // http://localhost:8080
  private url : string = "http://localhost:8080";
  private http : HttpClient;

  constructor(private h : HttpClient, private cookieService : CookieService) {
    this.http = h;
  }

  public async get<T>(endpoint : string, args : {key: string, value: string}[] = []) : Promise<T> {
    endpoint = this.getEndpointWithArguments(endpoint, args);
    const result = this.http.get<T>(this.url + endpoint);
    return await lastValueFrom(result);
  }

  public async getWithToken<T>(endpoint : string, args : {key: string, value: string}[] = []) : Promise<T> {
    let token = this.cookieService.get("jwt");
    if (token === "") this.onError("No token");

    endpoint = this.getEndpointWithArguments(endpoint, args);

    const result = this.http.get<T>(this.url + endpoint, {headers: {Authorization: "Bearer " + token}});
    return await lastValueFrom(result);
  }

  public async post<T>(endpoint : string, body : T) : Promise<T> {
    let token = this.cookieService.get("jwt");
    if (token === "") this.onError("No token");

    const result = this.http.post<T>(this.url + endpoint, body, {headers: {Authorization: "Bearer " + token}});
    return await lastValueFrom(result);
  }

  public async postWithReturnType<T, R>(endpoint : string, body : T) : Promise<R> {
    let token = this.cookieService.get("jwt");

    const result = this.http.post<R>(this.url + endpoint, body, {headers: {Authorization: "Bearer " + token}});
    return await lastValueFrom(result);
  }

  public async put<T>(endpoint : string, body : T) {
    let token = this.cookieService.get("jwt");
    if (token === "") this.onError("No token");

    const result = this.http.put<T>(this.url + endpoint, body, {headers: {Authorization: "Bearer " + token}});
    return await lastValueFrom(result);
  }

  public async delete<T, R>(endpoint : string, body : T) {
    let token = this.cookieService.get("jwt");
    if (token === "") this.onError("No token");

    const result = this.http.delete<R>(this.url + endpoint, {body: body, headers: {Authorization: "Bearer " + token}});
    return await lastValueFrom(result);
  }

  public getEndpointWithArguments(endpoint : string, args :{key: string, value: string}[] = []) : string {
    if (args.length !== 0) {
      endpoint += "?";
      args.forEach(({key, value}) => {
        endpoint += key + "=" + value + "&";
      });
      endpoint = endpoint.substr(0, endpoint.length - 1);
    }
    return endpoint;
  }

  private onError(message : string) {
    if (message !== "No token")
      this.onErrorEvent.emit(message);
  }
}
