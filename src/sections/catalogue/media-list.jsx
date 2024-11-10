import React from 'react';
import ImageListItem from '@mui/material/ImageListItem';

function MediaList({ mediaArray }) {
  return (
    <>
      {mediaArray.map((item, index) => {
        const isVideo = item.endsWith('.mp4') || item.endsWith('.webm') || item.endsWith('.ogg');

        return (
          <ImageListItem key={index}>
            {isVideo ? (
              <video
            autoPlay
              muted
              loop
              playsInline
              style={{ borderRadius: '10px', width: '100%' }}
              preload="metadata"
              >
                <source src={item} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={item}
                alt={`Media item ${index}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </ImageListItem>
        );
      })}
    </>
  );
}

export default MediaList;
