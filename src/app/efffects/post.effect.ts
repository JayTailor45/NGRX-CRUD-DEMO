import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import * as PostAction from '../actions/post.action';
import {catchError, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {PostService} from '../post.service';
import {State} from '../reducers';

@Injectable()
export class PostEffect {
  constructor(private actions$: Actions, private postService: PostService, private store: Store<State>) {
  }

  @Effect()
  getPosts$: Observable<Action> = this.actions$.pipe(
    ofType(PostAction.GET_POSTS),
    mergeMap(payload => {
      return this.postService.getPosts().pipe(
        map(response => {
          return new PostAction.GetPostsSuccess(response);
        }),
        catchError(error => of(new PostAction.PostError(error)))
      );
    })
  );

  @Effect()
  deletePostById$: Observable<Action> = this.actions$.pipe(
    ofType(PostAction.DELETE_POST_BY_ID),
    map((action: PostAction.DeletePostById) => action.payload),
    mergeMap(payload => {
      return this.postService.deletePostById(payload).pipe(
        map(response => {
          return new PostAction.DeletePostByIdSuccess(+response.id);
        }),
        catchError(error => of(new PostAction.PostError(error)))
      );
    })
  );

  @Effect()
  addNewPost$: Observable<Action> = this.actions$.pipe(
    ofType(PostAction.ADD_NEW_POST),
    map((action: PostAction.AddNewPost) => action.payload),
    mergeMap(payload => {
      return this.postService.addNewPost(payload).pipe(
        map(response => {
          return new PostAction.AddNewPostSuccess(response.content);
        }),
        catchError(error => of(new PostAction.PostError(error)))
      );
    })
  );

  @Effect()
  getEditPostData: Observable<Action> = this.actions$.pipe(
    ofType(PostAction.EDIT_POST_CLICKED),
    map((action: PostAction.EditPostClicked) => action.payload),
    withLatestFrom(this.store.select(state => state.posts)),
    map(([id, state]) => {
      const selectedPost = state.posts.filter(data => data.id === id)[0];
      return new PostAction.EditPostDataArrived(selectedPost);
    }),
    catchError(error => of(new PostAction.PostError(error)))
  );

  @Effect()
  editPostById: Observable<Action> = this.actions$.pipe(
    ofType(PostAction.EDIT_POST_BY_ID),
    map((action: PostAction.EditPostById) => action.payload),
    withLatestFrom(this.store.select(state => state.posts.selectedPost)),
    map(([payload, selectedPost]) => {
      return {...selectedPost, id: +selectedPost.id};
    }),
    mergeMap(payload => {
      return this.postService.editPostById(payload).pipe(
        map(response => {
          return new PostAction.EditPostByIdSuccess(response.content);
        }),
        catchError(error => of(new PostAction.PostError(error)))
      );
    })
  );
}


// this.postService.getPosts().pipe(
//   map(response => new PostAction.GetPostsSuccess(response)),
//   catchError(error => of(new PostAction.PostError(error)))
