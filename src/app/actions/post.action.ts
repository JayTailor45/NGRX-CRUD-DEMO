import {Action} from '@ngrx/store';

export const GET_POSTS = '[POST] Get all post';
export const GET_POSTS_SUCCESS = '[POST] Get all post success';

export const DELETE_POST_BY_ID = '[POST] Delete post by id';
export const DELETE_POST_BY_ID_SUCCESS = '[POST] Delete post by id success';

export const ADD_NEW_POST = '[POST] Add new post';
export const ADD_NEW_POST_SUCCESS = '[POST] Add new post success';

export const POST_ERROR = '[POST] Post error';

export class GetPosts implements Action {
  readonly type = GET_POSTS;
}

export class GetPostsSuccess implements Action {
  readonly type = GET_POSTS_SUCCESS;
  constructor(public payload: any) {}
}

export class PostError implements Action {
  readonly type = POST_ERROR;
  constructor(public payload: any) {}
}

export class DeletePostById implements Action {
  readonly type = DELETE_POST_BY_ID;
  constructor(public payload: number) {}
}

export class DeletePostByIdSuccess implements Action {
  readonly type = DELETE_POST_BY_ID_SUCCESS;
  constructor(public payload: any) {}
}

export class AddNewPost implements Action {
  readonly type = ADD_NEW_POST;
  constructor(public payload: object) {}
}

export class AddNewPostSuccess implements Action {
  readonly type = ADD_NEW_POST_SUCCESS;
  constructor(public payload: any) {}
}

export type PostActions =
  | GetPosts
  | GetPostsSuccess
  | PostError
  | DeletePostById
  | DeletePostByIdSuccess
  | AddNewPost
  | AddNewPostSuccess;
