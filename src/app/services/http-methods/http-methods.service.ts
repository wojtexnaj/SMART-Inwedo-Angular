import { Injectable } from '@angular/core';
import { Post } from '../../models';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpMethodsService {

  constructor(private http: Http) { }

  // We download all posts.
  getPosts(): Observable<Response> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
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
