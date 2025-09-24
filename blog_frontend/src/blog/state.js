export const actions = {
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  SET_CATEGORY: 'SET_CATEGORY',
  TOGGLE_TAG: 'TOGGLE_TAG',
  SET_SEARCH: 'SET_SEARCH',
  TOUCH_ROUTE: 'TOUCH_ROUTE'
};

export const initialState = {
  posts: [],
  categoryFilter: null,
  tagFilter: [],
  search: '',
  version: 0
};

export function reducer(state, action) {
  switch (action.type) {
    case actions.SET_POSTS:
      return { ...state, posts: action.payload };
    case actions.ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case actions.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(p => (String(p.id) === String(action.payload.id) ? action.payload : p))
      };
    case actions.DELETE_POST:
      return { ...state, posts: state.posts.filter(p => String(p.id) !== String(action.payload)) };
    case actions.SET_CATEGORY:
      return { ...state, categoryFilter: action.payload };
    case actions.TOGGLE_TAG: {
      const t = action.payload;
      const exists = state.tagFilter.includes(t);
      return { ...state, tagFilter: exists ? state.tagFilter.filter(x => x !== t) : [...state.tagFilter, t] };
    }
    case actions.SET_SEARCH:
      return { ...state, search: action.payload };
    case actions.TOUCH_ROUTE:
      return { ...state, version: state.version + 1 };
    default:
      return state;
  }
}
