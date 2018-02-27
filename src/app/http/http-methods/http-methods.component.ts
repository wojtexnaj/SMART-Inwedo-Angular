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
  selectedUserId: string = '';
  postIds: number[] = [];
  userIds: number[] = [];
  selectedPostId: number = 0;

  loading: boolean = false;
  isCheckbox: boolean = false;

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
    this.userIds = this.givesUserIdNumbers();
  }

  givesPostNumbers() {
    const numbers: number[] = [];

    for (let num = 0; num < 101; num++) {
      numbers.push(num);
    }
    return numbers;
  }

  givesUserIdNumbers() {
    const numbers: number[] = [];

    for (let num = 1; num < 11; num++) {
      numbers.push(num);
    }
    return numbers;
  }

  runMethodGet() {
    if (this.selectedPostId === 0 && this.isCheckbox === false) {
      this.getPosts();
      return;
    }
    if (this.selectedPostId !== 0 && this.isCheckbox === false) {
      this.getPost();
    }

    if (this.selectedUserId && this.isCheckbox) {
      this.getPostsByUserId();
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

  getPostsByUserId() {
    this.loading = true;
    this.posts = [];
    this.httpMethodsService.getPostsByUserId(this.selectedUserId)
    .subscribe((response: Response) => response.json()
    .map(jsonPost => {
      this.posts.push(this.httpMethodsService.mapJsonToPost(jsonPost));
      this.loading = false;
    }));
  }

}

class Method {
  id: number;
  name: string;
}
