import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from './../models/comment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl: string = 'http://localhost:8080/';
  private newComment$ = new Subject<string>();

  constructor(private http: HttpClient) { }


  getComments(id:number): Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.baseUrl}publication/${id}/comments`);
  }


  getAllComments(): Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.baseUrl}comments`);
  }

  addComment(id: number , comment: Comment):Observable<Comment>{
    return this.http.post<Comment>(`${this.baseUrl}publication/${id}/comment/add`, comment);
  }

  dispatchNewComment(id:string):void{
    this.newComment$.next(id);
  }
  handleNewComment():Observable<string>{
    return this.newComment$.asObservable();
  }


  
}
