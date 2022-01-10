import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayer from '../components/AppLayer';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, retweetError } = useSelector((state) => state.post);
  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);
  /*useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);*/

  return (
    <AppLayer>
      {me && <PostForm/>}
      {mainPosts.map((post, index) => <PostCard key={post.id} post={post} index={index}
                                                postsRequest={LOAD_POSTS_REQUEST}/>)}

    </AppLayer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Home;
