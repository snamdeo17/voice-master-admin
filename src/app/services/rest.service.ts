import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  serverUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData(getData: any) {
    let url = this.serverUrl + getData.url;
    return this.http.get(url);
  }

  postData(postData: any) {
    let url = this.serverUrl + postData.url;
    return this.http.post(url, postData.data);
  }
}
