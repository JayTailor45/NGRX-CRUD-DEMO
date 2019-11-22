import {Post} from '../models/post.model';
import * as PostActions from '../actions/post.action';

export type Action = PostActions.PostActions;

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: any;
}

export const initialState: PostState = {
  posts: [],
  loading: false,
  error: null
};

export function postsReducer(state: PostState = initialState, action: Action): PostState {
  switch (action.type) {
    case PostActions.GET_POSTS:
      return {...state, loading: true};
    case PostActions.GET_POSTS_SUCCESS:
      return {...state, loading: false, posts: action.payload};
    case PostActions.POST_ERROR:
      return {...state, loading: false, error: action.payload};
    case PostActions.DELETE_POST_BY_ID:
      return {...state, loading: true};
    case PostActions.DELETE_POST_BY_ID_SUCCESS:
      return {...state, loading: false, posts: [...state.posts.filter(post => post.id !== action.payload)]};
    case PostActions.ADD_NEW_POST:
      return {...state, loading: true};
    case PostActions.ADD_NEW_POST_SUCCESS:
      return {...state, loading: false, posts: [...state.posts, action.payload]};
    default:
      return state;
  }
}
