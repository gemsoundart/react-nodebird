import React, { useCallback, useState } from 'react';
import {
  Input, Menu, Row, Col,
} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';

import styled, { createGlobalStyle } from 'styled-components';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import { useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import Router from 'next/router';

function AppLayer({ children }) {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);
  return (
    <div>
      <Global/>

      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">홈</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
          />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile/> : <LoginForm/>}
        </Col>
        <Col xs={24} md={12}>{children}</Col>
        <Col xs={24} md={6}>
          <a href="https://www.zerocho.com" target="_blank" rel="noreferrer noopener">Made by ZeroCho</a>
        </Col>
      </Row>
    </div>
  );
}

AppLayer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayer;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
  .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .ant-col:first-child {
    margin-left: 0 !important;
  }

  .ant-col:last-child {
    margin-right: 0 !important;
  }
`
