import React, { useEffect, useState } from 'react';
import '../styles/VideoPage.css';

const videos = [
  { title: "Intro to React", url: "https://www.youtube.com/embed/Ke90Tje7VS0" },
  { title: "Advanced JavaScript", url: "https://www.youtube.com/embed/Oe421EPjeBE" },
  { title: "Node.js Tutorial", url: "https://www.youtube.com/embed/TlB_eWDSMt4" },
];

function Videopage() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    setSelectedVideo(videos[0].url); // Auto-select first video
  }, []);

  const handleVideoClick = (url) => {
    setSelectedVideo(url);
  };

  return (
    <div className="video-page">
      <div className="video-content">
        {selectedVideo ? (
          <iframe
            src={selectedVideo}
            title="Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p className="no-video-selected">Select a video to watch.</p>
        )}
      </div>
    </div>
  );
}

export default Videopage;
