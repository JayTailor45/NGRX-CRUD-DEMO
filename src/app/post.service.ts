import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts = (): Observable<any> => {
    return this.http.get(`${environment.baseUrl}`);
  }

  deletePostById = (id): Observable<any> => {
    return this.http.delete(`${environment.baseUrl}/${id}`);
  }

  addNewPost = (post): Observable<any> => {
    return this.http.post(`${environment.baseUrl}`, post);
  }
}
