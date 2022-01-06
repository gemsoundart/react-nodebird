import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';

import axios from 'axios';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import AppLayer from '../../components/AppLayer';

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, } = useSelector((state) => state.post);
  const { userInfo, me } = useSelector((state) => state.user);

  return (
    <AppLayer>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            님의 글
          </title>
          <meta name="description" content={`${userInfo.nickname}님의 게시글`}/>
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`}/>
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`}/>
          <meta property="og:image" content="https://nodebird.com/favicon.ico"/>
          <meta property="og:url" content={`https://nodebird.com/user/${id}`}/>
        </Head>
      )}
      {userInfo && (userInfo.id !== me?.id)
        ? (
          <Card
            style={{ marginBottom: 20 }}
            actions={[
              <div key="twit">
                짹짹
                <br/>
                {userInfo.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br/>
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br/>
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null}
      {mainPosts.map((post, index) => <PostCard key={post.id} post={post} index={index} postsRequest={LOAD_USER_POSTS_REQUEST} idRequest={id} />)}
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
    type: LOAD_USER_POSTS_REQUEST,
    data: params.id,
  });
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_USER_REQUEST,
    data: params.id,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default User;
