import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {postFeature, selectPosts, State} from './reducers';
import {AddNewPost, DeletePostById, GetPosts} from './actions/post.action';
import {Observable} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Observable<any>;
  postForm: FormGroup;

  constructor(private store: Store<State>) {
    this.store.dispatch(new GetPosts());
  }

  ngOnInit(): void {
    this.posts = this.store.pipe(select(selectPosts));
    this.postForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      tags: new FormControl('')
    });
  }

  onDeleteClicked(id): void {
    this.store.dispatch(new DeletePostById(id));
  }

  onAddClicked(): void {
    const raw = this.postForm.getRawValue();
    let post = {
      title: raw.title,
      content: raw.content,
      tags: raw.tags.split(',')
    };
    this.store.dispatch(new AddNewPost(post));
  }
}
