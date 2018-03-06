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

  newPost: Post = new Post();

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

  // put section
  postForSectionPut: Post = new Post();
  postsIdsForPutSection: number[] = [];
  selectedPostIdForPutSection: number = 1;
  isPutPatch: boolean = false;

  constructor(
    private httpMethodsService: HttpMethodsService
  ) { }

  ngOnInit() {
    this.postIds = this.giveNumbers(0, 100);
    this.userIds = this.giveNumbers(1, 10);
    this.postsIdsForPutSection = this.giveNumbers(1, 100);
  }

  giveNumbers(numFrom, numTo) {
    const numbers: number[] = [];

    for (let num = numFrom; num < numTo + 1; num++) {
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
      this.getPost(this.selectedPostId);
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

  getPost(whereIsIdFrom: number) {
    this.loading = true;
    this.posts = [];
    if (whereIsIdFrom === this.selectedPostIdForPutSection) {
      this.isPutPatch = true;
    }
    this.httpMethodsService.getPost(whereIsIdFrom)
      .subscribe((response: Response) => {
        this.posts.push(this.httpMethodsService.mapJsonToPost(response.json()));
        if (whereIsIdFrom === this.selectedPostIdForPutSection) {
          this.postForSectionPut.id = this.posts[0].id;
          this.postForSectionPut.userId = this.posts[0].userId;
          this.postForSectionPut.title = this.posts[0].title;
          this.postForSectionPut.body = this.posts[0].body;
        }
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

  addPost() {
    this.loading = true;
    this.posts = [];
    this.httpMethodsService.addPost(this.newPost)
      .subscribe((response: Response) => {
        this.posts.push(this.httpMethodsService.mapJsonToPost(response.json()));
        this.loading = false;
      }
      );
  }

  updatePost() {
    if (this.postForSectionPut.id === this.posts[0].id
      && this.postForSectionPut.userId === this.posts[0].userId
      && this.postForSectionPut.title === this.posts[0].title
      && this.postForSectionPut.body === this.posts[0].body) {
      const post = new Post();
      post.id = 0;
      post.userId = 0;
      post.title = 'There are no changes';
      post.body = 'Make changes and press put button';
      this.posts.push(post);
      return;
    }
    this.loading = true;
    if (this.posts.length === 2) {
      this.posts.pop();
    }
    this.httpMethodsService.updatePost(this.postForSectionPut)
      .subscribe((response: Response) => {
        this.posts.push(this.httpMethodsService.mapJsonToPost(response.json()));
        this.isPutPatch = false;
        this.loading = false;
      });
  }

}

class Method {
  id: number;
  name: string;
}
