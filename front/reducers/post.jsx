import shortId from 'shortid';
import produce from '../util/produce';

export const initialState = {
  mainPosts: [],
  singlePost: null,
  imagePaths: [],
  hasMorePost: true,

  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,

  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,

  removePostLoading: false,
  removePostDone: false,
  removePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,

  retweetLoading: false,
  retweetDone: false,
  retweetError: null,

};
/*export const generateDummyPost = (number) => Array(number).fill().map((v, i) => ({
    id: shortId.generate(),
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraph(),
    Images: [{
      /!*src: 'https://i.pinimg.com/564x/68/76/46/687646ea318b1ab47ec58a762e1facd8.jpg',*!/
      src: faker.image.image(),
    }],
    Comments: [{
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.sentence(),
    }],
  }
));*/

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content + '#해시태그 #익스프레스',
  User:
    {
      id: 234234,
      nickname: '효준',
    },
  Images: [],

  Comments:
    [
      {
        User: { nickname: 'nero' },
        content: '우와 연습하러 나왔군요~',
      },
      {
        User: { nickname: 'hero' },
        content: '얼른 하고 싶어요~',
      },
    ],

});
const dummyComment = (content) => ({
  id: shortId.generate(),
  User: { id: 1, nickname: 'dummy' },
  content,
});

const reducer = (state = initialState, action) => {
  console.log(action);
  return produce(state, (draft) => {
    switch (action.type) {

      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;

      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      case LOAD_POSTS_REQUEST:
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.hasMorePost = action.data.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_USER_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error || null;
        break;
   /*   case LOAD_USER_POSTS_REQUEST:
        draft.loadUserPostsLoading = true;
        draft.loadUserPostsDone = false;
        draft.loadUserPostsError = null;
        break;
      case LOAD_USER_POSTS_SUCCESS:
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.loadUserPostsLoading = false;
        draft.loadUserPostsDone = true;
        draft.hasMorePost = action.data.length === 10;
        break;
      case LOAD_USER_POSTS_FAILURE:
        draft.loadUserPostsLoading = false;
        draft.loadUserPostsError = action.error;
        break;
      case LOAD_HASHTAG_POSTS_REQUEST:
        draft.loadHashtagPostsLoading = true;
        draft.loadHashtagPostsDone = false;
        draft.loadHashtagPostsError = null;
        break;
      case LOAD_HASHTAG_POSTS_SUCCESS:
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.loadHashtagPostsLoading = false;
        draft.loadHashtagPostsDone = true;
        draft.hasMorePost = action.data.length === 10;
        break;
      case LOAD_HASHTAG_POSTS_FAILURE:
        draft.loadHashtagPostsLoading = false;
        draft.loadHashtagPostsError = action.error;
        break;*/
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.singlePost = action.data;
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(action.data);
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      case RETWEET_SUCCESS:
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = action.error;
        break;

      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;


      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      /*
    const postIndex = state.mainPosts.findIndex(
      (v) => v.id === action.data.postId
    );
    const post = { ...state.mainPosts[postIndex] };
    post.Comments = [dummyComment(action.data.content), ...post.Comments];
    const mainPosts = [...state.mainPosts];
    mainPosts[postIndex] = post;
    return {
      ...state,
      mainPosts,
      addCommentLoading: false,
      addCommentDone: true,
    }
  }
    ;*/
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
