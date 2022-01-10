import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Avatar, Button, Card, Comment, List, Popover,
} from 'antd';
import {
  EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './postCardContent';
import {
  LIKE_POST_REQUEST,
  REMOVE_POST_REQUEST,
  RETWEET_REQUEST,
  UNLIKE_POST_REQUEST,
} from '../reducers/post';
import FollowButton from './FollowButton';
import moment from 'moment';

moment.locale('ko');

const PostCard = ({
  post, index, postsRequest, idRequest,
}) => {
  const id = useSelector((state) => (state.user.me?.id));
  const liked = post.Likers.find((v) => v.id === id);
  const [ref, inView] = useInView();
  const { hasMorePost, loadPostsLoading, mainPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => (state.post));
  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const style = useMemo(() => ({ marginBottom: 20 }), []);
  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    return dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onUnlike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    return dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);
  const onToggleComment = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    setCommentFormOpend((prev) => !prev);
  }, [id]);
  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }

    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  useEffect(() => {
    if (inView && hasMorePost && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch({
        type: postsRequest,
        data: idRequest,
        lastId,
      });
    }
  }, [inView, hasMorePost, loadPostsLoading, mainPosts, id]);

  return (
    <div style={style}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    {!post.RetweetId && <Button>수정</Button>}
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                  </>
                ) : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗 하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
          >
            <div style={{float:'right'}}>{moment(post.createdAt).startOf('day').fromNow()}</div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                  <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={`${post.Retweet.content}`} />}
            />
          </Card>
        ) : (
          <>
            <div style={{float:'right'}}>{moment(post.createdAt).startOf('hour').fromNow()}</div>
            <Card.Meta
              avatar={<Link href={`/user/${post.User.id}`} prefetch={false}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
              title={post.User.nickname}
              description={<PostCardContent postData={`${post.content}`} />}
            />
          </>
        )}

      </Card>
      {commentFormOpend && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Link href={`/user/${item.User.id}`} prefetch={false}><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
      <div ref={index === mainPosts.length - 4 && hasMorePost && !loadPostsLoading ? ref : undefined} />
      {/* 마지막 4개 포스트 전에 업데이트*/}
    </div>
  );
};
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
