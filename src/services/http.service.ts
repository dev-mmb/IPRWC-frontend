import {EventEmitter, Injectable} from '@angular/core';
import {HttpResponse} from "../app/HttpResponse";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import jwt_decode from "jwt-decode";

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
  private url : string = "https://limitless-bastion-9783240.herokuapp.com";
  private http : HttpClient;

  constructor(private h : HttpClient, private cookieService : CookieService) {
    this.http = h;
  }

  // data is null if api call returns no data!!!!
  public get<T>(endpoint : string, args : Map<string, string>, implementation : (data : T) => void, onFailure : () => void = () => {}) {
    endpoint = this.getEndpointWithArguments(endpoint, args);

    this.http.get<HttpResponse<T>>(this.url + endpoint).subscribe((response) => {
      this.callImplementation<T>(response, implementation, onFailure);
    }, (e) => {
      this.onError(e)
    });
  }

  public getWithToken<T>(endpoint : string, args : Map<string, string>, implementation : (data : T) => void, onFailure : () => void = () => {}) {
    let token = this.cookieService.get("jwt");
    if (token === "") this.onError("No token");

    endpoint = this.getEndpointWithArguments(endpoint, args);

    this.http.get<HttpResponse<T>>(this.url + endpoint, {headers: {Authorization: "Bearer " + token}}).subscribe((response) => {
      this.callImplementation<T>(response, implementation, onFailure);
    }, (e) => {
      this.onError(e)
    });
  }

  public post<T>(endpoint : string, body : T, implementation : (data : T) => void, onFailure : () => void = () => {}) {
    let token = this.cookieService.get("jwt");
    if (token === "") this.onError("No token");

    this.http.post<HttpResponse<T>>(this.url + endpoint, body, {headers: {Authorization: "Bearer " + token}}).subscribe((response) => {
      this.callImplementation<T>(response, implementation, onFailure);
    }, (e) => {
      this.onError(e)
    });
  }
  public postWithReturnType<T, R>(endpoint : string, body : T, implementation : (data : R) => void, onFailure : () => void = () => {}) {
    let token = this.cookieService.get("jwt");

    this.http.post<HttpResponse<R>>(this.url + endpoint, body, {headers: {Authorization: "Bearer " + token}}).subscribe((response) => {
      this.callImplementation<R>(response, implementation, onFailure);
    }, (e) => {
      this.onError(e)
    });
  }

  public put<T>(endpoint : string, body : T, implementation : (data : T) => void, onFailure : () => void = () => {}) {
    let token = this.cookieService.get("jwt");
    if (token === "") this.onError("No token");

    this.http.put<HttpResponse<T>>(this.url + endpoint, body, {headers: {Authorization: "Bearer " + token}}).subscribe((response) => {
      this.callImplementation<T>(response, implementation, onFailure);
    }, (e) => {
      this.onError(e)
    });
  }

  public delete<T>(endpoint : string, body : T, implementation : (data : T) => void, onFailure : () => void = () => {}) {
    let token = this.cookieService.get("jwt");
    if (token === "") this.onError("No token");

    this.http.delete<HttpResponse<T>>(this.url + endpoint, {body: body, headers: {Authorization: "Bearer " + token}}).subscribe((response) => {
      this.callImplementation<T>(response, implementation, onFailure);
    }, (e) => {
      this.onError(e)
    });
  }

  public getEndpointWithArguments(endpoint : string, args : Map<string, string>) : string {
    if (args.size !== 0) {
      endpoint += "?";
      args.forEach((value: string, key: string) => {
        endpoint += key + "=" + value + "&";
      });
      endpoint = endpoint.substr(0, endpoint.length - 1);
    }
    return endpoint;
  }

  private callImplementation<T>(response : HttpResponse<T>, implementation : (data : T) => void | null, onFailure : () => void) : void {
    // if error
    if (response.response === HttpService.RESPONSE_FAILURE_CODE) {
      this.onError(response.errorMessage);
      onFailure();
    }
    else {
      if (implementation !== null) {}
        implementation(response.data);
      this.onSuccesfulRequestEvent.emit(null);
    }
  }

  private onError(message : string) {
    if (message !== "No token")
      this.onErrorEvent.emit(message);
  }
}
