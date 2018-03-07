import { Injectable } from '@angular/core';
import { Post } from '../../models';
import { Http, Response } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const API_URL: string = 'https://jsonplaceholder.typicode.com/';

@Injectable()
export class HttpMethodsService {

  constructor(private http: Http) { }

  // download all posts
  getPosts(): Observable<Response> {
    return this.http.get(API_URL + 'posts');
  }
  // download one post for id
  getPost(postId): Observable<Response> {
    return this.http.get(API_URL + 'posts/' + postId);
  }

  // download posts for user id
  getPostsByUserId(userId: string): Observable<Response> {
    // TODO: find out why params do not work
    const param = new HttpParams().set('userId', userId);
    return this.http.get(API_URL + 'posts', { params: { 'userId': userId } });
  }

  // add post
  addPost(post: Post): Observable<Response> {
    return this.http.post(API_URL + 'posts', post);
  }

  // update post
  updatePost(post: Post): Observable<Response> {
    return this.http.put(API_URL + 'posts/' + post.id, post);
  }

  // change post
  changePost(post: Post): Observable<Response> {
    return this.http.patch(API_URL + 'posts/' + post.id, post);
  }

  mapJsonToPost(jsonData: any): Post {
    const post = new Post();

    post.id = jsonData.id;
    post.userId = jsonData.userId;
    post.title = jsonData.title;
    post.body = jsonData.body;

    return post;
  }

}
