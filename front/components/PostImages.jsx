import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import ImagesZoom from './imagesZoom';
import { backUrl } from '../config/config';

const PostImages = ({ images }) => {
  const style = useMemo(() => ({
    display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle',
  }), []);
  const style50 = useMemo(() => ({ display: 'inline-block', width: '50%' }), []);

  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={`${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img role="presentation" style={style50} src={`${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        <img role="presentation" style={style50} src={`${images[1].src}`} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}

      </>
    );
  }
  return (
    <>
      <div>
        <img role="presentation" style={style50} src={`${images[0].src}`} alt={images[0].src} onClick={onZoom} />

        <div
          role="presentation"
          style={style}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}

    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default PostImages;
