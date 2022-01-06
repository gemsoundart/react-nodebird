import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const style = useMemo(() => ({ position: 'absolute', right: 0, bottom: -40, zIndex: 1}), []);
  const style2 = useMemo(() => ({ position: 'relative', margin: 0 }), []);

  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText, setText] = useInput('');
  const { addCommentDone,addCommentLoading } = useSelector((state) => (state.post));

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  useEffect(() => {
    if (addCommentDone)setText('');
  }, [addCommentDone]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={style2}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} />
        <Button style={style} type="primary" htmlType="submit" loading={addCommentLoading}>삐약</Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};
export default CommentForm;
