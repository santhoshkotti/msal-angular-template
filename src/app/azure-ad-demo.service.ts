import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AzureAdDemoService {

  isUserLoggedIn:Subject<boolean> = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  getBackendData() {
    return this.http.get('http://localhost:3000/api/data');
  }
}
