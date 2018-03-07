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
  selectedUserId: any = 1;
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

  // patch section
  postForSectionPatch: Post = new Post();
  postsIdsForPatchSection: number[] = [];
  selectedPostIdForPatchSection: number = 1;
  isFieldSelected: boolean = false;

  fieldsInPost: string[] = ['id', 'user id', 'title', 'body'];
  selectedField: string = '';

  clearAll() {
    this.loading = false;
    this.isCheckbox = false;
    this.isPutPatch = false;
    this.isFieldSelected = false;
    this.posts = [];
    this.postForSectionPut = new Post();
    this.postForSectionPatch = new Post();
    this.selectedPostIdForPutSection = 1;
    this.selectedPostIdForPatchSection = 1;
  }

  constructor(
    private httpMethodsService: HttpMethodsService
  ) { }

  ngOnInit() {
    this.postIds = this.giveNumbers(0, 100);
    this.userIds = this.giveNumbers(1, 10);
    this.postsIdsForPutSection = this.giveNumbers(1, 100);
    this.postsIdsForPatchSection = this.giveNumbers(1, 100);
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

  getPost(whereIsIdFrom: number, fromWhere?: string) {
    this.loading = true;
    this.posts = [];
    if (whereIsIdFrom === this.selectedPostIdForPutSection || whereIsIdFrom === this.selectedPostIdForPatchSection) {
      this.isPutPatch = true;
    }
    this.httpMethodsService.getPost(whereIsIdFrom)
      .subscribe((response: Response) => {
        this.posts.push(this.httpMethodsService.mapJsonToPost(response.json()));
        fromWhere === 'put' ? this.mapPostsToPost(this.postForSectionPut, this.posts) : this.mapPostsToPost(this.postForSectionPatch, this.posts);
        this.loading = false;
      }
      )
  }

  mapPostsToPost(post: Post, posts: Post[]) {
    post.id = posts[0].id;
    post.userId = this.posts[0].userId;
    post.title = this.posts[0].title;
    post.body = this.posts[0].body;
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

    if (this.checksIfThereWasChangeInPost(this.postForSectionPut, this.posts)) {
      this.addInfoToView(this.posts);
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

  checksIfThereWasChangeInPost(post: Post, posts: Post[]): boolean {
    if (post.id === posts[0].id
      && post.userId === posts[0].userId
      && post.title === posts[0].title
      && post.body === posts[0].body) {
      return true;
    } else {
      return false;
    }
  }

  addInfoToView(posts: Post[]) {
    if (posts.length === 2) {
      return;
    }
    const post = new Post();
    post.id = 0;
    post.userId = 0;
    post.title = 'There are no changes';
    post.body = 'Make changes and press put button';
    this.posts.push(post);
  }

  changePost() {
    if (this.checksIfThereWasChangeInPost(this.postForSectionPatch, this.posts)) {
      this.addInfoToView(this.posts);
      return;
    }
    this.loading = true;
    if (this.posts.length === 2) {
      this.posts.pop();
    }
    this.httpMethodsService.changePost(this.postForSectionPatch)
      .subscribe((response: Response) => {
        this.posts.push(this.httpMethodsService.mapJsonToPost(response.json()));
        this.isPutPatch = false;
        this.switchIsFieldSelected();
        this.loading = false;
      });
  }

  switchIsFieldSelected() {
    this.isFieldSelected = !this.isFieldSelected;
  }

}

class Method {
  id: number;
  name: string;
}
