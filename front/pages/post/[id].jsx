import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import AppLayer from '../../components/AppLayer';
import PostCard from '../../components/PostCard';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);
  return (
    <AppLayer>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content}/>
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`}/>
        <meta property="og:description" content={singlePost.content}/>
        <link rel="icon" href="/favicon.png" />
        <meta
          property="og:image"
          content={singlePost.Images[0] ? singlePost.Images[0].src : null}
        />
        <meta property="og:url" content={`https://licecream.com/post/${id}`}/>
      </Head>
      <PostCard post={singlePost}/>
    </AppLayer>
  );
};
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params }) => {
  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  store.dispatch({
    type: LOAD_POST_REQUEST,
    data: params.id,
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Post;
