import produce from '../util/produce';

export const initialState = {

  loadMyInfoLoading: false, // 유저정보 가져오기 시도 중
  loadMyInfoDone: false,
  loadMyInfoError: null,

  loadFollowersLoading: false, //
  loadFollowersDone: false,
  loadFollowersError: null,

  loadUserLoading: false, //
  loadUserDone: false,
  loadUserError: null,

  loadFollowingsLoading: false, //
  loadFollowingsDone: false,
  loadFollowingsError: null,

  logInLoading: false, // 로그인 시도 중
  logInDone: false,
  logInError: null,

  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false,
  logOutError: null,

  signUpLoading: false, // 로그아웃 시도 중
  signUpDone: false,
  signUpError: null,

  changeNicknameLoading: false, // 로그아웃 시도 중
  changeNicknameDone: false,
  changeNicknameError: null,

  followLoading: false,
  followError: null,
  followDone: false,

  unfollowLoading: false,
  unfollowError: null,
  unfollowDone: false,

  removeFollowingLoading: false,
  removeFollowingError: null,
  removeFollowingDone: false,

  me: null,
  userInfo: null,
};

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const dummyUser = (data) => ({
  ...data,
  nickname: 'BAE',
  id: 234234,
  Posts: [{ id: 234234 }],
  Followings: [{ nickname: 'luni' }, { nickname: 'Tini' }, { nickname: 'Juni' }],
  Followers: [{ nickname: 'luni' }, { nickname: 'Tini' }, { nickname: 'Juni' }],
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      draft.loadUserLoading = true;
      draft.loadUserError = null;
      draft.loadUserDone = false;
      break;
    case LOAD_USER_SUCCESS:
      draft.loadUserLoading = false;
      draft.userInfo = action.data;
      draft.loadUserDone = true;
      break;
    case LOAD_USER_FAILURE:
      draft.loadUserLoading = false;
      draft.loadUserError = action.error;
      break;

    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoading = true;
      draft.loadMyInfoError = null;
      draft.loadMyInfoDone = false;
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoDone = true;
      draft.me = action.data;
      draft.loadMyInfoLoading = false;
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoading = false;
      draft.loadMyInfoError = action.error;
      break;
    case LOAD_FOLLOWERS_REQUEST:
      draft.loadFollowersLoading = true;
      draft.loadFollowersError = null;
      draft.loadFollowersDone = false;
      break;
    case LOAD_FOLLOWERS_SUCCESS:
      draft.loadFollowersDone = true;
      draft.me.Followers = action.data.followers;
      draft.loadFollowersLoading = false;
      console.log(draft.me);
      break;
    case LOAD_FOLLOWERS_FAILURE:
      draft.loadFollowersLoading = false;
      draft.loadFollowersError = action.error;
      break;
    case LOAD_FOLLOWINGS_REQUEST:
      draft.loadFollowingsLoading = true;
      draft.loadFollowingsError = null;
      draft.loadFollowingsDone = false;
      break;
    case LOAD_FOLLOWINGS_SUCCESS:
      draft.loadFollowingsDone = true;
      draft.me.Followings = action.data.followings;
      draft.loadFollowingsLoading = false;
      break;
    case LOAD_FOLLOWINGS_FAILURE:
      draft.loadFollowingsLoading = false;
      draft.loadFollowingsError = action.error;
      break;
    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followError = null;
      draft.followDone = false;
      break;
    case FOLLOW_SUCCESS:
      draft.followDone = true;
      draft.followLoading = false;
      draft.me.Followings.push({ id: action.data.UserId });
      break;
    case FOLLOW_FAILURE:
      draft.followLoading = false;
      draft.followError = action.error;
      break;
    case UNFOLLOW_REQUEST:
      draft.unfollowLoading = true;
      draft.unfollowError = null;
      draft.unfollowDone = false;
      break;
    case UNFOLLOW_SUCCESS:
      draft.unfollowDone = true;
      draft.unfollowLoading = false;
      draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId);
      break;
    case UNFOLLOW_FAILURE:
      draft.unfollowLoading = false;
      draft.unfollowError = action.error;
      break;
    case REMOVE_FOLLOWER_REQUEST:
      draft.unfollowingLoading = true;
      draft.unfollowingError = null;
      draft.unfollowingDone = false;
      break;
    case REMOVE_FOLLOWER_SUCCESS:
      draft.unfollowingDone = true;
      draft.unfollowingLoading = false;
      draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId);
      break;
    case REMOVE_FOLLOWER_FAILURE:
      draft.unfollowingLoading = false;
      draft.unfollowingError = action.error;
      break;
    case LOG_IN_REQUEST:
      draft.logInLoading = true;
      draft.logInError = null;
      draft.logInDone = false;
      break;
    case LOG_IN_SUCCESS:
      draft.logInDone = true;
      draft.logInLoading = false;
      draft.me = action.data;
      break;
    case LOG_IN_FAILURE:
      draft.logInLoading = false;
      draft.logInError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutError = null;
      draft.logOutDone = false;
      break;
    case LOG_OUT_SUCCESS:
      draft.logOutDone = true;
      draft.logOutLoading = false;
      draft.me = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.signUpLoading = true;
      draft.signUpError = null;
      draft.signUpDone = false;
      break;
    case SIGN_UP_SUCCESS:
      draft.signUpDone = true;
      draft.signUpLoading = false;
      draft.me = dummyUser(action.data);
      break;
    case SIGN_UP_FAILURE:
      draft.signUpLoading = false;
      draft.signUpError = action.error;
      break;
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameError = null;
      draft.changeNicknameDone = false;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameDone = true;
      draft.changeNicknameLoading = false;
      draft.me.nickname = action.data.nickname;
      break;
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
      break;
    default:
      break;
  }
});

export default reducer;
