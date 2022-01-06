import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Button, Checkbox, Form, Input,
} from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import AppLayer from '../components/AppLayer';
import useInput from '../hooks/useInput';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);
  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);
  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  },
  [signUpError]);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangeCheckPS = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, [term]);
  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      setPasswordError(true);
    }
    if (!term) {
      setTermError(true);
    }
    console.log(email, nickname, password, term);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, nickname, password },
    });
  }, [password, passwordCheck, term]);
  return (
    <AppLayer>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
        </div>

        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
        </div>

        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input.Password name="user-password" value={password} required onChange={onChangePassword} />
        </div>

        <div>
          <label htmlFor="user-passwordCheck">비밀번호체크</label>
          <br />
          <Input.Password name="user-passwordCheck" value={passwordCheck} required onChange={onChangeCheckPS} />
        </div>

        {passwordError && <ErrorMessage>비밀번호 오류</ErrorMessage>}
        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>내 할일 다 하겠다는 것을 동의 합니다.</Checkbox>
        {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
        </div>

      </Form>
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

  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Signup;

const ErrorMessage = styled.div`
  color: red;
`;
