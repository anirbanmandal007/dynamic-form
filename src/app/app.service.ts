import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {}

  saveData(data, id): Observable<any> {
      return this.http.put('http://localhost:4000/data/' + id, data) as Observable<any>;
  }

  getData(): Observable<any> {
      return this.http.get('http://localhost:4000/data') as Observable<any>;
  }

  deleteData(id): Observable<any> {
      return this.http.delete('http://localhost:4000/data/'+ id) as Observable<any>;
  }

  addData(payload:any){
    return this.http.post('http://localhost:4000/data', payload) as Observable<any>;
  }
 
}