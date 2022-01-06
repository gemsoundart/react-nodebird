import styled, { createGlobalStyle } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ImageWrapper = styled.div`

  margin: 0 auto;
  display: inline-flex;
  background-color: black;


  img {
    height: 550px;
    max-width: 100%;
    margin: 0 auto;
    object-fit: cover;
  }
`;
export const SlickWrapper = styled.div`

  background: #090909;
  height: calc(100% - 44px);
  justify-content: center;


`;

export const Header = styled.div`
  header: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }

  & button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
  }
`;

export const CloseButton = styled.header`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;
export const Indicator = styled.header`
  text-align: center;

  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;

export const Global = createGlobalStyle`

  .slick-slide {
    display: inline-block;

  }

  .ant-card-cover {
    transform: none !important;
  }
`;
