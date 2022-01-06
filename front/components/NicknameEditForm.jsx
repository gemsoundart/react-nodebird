import React, { useCallback, useEffect, useMemo } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

const NicknameEditForm = () => {
  const style = useMemo(() => ({
    marginBottom: '20px',
    border: '1px solid #d9d9d9',
    padding: '20px',
  }), []);
  const dispatch = useDispatch();
  const [nickname, nicknameHandle, setNickname] = useInput(null);
  const onSubmitForm = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);
  const { changeNicknameDone, changeNicknameLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (changeNicknameDone) {
      setNickname('');
    }
  }, [changeNicknameDone]);

  return (
    <Form style={style}>
      <Input.Search
        value={nickname}
        onSearch={onSubmitForm}
        addonBefore="닉네임"
        enterButton="수정"
        onChange={nicknameHandle}
        loading={changeNicknameLoading}
      />
    </Form>
  );
};

export default NicknameEditForm;
