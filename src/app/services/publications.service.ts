import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Publication } from './../models/publication';


@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  baseUrl = 'http://localhost:8080/';
  private imageUploaded$ = new Subject<number>();
  private numberOfPhotos$ = new Subject<number>();
  private imageliked$ = new Subject<boolean>();




  constructor(private httpClient: HttpClient) { }

  uploadImage(formData):Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}users/publications/add`, formData);
  }

  getAllPublicationsById(id: number):Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(`${this.baseUrl}users/${id}/publications`);
  }

  getAllPublicationsLikedWithId(id: number):Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(`${this.baseUrl}users/${id}/publications/like`);
  }

  dispatchImageUploaded(id: number):void {
    this.imageUploaded$.next(id);
  }
  handleImageUpdated():Observable<number> {
    return this.imageUploaded$.asObservable();
  }

  dispatchNumberOfPhotos(numberPhotos: number):void {
    this.numberOfPhotos$.next(numberPhotos);
  }
  handleNumberOfPhotos():Observable<number> {
    return this.numberOfPhotos$.asObservable();
  }

  getSinglePublicationWithId(id: number): Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(`${this.baseUrl}publications/${id}`);
  }

  getAllPublications():Observable<Publication[]>{
    return this.httpClient.get<Publication[]>(`${this.baseUrl}all/publications`);
  }

  getAllPublicationsExceptId(id: number):Observable<Publication[]> {
    return this.httpClient.get<Publication[]>(`${this.baseUrl}all/publications/connected/${id}`);
  }

  getHowManyLike():Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}publications/like`);
  }

  getPhotoLikes(id: number):Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}publications/${id}/likes`)
  }

  likePhoto(userId: number, idPhoto: number):Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}publications/${idPhoto}/like`, { "idUser": userId });
  }

  dispatchImgLiked(bool: boolean):void {
    this.imageliked$.next(bool);
  }
  handleImageLiked():Observable<boolean> {
    return this.imageliked$.asObservable();
  }

  deletePhoto(id:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}publications/${id}/delete`);
  }



}

