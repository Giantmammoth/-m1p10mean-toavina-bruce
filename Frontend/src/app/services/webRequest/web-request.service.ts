import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;
  socket = io.connect("http://localhost:5000");


  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:5000/api/v1";

  }

  Emit(keyword: string, data: any) {
    this.socket.emit(keyword, data);
  }

  On(keyword: string, data: any) {
    this.socket.on(keyword, data);
  }

  Disconnect() {
    return this.socket.disconnect();
  }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: any) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: any) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }


  signup(fullName: string, email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/User/signup`, {
      fullName: fullName,
      email: email,
      password: password
    }, {
      observe: "response"
    })
  }

  login(email: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/User/login`, {
      email: email,
      password: password
    }, {
      observe: "response"
    })
  }



}
