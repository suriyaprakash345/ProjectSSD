import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient:HttpClient) { }

  loign(userDetails:object) {
    return this.httpClient.post("http://localhost:3001/loginData",{userDetails})
  }

  register(userDeatils:object) {
    return this.httpClient.post("http://localhost:3001/register",userDeatils);
  }

  forget(email:string){
    console.log(email);
    return this.httpClient.post(environment.apiUrl+'/validateEmail',{email})
  }

  resetPassword(reset:object){
    return this.httpClient.post(environment.apiUrl+'/valTokenPass',reset)
  }

}
