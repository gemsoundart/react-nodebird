import React, { useCallback } from 'react';
import { Button, Avatar, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';
import Link from 'next/link';

const UserProfile = () => {
  const { me, logOutLoading } = useSelector((state) => state.user);
  const dispatch=useDispatch();
  const handleClick = useCallback(() => {
    dispatch(logoutRequestAction());
    console.log(me);
  }, []);

  return (
    <Card
      actions={[
        <div key="twit"><Link href={`/user/${me.id}`} prefetch={false}><a>짹짹<br />{me.Posts.length}</a></Link></div>,
        <div key="following"><Link href={'/profile'}><a>팔로잉<br />{me.Followings.length}</a></Link></div>,
        <div key="follower"><Link href={'/profile'}><a>팔로워<br />{me.Followers.length}</a></Link></div>,
      ]}
    >
      <Card.Meta
        title={me.nickname}
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
      />
      <Button onClick={handleClick} loading={logOutLoading}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
