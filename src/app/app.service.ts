import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class AppService {

  constructor(private httpClient: HttpClient) { }

  loign(userDetails: object) {
    return this.httpClient.post("http://localhost:3001/loginData",  userDetails )
  }

  register(userDeatils: object) {
    return this.httpClient.post("http://localhost:3001/signUpData", userDeatils);
  }

  verifyToken(token: string) {
    return this.httpClient.post(environment.apiUrl + "/verify", { token });
  }

  forget(email: string) {
    return this.httpClient.post(environment.apiUrl + '/validateEmail', { email })
  }

  resetPassword(reset: object) {
    return this.httpClient.post(environment.apiUrl + '/valTokenPass', reset)
  }

  insertEmp(employee: object) {
    return this.httpClient.post(environment.apiUrl + '/addEmployee', employee);
  }

  setPassword(set: object) {
    return this.httpClient.post(environment.apiUrl + '/valEmpToken', set);
  }

  empLogin(empDetails: object) {
    return this.httpClient.post(environment.apiUrl + '/empLogin', empDetails);
  }

  addUser(name: { name: string; email: string; message: string }) {
    return this.httpClient.post(environments.appurl + "sql", name);

  }

  getUser() {
    return this.httpClient.get(environments.appurl + "usermessage");
  }

  editId(id: number) {
    return this.httpClient.get(environments.appurl + "id?id=" + id);
  }
  update(name: { id: number, name: string, mail: string, message: string }) {
    return this.httpClient.put(environments.appurl + "update", name)
  }

  delete(id: number) {
    return this.httpClient.delete(environments.appurl + "delete?id=" + id);
  }

  sortTable(sortName: string, sortType: string) {
    return this.httpClient.get(environment.apiUrl + `/getSort?sortName=${sortName}&&sortType=${sortType}`)
  }

  searchList(value: string) {
    return this.httpClient.get(environment.apiUrl + "/searchList?searchEvent=" + value);
  }

  getListByPage(page: any) {
    return this.httpClient.get(environment.apiUrl + "/pagination?page="+page);
  }

  getCount() {
    return this.httpClient.get(environment.apiUrl+"/getCount");
  }

  getSortByPage(){
    return this.httpClient.get(environment.apiUrl+`/getSortByPage`);
  }

  verifyAuth(authcode:any) {
    return this.httpClient.post(environment.apiUrl+'/',{token:authcode})
  }

}
