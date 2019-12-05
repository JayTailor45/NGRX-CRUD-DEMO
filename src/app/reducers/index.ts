import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {postsReducer, PostState} from './posts.reducer';

export interface State {
  posts: PostState;
}

export const reducers: ActionReducerMap<State> = {
  posts: postsReducer
};

export const postFeature = (state: State) => state.posts;

export const selectPosts = createSelector(
  postFeature,
  (state: PostState) => state.posts
);

export const selectedPostSelector = createSelector(
  postFeature,
  (state: PostState) => state.selectedPost
);

export const isEditingSelector = createSelector(
  postFeature,
  (state: PostState) => state.isEditing
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
