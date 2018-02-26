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
  curlyBracketLeft: string = '{';
  curlyBracketRight: string = '}';

  posts: Post[] = [];
  selectedMethod: Method = new Method();
  postIds: number[] = [];
  selectedPostId: number = 0;

  loading: boolean = false;

  methods: Method[] = [
    { id: 1, name: 'Get' },
    { id: 2, name: 'Post' },
    { id: 3, name: 'Put' },
    { id: 4, name: 'Patch' },
    { id: 5, name: 'Delete' }
  ];

  constructor(
    private httpMethodsService: HttpMethodsService
  ) { }

  ngOnInit() {
    this.postIds = this.givesPostNumbers();
  }

  givesPostNumbers() {
    const numbers: number[] = [];

    for (let num = 0; num < 101; num++) {
      numbers.push(num);
    }
    return numbers;
  }

  runMethodGet() {
    console.log(this.selectedPostId);
    if (this.selectedPostId === 0) {
      this.getPosts();
      return;
    }
    if (this.selectedPostId !== 0) {
      this.getPost();
    }
  }

  getPosts() {
    this.loading = true;
    this.posts = [];
    this.httpMethodsService.getPosts()
    .subscribe((response: Response) => response.json()
      .map(jsonPost => {
        this.posts.push(this.httpMethodsService.mapJsonToPost(jsonPost));
        this.loading = false;
      })
  );
  }

  getPost() {
    this.loading = true;
    this.posts = [];
    this.httpMethodsService.getPost(this.selectedPostId)
    .subscribe((response: Response) => {
      this.posts.push(this.httpMethodsService.mapJsonToPost(response.json()));
      this.loading = false;
    }
    );
  }

}

class Method {
  id: number;
  name: string;
}
