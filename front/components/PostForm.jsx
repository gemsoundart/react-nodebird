import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST } from '../reducers/post';
import { backUrl } from '../config/config';

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const { imagePaths, addPostDone, addPostLoading } = useSelector((state) => (state.post));

  const [text, setText] = useState('');

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
    setText('');
  }, [imageInput.current]);
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  useEffect(() => {
    if (addPostDone) setText('');
  }, [addPostDone]);

  const style = useMemo(() => ({ margin: '10px 0 20px' }), []);
  const style2 = useMemo(() => ({ float: 'right' }), []);
  const style3 = useMemo(() => ({ display: 'inline-block' }), []);
  const style4 = useMemo(() => ({ width: '200' }), []);

  const onChangeImages = useCallback((e) => {
    const { files } = e.target;
    const imageFormData = new FormData();
    for (const f of files) {
      imageFormData.append('image', f);
    }
    /*
    [].forEach.call( e.target.files,(f)=>{
      imageFormData.append('image',f);
    });
*/
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index,
    });
  });
  return (
    <Form style={style} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={style2} htmlType="submit" loading={addPostLoading}>짹짹</Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={style3}>
            <img src={`${backUrl}/${v}`} style={style4} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>

    </Form>
  );
};

export default PostForm;
