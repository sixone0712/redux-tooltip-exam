import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../Button';
import Stats from '../Stats';
import { loadImages } from '../../actions';
import './styles.css';
import { unsplashSelector } from '../../features/imageGrid/slice';

export default function ImageGrid() {
  const dispatch = useDispatch();
  const { isLoading, images, error, imageStats } = useSelector(
    (state) => state,
  );
  // const { isLoading, images, error } = useSelector(unsplashSelector.all);

  useEffect(() => {
    dispatch(loadImages());
  }, []);

  return (
    <div className="content">
      <section className="grid">
        {images.map((image) => (
          <div
            key={image.id}
            className={`item item-${Math.ceil(image.height / image.width)}`}
          >
            <Stats stats={imageStats[image.id]} />
            <img src={image.urls.small} alt={image.user.username} />
          </div>
        ))}
      </section>
      {error && <div className="error">{JSON.stringify(error)}</div>}
      <Button
        onClick={() => !isLoading && dispatch(loadImages())}
        loading={isLoading}
      >
        Load More
      </Button>
    </div>
  );
}
