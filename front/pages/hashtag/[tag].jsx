import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';

import axios from 'axios';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import AppLayer from '../../components/AppLayer';

const Hashtag = () => {
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, } = useSelector((state) => state.post);

  return (
    <AppLayer>
      {mainPosts.map((post, index) => <PostCard key={post.id} post={post} index={index} postsRequest={LOAD_HASHTAG_POSTS_REQUEST} idRequest={tag} />)}
    </AppLayer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  console.log('params',params);
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: params.tag,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Hashtag;
