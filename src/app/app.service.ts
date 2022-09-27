import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient:HttpClient) { }

  loign(userDetails:object) {
    return this.httpClient.post("http://localhost:3001/loginData",{userDetails})
  }

  register(userDeatils:object) {
    return this.httpClient.post("http://lo")
  }

}
