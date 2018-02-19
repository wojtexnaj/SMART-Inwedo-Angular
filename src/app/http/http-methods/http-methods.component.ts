import { Component, OnInit } from '@angular/core';
import { HttpMethodsService } from '../../services/index';
import { Response } from '@angular/http';
import { Post } from '../../models';

@Component({
  selector: 'http-methods',
  templateUrl: './http-methods.component.html',
  styleUrls: ['./http-methods.component.scss']
})
export class HttpMethodsComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private httpMethodsService: HttpMethodsService
  ) { }

  ngOnInit() {
  }

  getPosts() {
    this.httpMethodsService.getPosts()
    .subscribe((response: Response) => response.json()
      .map(jsonPost => {
        this.posts.push(this.httpMethodsService.mapJsonToPost(jsonPost));
      })
  );
}
}
