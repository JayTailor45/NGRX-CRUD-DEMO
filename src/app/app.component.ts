import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {isEditingSelector, postFeature, selectedPostSelector, selectPosts, State} from './reducers';
import {
  AddNewPost,
  CancelAddEditPostClicked,
  DeletePostById,
  EditPostById,
  EditPostClicked,
  GetPosts
} from './actions/post.action';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  post: Observable<any>;
  posts: Observable<any>;
  postForm: FormGroup;
  isEditing: Observable<any>;

  constructor(private store: Store<State>) {
    this.store.dispatch(new GetPosts());
  }

  ngOnInit(): void {
    this.posts = this.store.pipe(select(selectPosts));
    this.post = this.store.pipe(select(selectedPostSelector));
    this.isEditing = this.store.pipe(select(isEditingSelector));
    this.postForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      tags: new FormControl('')
    });
    this.post.subscribe(post => {
      if (post !== null && post !== undefined) {
        this.postForm.patchValue({
          title: post.title,
          content: post.content,
          tags: post.tags.join(',')
        });
      } else {
        this.resetForm();
      }
    });
  }

  onDeleteClicked(id): void {
    this.store.dispatch(new DeletePostById(id));
  }

  onAddClicked(): void {
    const raw = this.postForm.getRawValue();
    const post = {
      title: raw.title,
      content: raw.content,
      tags: raw.tags.split(',')
    };
    this.store.dispatch(new AddNewPost(post));
  }

  onEditPostClicked(): any {
    const raw = this.postForm.getRawValue();
    const post = {
      title: raw.title,
      content: raw.content,
      tags: raw.tags.split(',')
    };
    this.store.dispatch(new EditPostById(post));
  }

  onEditClicked(postId): void {
    this.store.dispatch(new EditPostClicked(postId));
  }

  cancelPostClicked(): void {
    this.resetForm();
    this.store.dispatch(new CancelAddEditPostClicked());
  }

  resetForm(): void {
    this.postForm.patchValue({
      title: '',
      content: '',
      tags: ''
    });
  }
}
